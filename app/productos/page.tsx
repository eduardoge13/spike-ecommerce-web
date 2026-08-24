import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCatalog from '@/components/ProductCatalog';
import PublicPageShell from '@/components/showroom/PublicPageShell';
import ShowroomIcon from '@/components/showroom/ShowroomIcon';
import { getAllProducts } from '@/lib/products';
import { getCatalogProductJsonLd, getPublicCatalogProducts, stringifyJsonLd } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Catálogo de tecnología original con stock actualizado y compra protegida mediante Stripe.',
  alternates: { canonical: '/productos' },
  openGraph: { title: 'Productos | Punto Clave MX', description: 'Explora el catálogo completo de Punto Clave MX.', url: '/productos' },
};

export default function ProductsPage() {
  const products = getPublicCatalogProducts(getAllProducts());

  return (
    <PublicPageShell>
      <script id="catalog-product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(getCatalogProductJsonLd(products)) }} />
      <section className="inner-page-hero inner-page-hero-catalog">
        <div className="inner-page-orbit" />
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <span className="hero-kicker hero-enter hero-enter-1"><span /> Showroom completo</span>
          <div className="inner-page-title-grid">
            <h1 className="hero-enter hero-enter-2">La colección,<br /><em>sin distracciones.</em></h1>
            <div className="hero-enter hero-enter-3"><p>Compara precio, disponibilidad y detalles. Cada producto abre su propia experiencia y el pago se inicia únicamente cuando tú lo decides.</p><span>{products.length} productos disponibles en catálogo</span></div>
          </div>
        </div>
      </section>
      <section className="catalog-section">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <ProductCatalog products={products} />
        </div>
      </section>
      <section className="page-route-cta">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div><span className="section-index">¿NECESITAS ORIENTACIÓN?</span><h2>Te ayudamos a elegir.</h2></div>
          <Link href="/como-comprar" className="button-ghost button-ghost-lg">Conocer el proceso <ShowroomIcon name="arrow" /></Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
