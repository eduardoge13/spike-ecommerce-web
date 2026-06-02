import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim() ?? '';
  const stripeSignature = request.headers.get('stripe-signature');

  if (!signingSecret || signingSecret === 'whsec_') {
    return NextResponse.json(
      { error: 'Stripe webhook secret no configurado.' },
      { status: 503 },
    );
  }

  if (!stripeSignature) {
    return NextResponse.json(
      { error: 'Falta la firma de Stripe.' },
      { status: 400 },
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(payload, stripeSignature, signingSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Firma inválida';

    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.info('[stripe] checkout.session.completed', {
        sessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        amountTotal: session.amount_total ?? null,
      });
      break;
    }
    case 'checkout.session.async_payment_failed':
    case 'checkout.session.expired':
      console.warn(`[stripe] ${event.type}`, {
        sessionId: event.data.object.id,
      });
      break;
    default:
      console.info('[stripe] unhandled event', event.type);
  }

  return NextResponse.json({ received: true });
}
