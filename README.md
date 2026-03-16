# Spike E-commerce Web

E-commerce website with Stripe and Mercado Pago payment integration.

## Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Payments**: Stripe, Mercado Pago
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
