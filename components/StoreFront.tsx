'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import TechShowroomScene from '@/components/TechShowroomScene';
import PublicPageShell from '@/components/showroom/PublicPageShell';
import ShowroomIcon from '@/components/showroom/ShowroomIcon';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';
import { getProductPath } from '@/lib/seo';
import { Product } from '@/types/product';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function StoreFront({ products }: { products: Product[] }) {
  const catalogProducts = useMemo(
    () => products.filter((product) => product.category !== 'Prueba'),
    [products],
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const activeProduct = catalogProducts[activeSlide];

  const goToSlide = (direction: 1 | -1) => {
    if (catalogProducts.length === 0) return;
    setActiveSlide((current) => (current + direction + catalogProducts.length) % catalogProducts.length);
  };

  useEffect(() => {
    if (catalogProducts.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % catalogProducts.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [catalogProducts.length]);

  const savingsLabel = activeProduct
    ? activeProduct.badgeText ?? getSavingsLabel(activeProduct.price, activeProduct.originalPrice)
    : null;
  const isOutOfStock = activeProduct?.stock !== undefined && activeProduct.stock <= 0;

  return (
    <PublicPageShell>
      <section className="showroom-hero" aria-labelledby="hero-title">
        <TechShowroomScene /><div className="hero-grid-overlay" />
        <div className="mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:pb-24 lg:pt-16">
          <div className="relative z-20 max-w-2xl">
            <div className="hero-kicker hero-enter hero-enter-1"><span /> Tecnología original. Compra protegida.</div>
            <h1 id="hero-title" className="hero-title hero-enter hero-enter-2">Tecnología que<br /><span>abre posibilidades.</span></h1>
            <p className="hero-copy hero-enter hero-enter-3">Un showroom digital para descubrir productos originales, comparar sin ruido y comprar en un entorno protegido.</p>
            <div className="hero-actions hero-enter hero-enter-4">
              <Link href="/productos" className="button-primary button-primary-lg">Entrar al showroom <ShowroomIcon name="arrow" /></Link>
              <a href={waLink('Hola! Quiero recibir asesoría para elegir un producto.')} target="_blank" rel="noopener noreferrer" className="button-ghost button-ghost-lg"><ShowroomIcon name="whatsapp" /> Hablar con un asesor</a>
            </div>
            <div className="hero-proof hero-enter hero-enter-5"><span><ShowroomIcon name="shield" /> Original y sellado</span><span><ShowroomIcon name="truck" /> Envío nacional</span><span><ShowroomIcon name="lock" /> Pago protegido</span></div>
          </div>

          {activeProduct && (
            <div className="product-stage relative z-10" aria-live="polite">
              <div className="product-stage-glow" />
              <article key={activeProduct.id} className="hero-product-panel">
                <div className="hero-product-meta"><span>{String(activeSlide + 1).padStart(2, '0')} / {String(catalogProducts.length).padStart(2, '0')}</span><span>{activeProduct.category ?? 'Tecnología'}</span></div>
                <div className="hero-product-image-wrap"><Image src={activeProduct.image} alt={activeProduct.name} fill priority={activeSlide === 0} sizes="(max-width: 1024px) 90vw, 45vw" className="object-contain" /></div>
                <div className="hero-product-info">
                  <div>{savingsLabel && <span className="discount-pill">{savingsLabel}</span>}<h2>{activeProduct.name}</h2><p>{activeProduct.description.split('.')[0]}.</p></div>
                  <div className="hero-product-price">{activeProduct.originalPrice && <span>Antes ${formatMXNFromCents(activeProduct.originalPrice)}</span>}<strong>${formatMXNFromCents(activeProduct.price)} <small>MXN</small></strong><p>{isOutOfStock ? 'Agotado temporalmente' : activeProduct.stock !== undefined ? `${activeProduct.stock} disponibles` : 'Disponible'}</p></div>
                </div>
                <Link href={getProductPath(activeProduct)} className="hero-product-cta">{isOutOfStock ? 'Ver detalles' : 'Comprar ahora'} <ShowroomIcon name="arrow" /></Link>
              </article>
              <div className="hero-slider-controls">
                <button type="button" onClick={() => goToSlide(-1)} aria-label="Producto anterior">←</button>
                <div className="hero-slider-dots">{catalogProducts.map((product, index) => <button key={product.id} type="button" onClick={() => setActiveSlide(index)} className={index === activeSlide ? 'is-active' : ''} aria-label={`Mostrar ${product.name}`} aria-current={index === activeSlide ? 'true' : undefined} />)}</div>
                <button type="button" onClick={() => goToSlide(1)} aria-label="Producto siguiente">→</button>
              </div>
            </div>
          )}
        </div>
        <div className="hero-edge" />
      </section>

      <section className="trust-deck" aria-label="Garantías de compra">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            ['shield', 'Productos originales', 'Equipos nuevos y sellados'], ['lock', 'Stripe Checkout', 'Pago protegido'], ['truck', 'Envío nacional', 'Cobertura en México'], ['whatsapp', 'Atención humana', 'Acompañamiento directo'],
          ].map(([icon, title, text]) => <article key={title} className="trust-deck-item"><ShowroomIcon name={icon} className="h-6 w-6" /><div><strong>{title}</strong><span>{text}</span></div></article>)}
        </div>
      </section>

      <section className="landing-portals">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="section-heading" data-reveal>
            <div><span className="section-index">EXPLORA A TU MANERA</span><h2>Una portada.<br /><em>Tres destinos.</em></h2></div>
            <p>La información ya no compite en una sola página. Cada decisión tiene su propio espacio, con más claridad y menos fricción.</p>
          </div>
          <div className="portal-grid">
            {[
              { href: '/productos', index: '01', icon: 'cube', title: 'Productos', text: 'Explora el catálogo completo, filtra por categoría y entra a la experiencia individual de cada equipo.', accent: 'cyan' },
              { href: '/como-comprar', index: '02', icon: 'spark', title: 'Cómo comprar', text: 'Conoce el proceso desde la elección hasta la entrega, explicado de forma simple y transparente.', accent: 'red' },
              { href: '/pago-seguro', index: '03', icon: 'lock', title: 'Pago seguro', text: 'Revisa Stripe, transferencia SPEI y las protecciones disponibles antes de confirmar.', accent: 'blue' },
            ].map((portal, index) => (
              <Link key={portal.href} href={portal.href} className={`portal-card portal-${portal.accent}`} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                <div className="portal-orbit" /><span className="portal-index">{portal.index}</span><ShowroomIcon name={portal.icon} className="portal-icon" />
                <div><h2>{portal.title}</h2><p>{portal.text}</p></div><span className="portal-action">Abrir página <ShowroomIcon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-manifesto">
        <div className="landing-manifesto-grid mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div data-reveal><span className="section-index">PUNTO CLAVE MX</span><h2>Menos ruido.<br /><em>Mejores decisiones.</em></h2></div>
          <div className="manifesto-copy" data-reveal><p>Diseñamos una experiencia en la que cada producto tiene espacio para hablar por sí mismo y cada paso de compra se entiende antes de pagar.</p><Link href="/productos" className="button-primary button-primary-lg">Descubrir la colección <ShowroomIcon name="arrow" /></Link></div>
        </div>
      </section>
    </PublicPageShell>
  );
}
