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
    ...products.map((product) => ({
      url: getProductUrl(product),
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];
}
