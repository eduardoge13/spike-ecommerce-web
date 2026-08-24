import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { getProductUrl, getPublicCatalogProducts, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getPublicCatalogProducts(getAllProducts());

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...[
      ['/productos', 0.9],
      ['/como-comprar', 0.7],
      ['/pago-seguro', 0.7],
    ].map(([path, priority]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: priority as number,
    })),
    ...products.map((product) => ({
      url: getProductUrl(product),
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];
}
