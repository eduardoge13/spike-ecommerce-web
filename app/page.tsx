'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '5215512345678';

const slides = [
  {
    image: '/products/iphone-17-pro-max-2.jpeg',
    alt: 'iPhone 17 Pro Max 256GB',
    badge: 'Nuevo ingreso',
    title: 'iPhone 17 Pro Max 256GB',
    subtitle: 'Producto original, sellado y con envío rápido.',
    price: '$25,999 MXN',
    message: 'Hola! Me interesa el iPhone 17 Pro Max 256GB a $25,999. Esta disponible?',
  },
  {
    image: '/products/iphone-16-2.jpeg',
    alt: 'iPhone 16',
    badge: 'Oferta activa',
    title: 'iPhone 16',
    subtitle: 'Excelente precio online con stock limitado.',
    price: '$14,499 MXN',
    message: 'Hola! Me interesa el iPhone 16 a $14,499. Esta disponible?',
  },
  {
    image: '/products/sonos-era-100.jpeg',
    alt: 'Sonos ERA 100',
    badge: 'Audio premium',
    title: 'Sonos ERA 100',
    subtitle: 'Sonido potente para casa o estudio.',
    price: '$3,600 MXN',
    message: 'Hola! Me interesa el Sonos ERA 100 a $3,600. Esta disponible?',
  },
];

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#08132E] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,196,204,0.2),transparent_34%),radial-gradient(circle_at_90%_5%,rgba(224,64,64,0.14),transparent_28%),radial-gradient(circle_at_50%_60%,rgba(27,58,120,0.2),transparent_44%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08132E]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="/"
            aria-label="Punto Clave MX"
            className="group inline-flex items-center gap-3 rounded-2xl border border-cyan-300/35 bg-white px-2.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,.22)]"
          >
            <Image
              src="/logo.jpeg"
              alt="Punto Clave MX"
              width={132}
              height={44}
              className="h-11 w-auto rounded-md object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D1F4E]/70">Tienda oficial</p>
              <p className="text-sm font-bold text-[#0D1F4E]">Punto Clave MX</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#beneficios" className="text-sm font-medium text-slate-200 transition hover:text-cyan-300">Beneficios</a>
            <a href="#productos" className="text-sm font-medium text-slate-200 transition hover:text-cyan-300">Productos</a>
            <a href="#como-funciona" className="text-sm font-medium text-slate-200 transition hover:text-cyan-300">Cómo funciona</a>
          </nav>

          <a
            href={waLink('Hola! Me interesa conocer sus productos disponibles en Punto Clave MX.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl bg-[#E04040] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#c43333] md:inline-flex"
          >
            Comprar por WhatsApp
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 text-white md:hidden"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <div className="space-y-3">
              <a href="#beneficios" className="block text-sm text-slate-200" onClick={() => setMenuOpen(false)}>Beneficios</a>
              <a href="#productos" className="block text-sm text-slate-200" onClick={() => setMenuOpen(false)}>Productos</a>
              <a href="#como-funciona" className="block text-sm text-slate-200" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
              <a
                href={waLink('Hola! Me interesa conocer sus productos disponibles en Punto Clave MX.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-full justify-center rounded-xl bg-[#E04040] px-4 py-2.5 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-8 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:pt-16">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Tecnología premium en México
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Compra tecnología top
              <span className="block text-cyan-300">con atención inmediata.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Productos originales, precios competitivos y cierre rápido por WhatsApp.
              Todo pensado para que compres fácil y sin fricción.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Hola! Quiero ver los productos disponibles y promociones de hoy.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#22C4CC] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_35px_rgba(34,196,204,.35)] transition hover:-translate-y-0.5 hover:bg-[#19aeb6]"
              >
                Ver catálogo por WhatsApp
              </a>
              <a href="#productos" className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explorar destacados
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-200">
              <span>✅ Producto original</span>
              <span>✅ Envío 24-48h</span>
              <span>✅ Pago seguro</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0D1F4E] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-red-500/10" />
            <div className="relative h-[430px] sm:h-[520px]">
              {slides.map((slide, index) => (
                <article key={slide.alt} className={`${index === activeSlide ? 'block' : 'hidden'} absolute inset-0`}>
                  <Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-3 sm:p-4" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08132E] via-[#08132E]/85 to-transparent p-5">
                    <span className="inline-flex rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">{slide.badge}</span>
                    <h3 className="mt-2 text-xl font-bold text-white">{slide.title}</h3>
                    <p className="mt-1 text-sm text-slate-200">{slide.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xl font-extrabold text-white">{slide.price}</p>
                      <a
                        href={waLink(slide.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1fb558]"
                      >
                        Comprar por WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              <button
                className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white"
                aria-label="Anterior"
                onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              >
                ‹
              </button>
              <button
                className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white"
                aria-label="Siguiente"
                onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Confianza y credibilidad</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-5">
              {['Stripe', 'Mercado Pago', 'Compra segura', 'Atención WhatsApp', 'Envío nacional'].map((item) => (
                <span key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">{item}</span>
              ))}
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">“Me atendieron en minutos por WhatsApp y llegó rápido.” <span className="mt-2 block text-xs text-slate-300">Cliente, CDMX</span></article>
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">“Producto original, tal cual la publicación.” <span className="mt-2 block text-xs text-slate-300">Cliente, GDL</span></article>
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">“Excelente precio y proceso de compra muy fácil.” <span className="mt-2 block text-xs text-slate-300">Cliente, MTY</span></article>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Por qué comprar aquí</h2>
          <p className="mt-2 text-slate-300">Beneficios claros para ayudarte a decidir rápido.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['⚡', 'Entrega rápida', 'Recibe en 24-48h en gran parte de México.'],
              ['🎯', 'Precio competitivo', 'Ofertas reales en productos premium.'],
              ['🔒', 'Pago confiable', 'Procesamiento seguro con pasarelas confiables.'],
              ['💬', 'Soporte humano', 'Asesoría directa por WhatsApp antes de pagar.'],
            ].map(([icon, title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-lg">{icon}</div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="productos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Resultados que sí importan</h2>
          <p className="mt-2 text-slate-300">Compra rápida, atención directa y entrega sin complicaciones.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
              <h3 className="text-lg font-semibold text-white">Selección curada de productos top</h3>
              <p className="mt-2 text-sm text-slate-300">iPhone, audio y gadgets premium con disponibilidad real.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Transparencia de precio</h3>
              <p className="mt-2 text-sm text-slate-300">Cotización clara y rápida por WhatsApp.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Cierre en minutos</h3>
              <p className="mt-2 text-sm text-slate-300">Te guiamos en disponibilidad y pago al instante.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
              <h3 className="text-lg font-semibold text-white">Envío nacional con seguimiento</h3>
              <p className="mt-2 text-sm text-slate-300">Desde que pagas hasta que recibes, con soporte humano.</p>
            </article>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Cómo funciona</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['01', 'Explora', 'Revisa productos y elige el ideal para ti.'],
                ['02', 'Confirma', 'Escríbenos y validamos stock + precio final.'],
                ['03', 'Recibe', 'Procesamos y enviamos rápido a tu ciudad.'],
              ].map(([step, title, text]) => (
                <article key={step} className="rounded-2xl border border-white/10 bg-[#0D1F4E]/75 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-100">{step}</span>
                  <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400/25 via-cyan-400/10 to-red-500/20 p-7 sm:p-10">
            <h2 className="max-w-3xl text-3xl font-extrabold text-white sm:text-4xl">¿Listo para cotizar y comprar hoy?</h2>
            <p className="mt-3 max-w-2xl text-slate-100">Te respondemos rápido por WhatsApp con disponibilidad y mejor oferta.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Hola! Quiero cotizar ahora mismo sus productos disponibles.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0D1F4E] transition hover:bg-slate-100"
              >
                Hablar por WhatsApp
              </a>
              <a href="#productos" className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                Ver productos
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
