# Spike E-commerce Web

Punto Clave MX storefront with direct Stripe Checkout, WhatsApp-assisted sales, and SPEI fallback.

## Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Payments**: Stripe Checkout, SPEI, Mercado Pago-ready scaffolding
- **Hosting**: Hostinger VPS with Docker Compose + Traefik
- **CI/CD**: GitHub Actions over SSH

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

**Get your keys:**
- Stripe: https://dashboard.stripe.com/apikeys
- Mercado Pago: https://www.mercadopago.com/developers/panel/app

### Stripe flow

- Product cards launch a hosted Stripe Checkout session from `app/api/stripe/checkout/route.ts`
- Successful payments land on `/checkout/success` with the order summary
- Cancelled checkouts return to `/checkout/cancel`
- `app/api/stripe/webhook/route.ts` is ready for `checkout.session.completed` and related events

### Minimum Stripe env needed

- `STRIPE_SECRET_KEY`
  Required for checkout session creation and order lookup on the success page.
- `STRIPE_WEBHOOK_SECRET`
  Recommended in production so Stripe can sign webhook deliveries to `/api/stripe/webhook`.
- `NEXT_PUBLIC_APP_URL`
  Used by the deployed app URL and should point to the production host.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

- Production deploys run from `.github/workflows/ci-cd.yml`
- The VPS deploy path uses `docker-compose.yml` + `docker-compose.production.yml`
- The server-side deploy entrypoint is `scripts/deploy-production.sh`
- Full setup, secrets, rollback, and VPS notes live in [`docs/PRODUCTION_DEPLOYMENT.md`](docs/PRODUCTION_DEPLOYMENT.md)

## Operations Docs

- [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md)
- [`docs/PRODUCTION_DEPLOYMENT.md`](docs/PRODUCTION_DEPLOYMENT.md)

## License

MIT
