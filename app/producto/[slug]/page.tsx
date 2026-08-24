import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductImmersiveGallery from '@/components/ProductImmersiveGallery';
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
  params: Promise<{ slug: string }>;
}

function getWhatsAppLink(productName: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Me interesa el ${productName}. Esta disponible?`)}`;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return getPublicCatalogProducts(getAllProducts()).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  return product && product.category !== 'Prueba' ? getProductMetadata(product) : { title: 'Producto no encontrado' };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug((await params).slug);
  if (!product || product.category === 'Prueba') notFound();

  const images = (product.images?.length ? product.images : [product.image]).filter(Boolean);
  const originalPrice = product.originalPrice ? formatMXNFromCents(product.originalPrice) : null;
  const currentPrice = formatMXNFromCents(product.price);
  const savingsLabel = product.badgeText ?? getSavingsLabel(product.price, product.originalPrice);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const productJsonLd = { '@context': 'https://schema.org', ...getProductJsonLd(product) };

  return (
    <main className="product-showroom min-h-screen text-white">
      <script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(productJsonLd) }} />

      <header className="product-showroom-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="brand-lockup" aria-label="Volver a Punto Clave MX">
            <Image src="/logo-wide.jpeg" alt="Punto Clave MX" width={190} height={57} className="h-10 w-auto" priority />
          </Link>
          <Link href="/productos" className="product-back-link"><span>←</span> Volver a la colección</Link>
        </div>
      </header>

      <section className="product-showroom-grid mx-auto max-w-[1440px] px-5 pb-24 pt-8 sm:px-8 lg:px-12 lg:pb-28 lg:pt-12">
        <div className="product-page-gallery-column">
          <span className="product-page-watermark" aria-hidden="true">{product.category ?? 'TECH'}</span>
          <ProductImmersiveGallery name={product.name} images={images} badge={savingsLabel} isOutOfStock={isOutOfStock} />
        </div>

        <aside className="product-buy-panel">
          <div className="product-buy-eyebrow"><span>{getProductBrand(product)}</span><span>{product.category ?? 'Tecnología'}</span></div>
          <h1>{product.name}</h1>
          <p className="product-buy-description">{product.description}</p>

          <div className="product-buy-price">
            {originalPrice && <span>Precio anterior: <s>${originalPrice} MXN</s></span>}
            <strong>${currentPrice}<small> MXN</small></strong>
            <div className="product-availability"><i className={isOutOfStock ? 'is-out' : ''} />{isOutOfStock ? 'Agotado temporalmente' : product.stock !== undefined ? `${product.stock} unidades disponibles` : 'Disponible para compra'}</div>
          </div>

          <div className="product-buy-actions">
            {isOutOfStock ? <button type="button" disabled className="product-detail-out">Producto agotado</button> : <StripeCheckoutButton productId={product.id} productName={product.name} variant="detail" />}
            <a href={getWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer" className="product-detail-whatsapp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5A8 8 0 1 1 20 11.6Z" /><path d="M8 8c.5 4 3.5 7 7.5 7.5" /></svg>
              Consultar por WhatsApp
            </a>
          </div>

          <div className="product-assurance-list">
            {[
              ['Autenticidad', 'Producto nuevo y original'],
              ['Pago', 'Stripe Checkout con 3D Secure'],
              ['Envío', 'Cobertura nacional 24-48h'],
              ['Atención', 'Soporte humano por WhatsApp'],
            ].map(([title, text]) => <div key={title}><span>✓</span><p><strong>{title}</strong>{text}</p></div>)}
          </div>
          <p className="product-sku">ID de producto · {product.sku ?? product.id}</p>
        </aside>
      </section>

      {!isOutOfStock && (
        <div className="product-mobile-buy">
          <div><span>{product.name}</span><strong>${currentPrice} MXN</strong></div>
          <StripeCheckoutButton productId={product.id} productName={product.name} variant="detail" />
        </div>
      )}
    </main>
  );
}
