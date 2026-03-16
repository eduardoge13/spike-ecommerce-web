import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error Stripe SDK version mismatch
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
