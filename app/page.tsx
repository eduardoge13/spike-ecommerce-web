import type { Metadata } from 'next';
import { cache } from 'react';
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
  const productJsonLd = getCatalogProductJsonLd(getPublicCatalogProducts(products));

  return (
    <>
      <script
        id="catalog-product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productJsonLd) }}
      />
      <StoreFront products={products} />
    </>
  );
}
