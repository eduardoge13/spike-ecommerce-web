# Setup Guide - Spike E-commerce

## Client Information Needed

### Payment Providers

#### Stripe Setup
1. Create account at https://dashboard.stripe.com
2. Get your API keys from Dashboard → Developers → API Keys
   - **Publishable Key**: `pk_test_...` (for testing) or `pk_live_...` (for production)
   - **Secret Key**: `sk_test_...` (for testing) or `sk_live_...` (for production)
3. Setup webhook endpoint (after deployment)
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to listen: `checkout.session.completed`, `payment_intent.succeeded`
   - Get **Webhook Secret**: `whsec_...`

#### Mercado Pago Setup
1. Create account at https://www.mercadopago.com.mx
2. Go to https://www.mercadopago.com.mx/developers/panel/app
3. Create application
4. Get credentials:
   - **Public Key**: `TEST-...` (for testing) or `APP_USR-...` (for production)
   - **Access Token**: `TEST-...` (for testing) or `APP_USR-...` (for production)

### Product Information

For each product, provide:
- Product name
- Description (short and long)
- Price (MXN)
- Images (high quality, at least 800x800px)
- Category
- Stock quantity (if tracking inventory)
- SKU/Product ID (optional)

### Business Information

- Business name
- Logo (PNG/SVG, transparent background preferred)
- Brand colors (hex codes, e.g., #FF5733)
- Contact email
- Phone number
- Physical address (if applicable)
- Social media links (optional)

## Environment Variables Setup

Once you have the information, update `.env.local`:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-your_key
MERCADOPAGO_ACCESS_TOKEN=TEST-your_token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing Credentials

### Stripe Test Cards
- **Success**: 4242 4242 4242 4242 (any future date, any CVC)
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0027 6000 3184

### Mercado Pago Test Cards (Mexico)
- **Approved**: 5031 7557 3453 0604 (Visa)
- **Declined**: 5031 4332 1540 6351 (Visa)
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## Next Steps

1. Configure `.env.local` with client's keys
2. Add products to database/JSON file
3. Test checkout flow with test cards
4. Deploy to Vercel
5. Configure production webhooks
6. Test with real transactions in test mode
7. Switch to production keys when ready