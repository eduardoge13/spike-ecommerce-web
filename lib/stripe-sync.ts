import { Product } from '@/types/product';
import { getStripeProductId, setStripeProductId } from '@/lib/products';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

/**
 * Best-effort sync of a product into the Stripe Dashboard's product catalog, purely for
 * visibility/reporting. Checkout never depends on this — it always builds the charge from
 * live product data via `price_data` (see lib/stripe-checkout.ts). If Stripe is unreachable
 * or rejects the request, we log and move on; the product still works normally in the store.
 */
export async function syncProductToStripe(product: Product): Promise<void> {
  if (!isStripeConfigured()) return;

  try {
    const stripe = getStripe();
    const existingId = getStripeProductId(product.id);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '');
    const absoluteImages =
      appUrl && product.images
        ? product.images.map((src) => (src.startsWith('http') ? src : `${appUrl}${src}`))
        : [];

    const productData = {
      name: product.name,
      description: product.description,
      images: absoluteImages,
      active: true,
      metadata: { internalId: product.id },
    };

    if (existingId) {
      await stripe.products.update(existingId, productData);
    } else {
      const created = await stripe.products.create(productData);
      setStripeProductId(product.id, created.id);
    }
  } catch (error) {
    console.error('[stripe-sync] No se pudo sincronizar el producto con Stripe (no bloqueante):', error);
  }
}

export async function archiveStripeProduct(productId: string): Promise<void> {
  if (!isStripeConfigured()) return;

  const stripeProductId = getStripeProductId(productId);
  if (!stripeProductId) return;

  try {
    const stripe = getStripe();
    await stripe.products.update(stripeProductId, { active: false });
  } catch (error) {
    console.error('[stripe-sync] No se pudo archivar el producto en Stripe (no bloqueante):', error);
  }
}
