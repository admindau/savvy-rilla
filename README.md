# Savvy Rilla Technologies™

The company website for [Savvy Rilla Technologies™](https://www.savvyrilla.tech),
a product technology company based in Juba, South Sudan.

## Product portfolio

- [SuqJunub™](https://www.suqjunub.com)
- [Gorilla Ledger™](https://gl.savvyrilla.tech)
- [Savvy Rilla FX](https://fx.savvyrilla.tech)
- [HerdProof™](https://www.herdproof.com)
- [Roots™](https://roots.savvyrilla.tech)

Product metadata used by the website is maintained in `lib/products.ts`.

## Local development

Use Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

The local site is available at `http://localhost:3000`.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Environment

Copy `.env.example` to `.env.local` and add the required values. The contact
form uses Resend for email delivery and can optionally store messages in
Supabase.

Never commit `.env.local` or service-role credentials.

## Main routes

- `/` — company homepage
- `/products` — complete portfolio
- `/products/[slug]` — product profile
- `/capabilities` — product and engineering capabilities
- `/company` — company story and principles
- `/insights` — product notes and updates
- `/contact` — enquiries

Legacy `/platforms`, `/enterprise`, `/infrastructure`, and `/industries` routes
redirect to the new information architecture.
