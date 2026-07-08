import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';
import {
  getProductBrand,
  getProductJsonLd,
  getProductMetadata,
  getPublicCatalogProducts,
  stringifyJsonLd,
} from '@/lib/seo';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getWhatsAppLink(productName: string) {
  const message = `Hola! Me interesa el ${productName}. Esta disponible?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return getPublicCatalogProducts(getAllProducts()).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category === 'Prueba') {
    return {
      title: 'Producto no encontrado',
    };
  }

  return getProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.category === 'Prueba') {
    notFound();
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const primaryImage = images.find(Boolean) ?? product.image;
  const originalPrice = product.originalPrice ? formatMXNFromCents(product.originalPrice) : null;
  const currentPrice = formatMXNFromCents(product.price);
  const savingsLabel = product.badgeText ?? getSavingsLabel(product.price, product.originalPrice);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const productJsonLd = {
    '@context': 'https://schema.org',
    ...getProductJsonLd(product),
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productJsonLd) }}
      />

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-bold text-[#0D1F4E]">
            Punto Clave MX
          </Link>
          <Link href="/#productos" className="text-sm font-semibold text-gray-500 hover:text-[#0D1F4E]">
            Volver al catálogo
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
            />
            {savingsLabel && (
              <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow">
                {savingsLabel}
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute right-4 top-4 rounded-full bg-gray-700 px-3 py-1 text-xs font-bold text-white shadow">
                Agotado
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.slice(0, 4).map((image) => (
                <div key={image} className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                  <Image src={image} alt={product.name} fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#0D1F4E]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0D1F4E]">
              {getProductBrand(product)}
            </span>
            {product.category && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                {product.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{product.description}</p>

          <div className="mt-6 rounded-2xl bg-gray-50 p-5">
            {originalPrice && (
              <p className="text-sm font-semibold text-gray-400 line-through">
                ${originalPrice} MXN
              </p>
            )}
            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-black text-red-600">${currentPrice}</span>
              <span className="pb-1 text-sm font-bold text-red-500">MXN</span>
            </div>
            <p className="mt-2 text-xs font-medium text-gray-500">
              {isOutOfStock
                ? 'Producto agotado por el momento.'
                : product.stock !== undefined
                  ? `Stock disponible: ${product.stock}`
                  : 'Disponible para compra.'}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {isOutOfStock ? (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 px-5 py-3 text-sm font-bold text-gray-500"
              >
                Agotado
              </button>
            ) : (
              <StripeCheckoutButton productId={product.id} productName={product.name} />
            )}
            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg border border-green-500 px-4 py-3 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
            >
              Comprar por WhatsApp
            </a>
          </div>

          <dl className="mt-6 grid gap-3 border-t border-gray-100 pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-bold text-gray-900">Condición</dt>
              <dd className="mt-1 text-gray-500">Nuevo</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Moneda</dt>
              <dd className="mt-1 text-gray-500">MXN</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Pago</dt>
              <dd className="mt-1 text-gray-500">Stripe o WhatsApp</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Envío</dt>
              <dd className="mt-1 text-gray-500">México 24-48h</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
