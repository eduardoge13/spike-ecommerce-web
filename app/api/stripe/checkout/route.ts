import { NextResponse } from 'next/server';
import {
  CheckoutError,
  createProductCheckoutSession,
} from '@/lib/stripe-checkout';

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { productId?: string; quantity?: number }
      | null;

    const productId = typeof body?.productId === 'string' ? body.productId : '';
    const requestedQuantity =
      typeof body?.quantity === 'number' && Number.isFinite(body.quantity)
        ? Math.floor(body.quantity)
        : 1;

    const { checkoutUrl } = await createProductCheckoutSession({
      origin: new URL(request.url).origin,
      productId,
      quantity: requestedQuantity,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error('[stripe] checkout route failed', error);

    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        error:
          'No pudimos iniciar el pago en este momento. Intenta de nuevo en unos minutos o compra por WhatsApp.',
      },
      { status: 500 },
    );
  }
}
