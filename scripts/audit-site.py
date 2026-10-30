"""Read-only HTTP audit plus rejected contact requests (no messages are sent)."""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser

BASE = sys.argv[1].rstrip('/')
ROUTES = ['', '/products', '/capabilities', '/company', '/insights', '/contact', '/status', '/privacy', '/terms']
ROUTES += ['/products/' + slug for slug in ['suqjunub', 'gorilla-ledger', 'savvy-rilla-fx', 'eamu', 'herdproof', 'roots']]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.links = set()
        self.assets = set()
        self.canonical = None
        self.description = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'a' and a.get('href', '').startswith('/'): self.links.add(a['href'].split('#')[0])
        if tag in ['img', 'script'] and a.get('src', '').startswith('/'): self.assets.add(a['src'])
        if tag == 'link' and a.get('rel') == 'stylesheet': self.assets.add(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content')

def fetch(path, data=None, headers=None):
    req = urllib.request.Request(BASE + path, data=data, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.status, response.geturl(), dict(response.headers), response.read()
    except urllib.error.HTTPError as error:
        return error.code, error.geturl(), dict(error.headers), error.read()

failures, assets, links, results = [], set(), set(), []
for path in ROUTES:
    status, url, headers, body = fetch(path)
    page = Page(); page.feed(body.decode())
    issues = []
    if status != 200: issues.append('HTTP ' + str(status))
    if page.h1 != 1: issues.append('Expected one H1')
    if not page.description: issues.append('Missing description')
    if not page.canonical or urllib.parse.urlparse(page.canonical).path.rstrip('/') != path: issues.append('Incorrect canonical')
    for key in ['Content-Security-Policy', 'X-Content-Type-Options', 'X-Frame-Options']:
        if not any(k.lower() == key.lower() for k in headers): issues.append('Missing ' + key)
    assets.update(page.assets); links.update(page.links)
    results.append({'path': path or '/', 'status': status, 'issues': issues})
    failures.extend((path, issue) for issue in issues)

for path in sorted(links - set(ROUTES)):
    status, *_ = fetch(path)
    if status != 200: failures.append((path, 'Broken internal link ' + str(status)))

def check_asset(path):
    status, *_ = fetch(path)
    return (path, status)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    for path, status in pool.map(check_asset, sorted(assets)):
        if status != 200: failures.append((path, 'Broken asset ' + str(status)))

redirects = {'/platforms': '/products', '/platforms/gorilla-ledger': '/products/gorilla-ledger', '/platforms/fx-intelligence': '/products/savvy-rilla-fx', '/enterprise': '/capabilities', '/infrastructure': '/capabilities', '/industries': '/products'}
for path, target in redirects.items():
    status, url, *_ = fetch(path)
    if status != 200 or urllib.parse.urlparse(url).path != target: failures.append((path, 'Incorrect redirect: ' + url))
for path in ['/robots.txt', '/sitemap.xml']:
    if fetch(path)[0] != 200: failures.append((path, 'Unavailable'))
if fetch('/audit-missing-page')[0] != 404: failures.append(('/audit-missing-page', 'Expected HTTP 404'))
for body, headers, expected in [
    (b'null', {'Content-Type': 'application/json'}, 400),
    (b'{bad', {'Content-Type': 'application/json'}, 400),
    (b'{}', {'Content-Type': 'text/plain'}, 415),
    (b'{}', {'Content-Type': 'application/json', 'Sec-Fetch-Site': 'cross-site'}, 403),
]:
    status, *_ = fetch('/api/contact', body, headers)
    if status != expected: failures.append(('/api/contact', f'Expected {expected}, got {status}'))
print(json.dumps({'base': BASE, 'pages': results, 'assets_checked': len(assets), 'internal_links_checked': len(links), 'redirects_checked': len(redirects), 'contact_rejection_cases': 4, 'failures': failures}, indent=2))
sys.exit(bool(failures))
