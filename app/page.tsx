'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SpeiPaymentSection from '@/components/SpeiPaymentSection';
import StripePaymentSection from '@/components/StripePaymentSection';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getAllProducts } from '@/lib/products';

const products = getAllProducts();

const slides = products.map((product) => ({
  image: product.image,
  alt: product.name,
  badge: product.category ?? 'Destacado',
  title: product.name,
  subtitle: `${product.description.split('.')[0]}.`,
  price: `$${new Intl.NumberFormat('es-MX').format(product.price / 100)} MXN`,
  message: product.whatsappMessage ?? `Hola! Me interesa el ${product.name}. Esta disponible?`,
}));

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
          <Link
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D1F4E]/70">
                Tienda oficial
              </p>
              <p className="text-sm font-bold text-[#0D1F4E]">Punto Clave MX</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#beneficios"
              className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Beneficios
            </a>
            <a
              href="#productos"
              className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Productos
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Cómo funciona
            </a>
            <a
              href="#pago"
              className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Métodos de pago
            </a>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <div className="space-y-3">
              <a
                href="#beneficios"
                className="block text-sm text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                Beneficios
              </a>
              <a
                href="#productos"
                className="block text-sm text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                Productos
              </a>
              <a
                href="#como-funciona"
                className="block text-sm text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                Cómo funciona
              </a>
              <a
                href="#pago"
                className="block text-sm text-slate-200"
                onClick={() => setMenuOpen(false)}
              >
                Métodos de pago
              </a>
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
              Productos originales, precios competitivos y checkout seguro con Stripe.
              Si prefieres trato directo, también cerramos por WhatsApp y SPEI.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#productos"
                className="inline-flex items-center justify-center rounded-xl bg-[#22C4CC] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_35px_rgba(34,196,204,.35)] transition hover:-translate-y-0.5 hover:bg-[#19aeb6]"
              >
                Comprar ahora
              </a>
              <a
                href={waLink('Hola! Quiero ver los productos disponibles y promociones de hoy.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver catálogo por WhatsApp
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-200">
              <span>✅ Producto original</span>
              <span>✅ Envío 24-48h</span>
              <span>✅ Pago con Stripe</span>
              <span>✅ Garantía incluida</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0D1F4E] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-red-500/10" />
            <div className="relative h-[430px] sm:h-[520px]">
              {slides.map((slide, index) => (
                <article
                  key={slide.alt}
                  className={`${index === activeSlide ? 'block' : 'hidden'} absolute inset-0`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-3 sm:p-4"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08132E] via-[#08132E]/85 to-transparent p-5">
                    <span className="inline-flex rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                      {slide.badge}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white">{slide.title}</h3>
                    <p className="mt-1 text-sm text-slate-200">{slide.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xl font-extrabold text-white">{slide.price}</p>
                      <a
                        href="#productos"
                        className="rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1fb558]"
                      >
                        Comprar hoy
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
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Confianza y credibilidad
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-5">
              {[
                'Productos originales',
                'Checkout Stripe',
                'Compra segura',
                'Atención WhatsApp',
                'Envío nacional',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">
                &ldquo;Me atendieron en minutos por WhatsApp y llegó rápido.&rdquo;
                <span className="mt-2 block text-xs text-slate-300">Cliente, CDMX</span>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">
                &ldquo;Producto original, tal cual la publicación.&rdquo;
                <span className="mt-2 block text-xs text-slate-300">Cliente, GDL</span>
              </article>
              <article className="rounded-xl border border-white/10 bg-[#0D1F4E]/75 p-4 text-sm text-slate-100">
                &ldquo;Excelente precio y proceso de compra muy fácil.&rdquo;
                <span className="mt-2 block text-xs text-slate-300">Cliente, MTY</span>
              </article>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Por qué comprar aquí</h2>
          <p className="mt-2 text-slate-300">
            Beneficios claros para ayudarte a decidir rápido.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['⚡', 'Entrega rápida', 'Recibe en 24-48h en gran parte de México.'],
              ['🎯', 'Precio competitivo', 'Ofertas reales en productos premium.'],
              ['🔒', 'Pago confiable', 'Tarjeta con Stripe o transferencia SPEI.'],
              ['💬', 'Soporte humano', 'Asesoría directa por WhatsApp antes y después de pagar.'],
            ].map(([icon, title, text]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-lg">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="productos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Productos destacados</h2>
              <p className="mt-2 text-slate-300">
                Selección curada con disponibilidad real y checkout inmediato por producto.
              </p>
            </div>
            <a
              href={waLink('Hola! Quiero ver todo el catálogo disponible en Punto Clave MX.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Ver catálogo completo →
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Cómo funciona</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['01', 'Explora', 'Revisa productos y elige el ideal para ti.'],
                ['02', 'Paga', 'Compra con Stripe o contáctanos para cerrar por WhatsApp.'],
                ['03', 'Recibe', 'Procesamos tu pedido y coordinamos el envío a tu ciudad.'],
              ].map(([step, title, text]) => (
                <article key={step} className="rounded-2xl border border-white/10 bg-[#0D1F4E]/75 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-100">
                    {step}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pago" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <StripePaymentSection />
            <SpeiPaymentSection />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400/25 via-cyan-400/10 to-red-500/20 p-7 sm:p-10">
            <h2 className="max-w-3xl text-3xl font-extrabold text-white sm:text-4xl">
              ¿Listo para comprar hoy?
            </h2>
            <p className="mt-3 max-w-2xl text-slate-100">
              Elige tu producto, paga en checkout seguro o escríbenos por WhatsApp para una
              atención inmediata.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#productos"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0D1F4E] transition hover:bg-slate-100"
              >
                Ir a productos
              </a>
              <a
                href={waLink('Hola! Quiero cotizar ahora mismo sus productos disponibles.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
