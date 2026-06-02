import { NextResponse } from 'next/server';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getProductById } from '@/lib/products';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

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
    const quantity = Math.max(1, requestedQuantity);

    if (!productId) {
      return NextResponse.json(
        { error: 'No recibimos el producto que quieres comprar.' },
        { status: 400 },
      );
    }

    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Ese producto ya no está disponible en el catálogo.' },
        { status: 404 },
      );
    }

    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          error:
            'El pago con tarjeta todavía no está configurado en producción. Por ahora puedes cerrar tu compra por WhatsApp o SPEI.',
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const origin = new URL(request.url).origin;
    const maxQuantity = Math.max(1, product.stock ?? 10);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'es-419',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ['MX'] },
      customer_creation: 'always',
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel?product=${product.id}`,
      metadata: {
        productId: product.id,
        productName: product.name,
        salesChannel: 'puntoclave-web',
        whatsappNumber: WHATSAPP_NUMBER,
      },
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
            },
          },
          quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: maxQuantity,
          },
        },
      ],
    });

    if (!session.url) {
      throw new Error('Stripe no devolvió una URL de checkout.');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[stripe] checkout route failed', error);

    return NextResponse.json(
      {
        error:
          'No pudimos iniciar el pago en este momento. Intenta de nuevo en unos minutos o compra por WhatsApp.',
      },
      { status: 500 },
    );
  }
}
