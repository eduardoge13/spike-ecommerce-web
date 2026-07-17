import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { decrementStock, hasProcessedWebhookEvent, markWebhookEventProcessed } from '@/lib/products';
import { getStripe } from '@/lib/stripe';

async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  const productId = session.metadata?.productId;

  if (!productId) return;

  try {
    const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });
    const quantity = lineItems.data.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    decrementStock(productId, quantity);
  } catch (error) {
    console.error('[stripe] No se pudo descontar el stock para', productId, error);
  }
}

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

  // Stripe may redeliver the same event; skip if we've already handled it.
  if (hasProcessedWebhookEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.info('[stripe] checkout.session.completed', {
        sessionId: session.id,
        customerEmail: session.customer_details?.email ?? null,
        amountTotal: session.amount_total ?? null,
        paymentStatus: session.payment_status,
      });

      // Métodos asíncronos (p. ej. OXXO/SPEI) completan la sesión con el pago
      // aún pendiente; el stock se descuenta hasta checkout.session.async_payment_succeeded.
      if (session.payment_status === 'paid') {
        await fulfillCheckoutSession(session);
      }

      break;
    }
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.info('[stripe] checkout.session.async_payment_succeeded', {
        sessionId: session.id,
      });

      await fulfillCheckoutSession(session);
      break;
    }
    case 'charge.dispute.created': {
      const dispute = event.data.object as Stripe.Dispute;

      console.error('[stripe] CONTRACARGO RECIBIDO — responder antes de la fecha límite', {
        disputeId: dispute.id,
        chargeId: typeof dispute.charge === 'string' ? dispute.charge : dispute.charge.id,
        amount: dispute.amount,
        currency: dispute.currency,
        reason: dispute.reason,
        evidenceDueBy: dispute.evidence_details?.due_by
          ? new Date(dispute.evidence_details.due_by * 1000).toISOString()
          : null,
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

  markWebhookEventProcessed(event.id);

  return NextResponse.json({ received: true });
}
