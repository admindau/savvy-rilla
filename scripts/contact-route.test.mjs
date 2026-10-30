import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function route({ storage = 'absent', delivery = 'absent', confirmation = 'ok' } = {}) {
  const exports = {};
  let sends = 0;
  const context = {
    exports, Map, Set, Date,
    process: { env: delivery === 'absent' ? {} : {
      RESEND_API_KEY: 'test-only', CONTACT_INBOX_EMAIL: 'team@example.com', CONTACT_FROM_EMAIL: 'contact@example.com',
    } },
    console: { error() {} },
    require(id) {
      if (id === 'next/server') return { NextResponse: { json: (body, options) => Response.json(body, options) } };
      if (id === '@/lib/supabase') return { getSupabaseServerClient: () => storage === 'absent' ? null : {
        from: () => ({ insert: async () => {
          if (storage === 'throw') throw Error('network');
          return { error: storage === 'error' ? { message: 'unavailable' } : null };
        } }),
      } };
      if (id === 'resend') return { Resend: class {
        emails = { send: async () => {
          const result = ++sends === 1 ? delivery : confirmation;
          if (result === 'throw') throw Error('network');
          return { error: result === 'error' ? { message: 'unavailable' } : null };
        } };
      } };
      throw Error(`Unexpected dependency: ${id}`);
    },
  };
  vm.runInNewContext(source, context);
  return exports.POST;
}

const valid = { name: 'Audit test', email: 'audit@example.com', type: 'product', message: 'A test enquiry with enough context.' };
function request(body = JSON.stringify(valid), headers = {}) {
  return new Request('https://www.savvyrilla.tech/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body,
  });
}

for (const [name, options, expected] of [
  ['storage succeeds while email fails', { storage: 'ok', delivery: 'error' }, 200],
  ['storage succeeds while email throws', { storage: 'ok', delivery: 'throw' }, 200],
  ['email succeeds while storage throws', { storage: 'throw', delivery: 'ok' }, 200],
  ['email delivered but confirmation fails', { delivery: 'ok', confirmation: 'error' }, 200],
  ['email delivered but confirmation throws', { delivery: 'ok', confirmation: 'throw' }, 200],
  ['both delivery channels fail', { storage: 'error', delivery: 'error' }, 503],
  ['no delivery channels configured', {}, 503],
]) test(name, async () => assert.equal((await route(options)(request())).status, expected));

for (const body of ['null', '[]', '{broken', '{}']) {
  test(`reject invalid payload ${body}`, async () => assert.equal((await route()(request(body))).status, 400));
}
test('reject cross-site submission', async () => {
  assert.equal((await route()(request(undefined, { 'sec-fetch-site': 'cross-site' }))).status, 403);
});
test('rate limit repeated requests', async () => {
  const post = route();
  for (let i = 0; i < 5; i++) await post(request('{}'));
  const response = await post(request('{}'));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '600');
});
test('honeypot returns success without delivery', async () => {
  const response = await route()(request(JSON.stringify({ ...valid, website: 'spam' })));
  assert.equal(response.status, 200);
});
