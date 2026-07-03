'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SpeiPaymentSection from '@/components/SpeiPaymentSection';
import StripePaymentSection from '@/components/StripePaymentSection';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';
import { Product } from '@/types/product';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const WaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'h-4 w-4 fill-current'}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface StoreFrontProps {
  products: Product[];
}

export default function StoreFront({ products }: StoreFrontProps) {
  const catalogProducts = products.filter((p) => p.category !== 'Prueba');
  const categories = [
    'Todos',
    ...Array.from(new Set(catalogProducts.map((p) => p.category ?? 'Otros'))),
  ];

  const slides = catalogProducts.map((product) => ({
    image: product.image,
    alt: product.name,
    badge: product.badgeText ?? getSavingsLabel(product.price, product.originalPrice),
    title: product.name,
    subtitle: `${product.description.split('.')[0]}.`,
    price: `$${formatMXNFromCents(product.price)}`,
    originalPrice: product.originalPrice ? `$${formatMXNFromCents(product.originalPrice)}` : null,
  }));

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts =
    activeCategory === 'Todos'
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === activeCategory);

  const goToSlide = (direction: 1 | -1) => {
    setActiveSlide((prev) => (prev + direction + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* ── Announcement bar ── */}
      <div className="bg-[#0D1F4E] px-4 py-2 text-center text-xs font-semibold tracking-wide text-slate-200">
        Envío en 24-48h a todo México &nbsp;·&nbsp; Pago seguro con Stripe &nbsp;·&nbsp; Atención directa por WhatsApp
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Punto Clave MX" className="inline-flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Punto Clave MX"
              width={132}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#productos" className="text-sm font-medium text-gray-700 transition hover:text-[#E04040]">
              Productos
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-700 transition hover:text-[#E04040]">
              Cómo funciona
            </a>
            <a href="#pago" className="text-sm font-medium text-gray-700 transition hover:text-[#E04040]">
              Métodos de pago
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={waLink('Hola! Me interesa conocer sus productos disponibles en Punto Clave MX.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-400 hover:text-green-600"
            >
              <WaIcon className="h-4 w-4 fill-current text-green-500" />
              WhatsApp
            </a>
            <a
              href="#productos"
              className="rounded-lg bg-[#E04040] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#c43333]"
            >
              Ver productos
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 md:hidden"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
            <div className="space-y-3">
              <a href="#productos" className="block text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Productos</a>
              <a href="#como-funciona" className="block text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
              <a href="#pago" className="block text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Métodos de pago</a>
              <a
                href={waLink('Hola! Me interesa conocer sus productos disponibles en Punto Clave MX.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-full justify-center rounded-lg bg-[#E04040] px-4 py-2.5 text-sm font-bold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Ver productos
              </a>
            </div>
          </div>
        )}
      </header>

      <main>

        {/* ── Hero banner — slim dark ── */}
        <section className="relative overflow-hidden bg-[#0D1F4E]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(34,196,204,0.15),transparent_50%),radial-gradient(circle_at_90%_20%,rgba(224,64,64,0.1),transparent_40%)]" />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">

            {/* Copy */}
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-14 lg:px-12">
              <span className="inline-flex w-fit rounded-full bg-red-600/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
                Tecnología premium · México
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Los mejores iPhones
                <span className="block text-[#22C4CC]">al mejor precio.</span>
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
                Originales, sellados, con garantía. Checkout con Stripe o cierra directo por WhatsApp.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#productos"
                  className="inline-flex items-center justify-center rounded-lg bg-[#E04040] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#c43333]"
                >
                  Ver productos
                </a>
                <a
                  href={waLink('Hola! Quiero ver los productos disponibles y promociones de hoy.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <WaIcon />
                  WhatsApp
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
                <span>✅ Original y sellado</span>
                <span>✅ Envío 24-48h</span>
                <span>✅ Garantía incluida</span>
              </div>
            </div>

            {/* Slideshow */}
            {slides.length > 0 && (
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-[420px]">
                <div
                  className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <article key={slide.alt} className="relative h-full w-full shrink-0">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`object-contain p-4 transition-transform duration-[4300ms] ease-out motion-reduce:transition-none ${
                          index === activeSlide ? 'scale-[1.03]' : 'scale-100'
                        }`}
                      />
                      {slide.badge && (
                        <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white shadow-lg">
                          {slide.badge}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0D1F4E] via-[#0D1F4E]/60 to-transparent px-5 pb-8 pt-10 lg:hidden">
                        <p className="text-sm font-bold text-white">{slide.title}</p>
                        {slide.originalPrice && (
                          <p className="text-xs text-slate-400 line-through">{slide.originalPrice}</p>
                        )}
                        <p className="text-lg font-black text-red-400">{slide.price} MXN</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div key={activeSlide} className="hero-slide-progress h-full bg-[#22C4CC]" />
                </div>

                <button
                  className="absolute left-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
                  aria-label="Anterior"
                  onClick={() => goToSlide(-1)}
                >
                  ‹
                </button>
                <button
                  className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
                  aria-label="Siguiente"
                  onClick={() => goToSlide(1)}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Trust strip ── */}
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3">
            {[
              ['✅', 'Productos originales'],
              ['🔒', 'Checkout Stripe seguro'],
              ['📦', 'Envío 24-48h nacional'],
              ['💬', 'Atención por WhatsApp'],
              ['🛡️', 'Garantía incluida'],
            ].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                <span>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Product catalog ── */}
        <section id="productos" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Productos destacados</h2>
            <a
              href={waLink('Hola! Quiero ver todo el catálogo disponible en Punto Clave MX.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 transition hover:text-green-700"
            >
              <WaIcon />
              Ver catálogo completo →
            </a>
          </div>

          {/* Category filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-[#0D1F4E] text-white shadow-sm'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[#0D1F4E] hover:text-[#0D1F4E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="como-funciona" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">Cómo funciona</h2>
            <div className="grid gap-6 sm:grid-cols-3">

              {/* Step 1 */}
              <div className="flex gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1F4E] text-xs font-bold text-white">
                  01
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Explora</p>
                  <p className="mt-1 text-sm text-gray-500">Revisa productos y elige el que más te convenga.</p>
                </div>
              </div>

              {/* Step 2 — highlighted, explained in detail */}
              <div className="rounded-2xl border-2 border-[#22C4CC]/40 bg-cyan-50/40 p-5 sm:-my-3 sm:p-6">
                <div className="flex gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#22C4CC] text-sm font-bold text-white">
                    02
                  </span>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Paga como prefieras</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Elige la forma más cómoda para cerrar tu compra:
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0D1F4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2m-2 0h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Compra directa en la página</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                        Da clic en &ldquo;Pagar con tarjeta&rdquo; en el producto y paga con tarjeta de
                        crédito o débito en checkout seguro con Stripe. Confirmación al instante.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                    <WaIcon className="mt-0.5 h-5 w-5 shrink-0 fill-current text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Cierra por WhatsApp</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                        Escríbenos, te asesoramos en tiempo real y coordinamos tu pago —
                        tarjeta o transferencia SPEI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1F4E] text-xs font-bold text-white">
                  03
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Recibe</p>
                  <p className="mt-1 text-sm text-gray-500">Tu pedido sale en 24h y llega en 24-48h a tu ciudad.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">Lo que dicen nuestros clientes</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['"Me atendieron en minutos por WhatsApp y llegó rápido."', 'Cliente, CDMX'],
              ['"Producto original, tal cual la publicación."', 'Cliente, GDL'],
              ['"Excelente precio y proceso de compra muy fácil."', 'Cliente, MTY'],
            ].map(([quote, author]) => (
              <div key={author} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex gap-0.5 text-yellow-400">
                  {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-sm text-gray-700">{quote}</p>
                <p className="mt-2 text-xs font-semibold text-gray-400">{author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Payment methods ── */}
        <section id="pago" className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">Métodos de pago</h2>
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <StripePaymentSection />
              <SpeiPaymentSection />
            </div>
          </div>
        </section>

        {/* ── CTA band ── */}
        <section className="bg-[#0D1F4E]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-bold text-white">¿Tienes dudas antes de comprar?</p>
                <p className="mt-1 text-sm text-slate-300">Escríbenos por WhatsApp — respondemos en minutos.</p>
              </div>
              <a
                href={waLink('Hola! Quiero cotizar ahora mismo sus productos disponibles.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1fb558]"
              >
                <WaIcon />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Punto Clave MX · Tecnología premium en México
              </p>
              <p className="text-xs text-gray-400">Stripe · SPEI · WhatsApp</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
