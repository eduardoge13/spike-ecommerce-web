import type { Metadata } from 'next';
import Link from 'next/link';
import SpeiPaymentSection from '@/components/SpeiPaymentSection';
import StripePaymentSection from '@/components/StripePaymentSection';
import PublicPageShell from '@/components/showroom/PublicPageShell';
import ShowroomIcon from '@/components/showroom/ShowroomIcon';

export const metadata: Metadata = {
  title: 'Pago seguro',
  description: 'Conoce las opciones de pago con Stripe y transferencia SPEI disponibles en Punto Clave MX.',
  alternates: { canonical: '/pago-seguro' },
  openGraph: { title: 'Pago seguro | Punto Clave MX', description: 'Stripe Checkout, SPEI y acompañamiento directo.', url: '/pago-seguro' },
};

export default function SecurePaymentPage() {
  return (
    <PublicPageShell>
      <section className="inner-page-hero inner-page-hero-payment">
        <div className="inner-page-orbit" />
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <span className="hero-kicker hero-enter hero-enter-1"><span /> Seguridad antes que fricción</span>
          <div className="inner-page-title-grid"><h1 className="hero-enter hero-enter-2">Tu pago,<br /><em>bajo tu control.</em></h1><p className="hero-enter hero-enter-3">Elige checkout digital o atención personalizada. En ambos casos confirmas el importe y el producto antes de pagar.</p></div>
        </div>
      </section>
      <section className="payment-section standalone-payment">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="payment-security-strip" data-reveal>{[['lock', 'Checkout alojado por Stripe'], ['shield', 'Importe visible antes de pagar'], ['whatsapp', 'Soporte humano disponible']].map(([icon, text]) => <span key={text}><ShowroomIcon name={icon} />{text}</span>)}</div>
          <div className="grid gap-5 lg:grid-cols-2" data-reveal><StripePaymentSection /><SpeiPaymentSection /></div>
          <div className="payment-faq" data-reveal>
            <div><span>01</span><h2>¿Dónde ingreso mi tarjeta?</h2><p>En Stripe Checkout, una página segura alojada por Stripe que se abre desde el producto elegido.</p></div>
            <div><span>02</span><h2>¿Puedo pagar por transferencia?</h2><p>Sí. Los datos vigentes se solicitan por WhatsApp para validar el producto y el importe antes del SPEI.</p></div>
            <div><span>03</span><h2>¿Cuándo se confirma?</h2><p>Después de recibir la confirmación del pago se continúa con la coordinación del pedido y la entrega.</p></div>
          </div>
        </div>
      </section>
      <section className="page-route-cta"><div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"><div><span className="section-index">LISTO PARA ELEGIR</span><h2>Empieza por el producto.</h2></div><Link href="/productos" className="button-primary button-primary-lg">Ver catálogo <ShowroomIcon name="arrow" /></Link></div></section>
    </PublicPageShell>
  );
}
