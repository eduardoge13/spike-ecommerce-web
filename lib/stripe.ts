import Stripe from 'stripe';

const PLACEHOLDER_VALUES = new Set(['', 'sk_test_', 'sk_live_']);

let stripeClient: Stripe | null = null;

function getSecretKey() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim() ?? '';

  if (!secretKey || PLACEHOLDER_VALUES.has(secretKey)) {
    throw new Error('Stripe no está configurado todavía en este entorno.');
  }

  return secretKey;
}

export function isStripeConfigured() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim() ?? '';
  return !PLACEHOLDER_VALUES.has(secretKey);
}

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getSecretKey(), {
      typescript: true,
    });
  }

  return stripeClient;
}
