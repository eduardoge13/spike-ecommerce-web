# Spike E-commerce Web

E-commerce website with Stripe and Mercado Pago payment integration.

## Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Payments**: Stripe, Mercado Pago
- **Hosting**: Vercel (recommended)

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

Deploy to Vercel with one click or push to GitHub and import.

## License

MIT
