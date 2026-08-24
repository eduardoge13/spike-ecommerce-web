import type { Metadata } from 'next';
import { Product } from '@/types/product';

export const SITE_NAME = 'Punto Clave MX';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://puntoclaveshop.com.mx').replace(
  /\/$/,
  '',
);
export const SITE_DESCRIPTION =
  'Productos premium seleccionados. Precios exclusivos online. Envio rapido a toda la Republica Mexicana.';

const DEFAULT_BRAND = SITE_NAME;

function centsToMxPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getProductPath(product: Product) {
  return `/producto/${product.slug}`;
}

export function getProductUrl(product: Product) {
  return `${SITE_URL}${getProductPath(product)}`;
}

export function getPublicCatalogProducts(products: Product[]) {
  return products.filter((product) => product.category !== 'Prueba');
}

export function getProductBrand(product: Product) {
  const value = `${product.name} ${product.category ?? ''}`.toLowerCase();

  if (value.includes('iphone') || value.includes('apple')) return 'Apple';
  if (value.includes('sonos')) return 'Sonos';

  return DEFAULT_BRAND;
}

export function getProductImages(product: Product) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  return images.filter(Boolean).map(absoluteUrl);
}

export function getProductAvailability(product: Product) {
  return product.stock !== undefined && product.stock <= 0
    ? 'https://schema.org/OutOfStock'
    : 'https://schema.org/InStock';
}

export function getProductJsonLd(product: Product) {
  return {
    '@type': 'Product',
    '@id': `${getProductUrl(product)}#schema`,
    name: product.name,
    description: product.description,
    image: getProductImages(product),
    brand: {
      '@type': 'Brand',
      name: getProductBrand(product),
    },
    sku: product.sku ?? product.id,
    offers: {
      '@type': 'Offer',
      url: getProductUrl(product),
      priceCurrency: 'MXN',
      price: centsToMxPrice(product.price),
      availability: getProductAvailability(product),
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      inventoryLevel:
        product.stock !== undefined
          ? {
              '@type': 'QuantitativeValue',
              value: product.stock,
            }
          : undefined,
    },
  };
}

export function getCatalogProductJsonLd(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': products.map(getProductJsonLd),
  };
}

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getProductMetadata(product: Product): Metadata {
  const [primaryImage] = getProductImages(product);

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: getProductUrl(product),
    },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description,
      url: getProductUrl(product),
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website',
      images: primaryImage
        ? [
            {
              url: primaryImage,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description,
      images: primaryImage ? [primaryImage] : undefined,
    },
    other: {
      'product:brand': getProductBrand(product),
      'product:price:amount': centsToMxPrice(product.price),
      'product:price:currency': 'MXN',
      'product:availability': getProductAvailability(product).replace('https://schema.org/', ''),
    },
  };
}

export function getHomeMetadata(products: Product[]): Metadata {
  const socialImages = products.flatMap((product) =>
    getProductImages(product).slice(0, 1).map((image) => ({
      url: image,
      alt: product.name,
    })),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: `${SITE_NAME} - Tecnologia Premium`,
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${SITE_NAME} - Tecnologia Premium`,
      description: SITE_DESCRIPTION,
      url: '/',
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website',
      images: socialImages.length > 0 ? socialImages : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} - Tecnologia Premium`,
      description: SITE_DESCRIPTION,
      images: socialImages[0]?.url ? [socialImages[0].url] : undefined,
    },
  };
}
