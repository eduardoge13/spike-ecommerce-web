import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getProductById } from '@/lib/products';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

export class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'CheckoutError';
  }
}

interface CreateCheckoutSessionOptions {
  origin: string;
  productId: string;
  quantity?: number;
}

export async function createProductCheckoutSession({
  origin,
  productId,
  quantity = 1,
}: CreateCheckoutSessionOptions) {
  if (!productId) {
    throw new CheckoutError('No recibimos el producto que quieres comprar.', 400);
  }

  const product = getProductById(productId);

  if (!product) {
    throw new CheckoutError('Ese producto ya no está disponible en el catálogo.', 404);
  }

  if (!isStripeConfigured()) {
    throw new CheckoutError(
      'El pago con tarjeta todavía no está configurado en producción.',
      503,
    );
  }

  const stripe = getStripe();
  const maxQuantity = Math.max(1, product.stock ?? 10);
  const checkoutQuantity = Math.max(1, Math.floor(quantity));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'es-419',
    branding_settings: {
      background_color: '#08132E',
      border_style: 'rounded',
      button_color: '#22C4CC',
      display_name: 'Punto Clave MX',
      font_family: 'inter',
      logo: {
        type: 'url',
        url: `${origin}/logo.jpeg`,
      },
    },
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
        quantity: checkoutQuantity,
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

  return { checkoutUrl: session.url, product, session };
}
