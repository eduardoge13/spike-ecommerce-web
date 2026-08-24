import type { Metadata } from 'next';
import Link from 'next/link';
import PublicPageShell from '@/components/showroom/PublicPageShell';
import ShowroomIcon from '@/components/showroom/ShowroomIcon';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cómo comprar',
  description: 'Conoce el proceso para elegir, pagar y recibir productos de Punto Clave MX.',
  alternates: { canonical: '/como-comprar' },
  openGraph: { title: 'Cómo comprar | Punto Clave MX', description: 'Compra tecnología original con un proceso claro y acompañado.', url: '/como-comprar' },
};

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Necesito ayuda para realizar una compra en Punto Clave MX.')}`;

export default function HowToBuyPage() {
  return (
    <PublicPageShell>
      <section className="inner-page-hero inner-page-hero-process">
        <div className="inner-page-orbit" />
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <span className="hero-kicker hero-enter hero-enter-1"><span /> Compra simple, acompañamiento real</span>
          <div className="inner-page-title-grid"><h1 className="hero-enter hero-enter-2">De elegir a recibir,<br /><em>sin vueltas.</em></h1><p className="hero-enter hero-enter-3">Tú mantienes el control de la compra. Nosotros hacemos que cada paso sea claro, verificable y fácil de completar.</p></div>
        </div>
      </section>
      <section className="process-section standalone-process">
        <div className="process-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="journey-line" aria-hidden="true" />
          <div className="process-steps">
            {[
              ['01', 'Explora', 'Entra al catálogo, usa los filtros y abre la página del producto para revisar precio, stock e imágenes.', 'spark'],
              ['02', 'Confirma', 'Elige comprar con tarjeta o solicitar apoyo por WhatsApp. Siempre verás el importe antes de continuar.', 'card'],
              ['03', 'Paga seguro', 'Stripe procesa los datos de tarjeta en su propio entorno protegido; Punto Clave no almacena esa información.', 'lock'],
              ['04', 'Coordinamos', 'Con la compra confirmada, se validan los datos del pedido y se coordina la entrega contigo.', 'truck'],
            ].map(([number, title, text, icon], index) => <article key={number} className="process-step" data-reveal style={{ transitionDelay: `${index * 90}ms` }}><span>{number}</span><ShowroomIcon name={icon} className="h-8 w-8" /><h2>{title}</h2><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="decision-section">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_.8fr] lg:px-12 lg:py-32">
          <div data-reveal><span className="section-index">DOS CAMINOS, UNA SOLA COMPRA</span><h2>Compra directa o<br /><em>asesoría personal.</em></h2><p>Si ya elegiste, entra al catálogo y compra desde la página del producto. Si todavía comparas opciones, un asesor puede orientarte por WhatsApp.</p></div>
          <div className="decision-actions" data-reveal><Link href="/productos" className="decision-card"><ShowroomIcon name="cube" /><strong>Ya sé qué quiero</strong><span>Ir al catálogo completo</span></Link><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="decision-card"><ShowroomIcon name="whatsapp" /><strong>Necesito ayuda</strong><span>Hablar con un asesor</span></a></div>
        </div>
      </section>
    </PublicPageShell>
  );
}
