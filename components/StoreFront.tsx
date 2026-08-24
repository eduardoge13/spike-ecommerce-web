'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SpeiPaymentSection from '@/components/SpeiPaymentSection';
import StripePaymentSection from '@/components/StripePaymentSection';
import TechShowroomScene from '@/components/TechShowroomScene';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';
import { getProductPath } from '@/lib/seo';
import { Product } from '@/types/product';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.8 8.1 7 10 4.2-1.9 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    truck: <path d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    lock: <path d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7H4v-7a2 2 0 0 1 2-2Z" />,
    spark: <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Zm6 10 .7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13ZM5 14l.9 2.9L9 18l-3.1 1.1L5 22l-.9-2.9L1 18l3.1-1.1L5 14Z" />,
    card: <path d="M3 6h18v12H3V6Zm0 4h18M7 15h3" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    whatsapp: <path d="M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5A8 8 0 1 1 20 11.6Zm-11-4c.2-.4.4-.4.7-.4h.5c.2 0 .3 0 .4.3l.8 2c.1.2 0 .4-.1.6l-.6.8c-.2.2-.1.4 0 .6.5.9 1.3 1.7 2.2 2.2.2.1.4.2.6 0l.9-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.4 0 .3-.1 1.3-.7 1.8-.5.5-1.3.8-2.2.6-1-.2-2.7-.8-4.5-2.5-1.4-1.3-2.4-3-2.7-4.1-.3-1 .1-1.7.5-2.1.4-.4.9-.6 1.4-.6Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

interface StoreFrontProps {
  products: Product[];
}

export default function StoreFront({ products }: StoreFrontProps) {
  const catalogProducts = useMemo(
    () => products.filter((product) => product.category !== 'Prueba'),
    [products],
  );
  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(catalogProducts.map((product) => product.category ?? 'Otros')))],
    [catalogProducts],
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const activeProduct = catalogProducts[activeSlide];
  const filteredProducts = activeCategory === 'Todos'
    ? catalogProducts
    : catalogProducts.filter((product) => product.category === activeCategory);

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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const savingsLabel = activeProduct
    ? activeProduct.badgeText ?? getSavingsLabel(activeProduct.price, activeProduct.originalPrice)
    : null;
  const isOutOfStock = activeProduct?.stock !== undefined && activeProduct.stock <= 0;

  return (
    <div className="store-shell min-h-screen overflow-hidden bg-[#07142f] text-white">
      <div className="announcement-rail">
        <div className="announcement-track" aria-label="Beneficios de compra">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-10 px-5" aria-hidden={copy === 1}>
              <span>Envíos a todo México</span><span>Pago protegido con Stripe</span><span>Productos originales</span><span>Atención directa por WhatsApp</span>
            </div>
          ))}
        </div>
      </div>

      <header className="showroom-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Punto Clave MX, inicio" className="brand-lockup">
            <Image src="/logo-wide.jpeg" alt="Punto Clave MX" width={200} height={60} className="h-10 w-auto object-contain sm:h-11" priority />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            <a href="#productos" className="showroom-nav-link">Productos</a><a href="#como-funciona" className="showroom-nav-link">Cómo comprar</a><a href="#pago" className="showroom-nav-link">Pago seguro</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={waLink('Hola! Quiero conocer los productos disponibles en Punto Clave MX.')} target="_blank" rel="noopener noreferrer" className="button-ghost"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
            <a href="#productos" className="button-primary">Explorar tienda</a>
          </div>
          <button type="button" className="showroom-menu-button md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
        {menuOpen && (
          <div className="showroom-mobile-menu md:hidden">
            {['productos', 'como-funciona', 'pago'].map((target) => <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>{target === 'productos' ? 'Productos' : target === 'como-funciona' ? 'Cómo comprar' : 'Pago seguro'}</a>)}
            <a href={waLink('Hola! Quiero conocer los productos disponibles en Punto Clave MX.')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        )}
      </header>

      <main>
        <section className="showroom-hero" aria-labelledby="hero-title">
          <TechShowroomScene /><div className="hero-grid-overlay" />
          <div className="mx-auto grid min-h-[760px] max-w-[1440px] items-center gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12 lg:pb-24 lg:pt-16">
            <div className="relative z-20 max-w-2xl">
              <div className="hero-kicker hero-enter hero-enter-1"><span /> Tecnología original. Compra protegida.</div>
              <h1 id="hero-title" className="hero-title hero-enter hero-enter-2">Tecnología que<br /><span>abre posibilidades.</span></h1>
              <p className="hero-copy hero-enter hero-enter-3">Selección premium, precios competitivos y una compra directa con Stripe. Sin intermediarios, sin procesos confusos.</p>
              <div className="hero-actions hero-enter hero-enter-4">
                <a href="#productos" className="button-primary button-primary-lg">Ver productos <Icon name="arrow" /></a>
                <a href={waLink('Hola! Quiero recibir asesoría para elegir un producto.')} target="_blank" rel="noopener noreferrer" className="button-ghost button-ghost-lg"><Icon name="whatsapp" /> Hablar con un asesor</a>
              </div>
              <div className="hero-proof hero-enter hero-enter-5"><span><Icon name="shield" /> Original y sellado</span><span><Icon name="truck" /> Envío nacional</span><span><Icon name="lock" /> Pago protegido</span></div>
            </div>

            {activeProduct && (
              <div className="product-stage relative z-10" aria-live="polite">
                <div className="product-stage-glow" />
                <article key={activeProduct.id} className="hero-product-panel">
                  <div className="hero-product-meta"><span>{String(activeSlide + 1).padStart(2, '0')} / {String(catalogProducts.length).padStart(2, '0')}</span><span>{activeProduct.category ?? 'Tecnología'}</span></div>
                  <div className="hero-product-image-wrap"><Image src={activeProduct.image} alt={activeProduct.name} fill priority loading="eager" sizes="(max-width: 1024px) 90vw, 45vw" className="object-contain" /></div>
                  <div className="hero-product-info">
                    <div>{savingsLabel && <span className="discount-pill">{savingsLabel}</span>}<h2>{activeProduct.name}</h2><p>{activeProduct.description.split('.')[0]}.</p></div>
                    <div className="hero-product-price">{activeProduct.originalPrice && <span>Antes ${formatMXNFromCents(activeProduct.originalPrice)}</span>}<strong>${formatMXNFromCents(activeProduct.price)} <small>MXN</small></strong><p>{isOutOfStock ? 'Agotado temporalmente' : activeProduct.stock !== undefined ? `${activeProduct.stock} disponibles` : 'Disponible'}</p></div>
                  </div>
                  <Link href={getProductPath(activeProduct)} className={`hero-product-cta ${isOutOfStock ? 'is-disabled' : ''}`} aria-disabled={isOutOfStock}>{isOutOfStock ? 'Ver detalles' : 'Comprar ahora'} <Icon name="arrow" /></Link>
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
              ['shield', 'Productos originales', 'Equipos nuevos y sellados'], ['lock', 'Stripe Checkout', '3D Secure y pago protegido'], ['truck', 'Envío nacional', 'Entrega estimada 24-48h'], ['whatsapp', 'Atención humana', 'Acompañamiento por WhatsApp'],
            ].map(([icon, title, text]) => <article key={title} className="trust-deck-item"><Icon name={icon} className="h-6 w-6" /><div><strong>{title}</strong><span>{text}</span></div></article>)}
          </div>
        </section>

        <section id="productos" className="catalog-section">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="section-heading" data-reveal><div><span className="section-index">01 / COLECCIÓN</span><h2>Objetos clave para<br /><em>tu día a día.</em></h2></div><p>Una selección breve y cuidada. Cada producto incluye compra segura, stock actualizado y atención directa.</p></div>
            <div className="category-switcher" data-reveal>{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category}>{category}<span>{category === 'Todos' ? catalogProducts.length : catalogProducts.filter((product) => product.category === category).length}</span></button>)}</div>
            <div className="product-grid">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
          </div>
        </section>

        <section id="como-funciona" className="process-section">
          <div className="process-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="section-heading section-heading-light" data-reveal><div><span className="section-index">02 / PROCESO</span><h2>Comprar bien no debería<br /><em>ser complicado.</em></h2></div><p>Elige el producto, paga en un entorno protegido y recibe acompañamiento hasta la entrega.</p></div>
            <div className="process-steps">{[
              ['01', 'Explora', 'Compara precios, disponibilidad y detalles desde un catálogo enfocado.'], ['02', 'Compra seguro', 'Paga con tarjeta mediante Stripe o coordina transferencia por WhatsApp.'], ['03', 'Recibe', 'Confirmamos tu pedido y coordinamos el envío a cualquier parte de México.'],
            ].map(([number, title, text], index) => <article key={number} className="process-step" data-reveal style={{ transitionDelay: `${index * 100}ms` }}><span>{number}</span><Icon name={index === 0 ? 'spark' : index === 1 ? 'card' : 'truck'} className="h-8 w-8" /><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section id="pago" className="payment-section">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="section-heading section-heading-light" data-reveal><div><span className="section-index">03 / PAGO</span><h2>Tú eliges cómo<br /><em>cerrar la compra.</em></h2></div><p>Checkout digital inmediato o atención personalizada. En ambos caminos ves el importe antes de confirmar.</p></div>
            <div className="grid gap-5 lg:grid-cols-2" data-reveal><StripePaymentSection /><SpeiPaymentSection /></div>
          </div>
        </section>

        <section className="closing-section"><div className="closing-glow" /><div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 lg:py-36" data-reveal><span className="section-index">PUNTO CLAVE MX</span><h2>Tu próxima compra<br /><em>empieza aquí.</em></h2><p>Productos originales, pago protegido y una persona real para ayudarte cuando lo necesites.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#productos" className="button-primary button-primary-lg">Explorar productos <Icon name="arrow" /></a><a href={waLink('Hola! Quiero cotizar un producto de Punto Clave MX.')} target="_blank" rel="noopener noreferrer" className="button-ghost button-ghost-lg"><Icon name="whatsapp" /> WhatsApp</a></div></div></section>
      </main>

      <footer className="showroom-footer"><div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><Image src="/logo-wide.jpeg" alt="Punto Clave MX" width={180} height={54} className="h-10 w-auto object-contain" /><p>© 2026 Punto Clave MX · Tecnología premium en México</p><div><span>Stripe</span><span>SPEI</span><span>WhatsApp</span></div></div></footer>
    </div>
  );
}
