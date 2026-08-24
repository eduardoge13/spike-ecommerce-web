import type { Metadata } from 'next';
import { cache } from 'react';
import LegacyProductHashRedirect from '@/components/LegacyProductHashRedirect';
import StoreFront from '@/components/StoreFront';
import { getAllProducts } from '@/lib/products';
import {
  getCatalogProductJsonLd,
  getHomeMetadata,
  getPublicCatalogProducts,
  stringifyJsonLd,
} from '@/lib/seo';

export const dynamic = 'force-dynamic';

const getCachedProducts = cache(() => getAllProducts());

export function generateMetadata(): Metadata {
  return getHomeMetadata(getPublicCatalogProducts(getCachedProducts()));
}

export default function Home() {
  const products = getCachedProducts();
  const publicProducts = getPublicCatalogProducts(products);
  const productJsonLd = getCatalogProductJsonLd(publicProducts);
  const legacyProductPaths = Object.fromEntries(
    publicProducts.flatMap((product) => [
      [product.id, `/producto/${product.slug}`],
      [`producto-${product.id}`, `/producto/${product.slug}`],
    ]),
  );
  Object.assign(legacyProductPaths, {
    productos: '/productos',
    'como-funciona': '/como-comprar',
    pago: '/pago-seguro',
  });

  return (
    <>
      <LegacyProductHashRedirect productPaths={legacyProductPaths} />
      <script
        id="catalog-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productJsonLd) }}
      />
      <StoreFront products={products} />
    </>
  );
}
