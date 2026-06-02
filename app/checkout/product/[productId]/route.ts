import { NextResponse } from 'next/server';
import { createProductCheckoutSession } from '@/lib/stripe-checkout';

type CheckoutProductRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(request: Request, { params }: CheckoutProductRouteContext) {
  const { productId } = await params;
  const origin = new URL(request.url).origin;

  try {
    const { checkoutUrl } = await createProductCheckoutSession({
      origin,
      productId,
    });

    return NextResponse.redirect(checkoutUrl, 303);
  } catch (error) {
    console.error('[stripe] product checkout redirect failed', error);

    return NextResponse.redirect(`${origin}/checkout/cancel?product=${productId}`, 303);
  }
}
