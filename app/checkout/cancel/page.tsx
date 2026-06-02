import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#08132E] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
          Checkout cancelado
        </p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          No se realizó ningún cobro.
        </h1>
        <p className="mt-3 text-slate-300">
          Puedes volver al catálogo y retomar tu compra cuando quieras. Si te detuviste
          porque quieres confirmar stock, precio o envío, te ayudamos por WhatsApp.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#productos"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0D1F4E]"
          >
            Volver al catálogo
          </Link>
          <a
            href={waLink('Hola! Quiero confirmar stock, precio o envío antes de pagar mi pedido en Punto Clave MX.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
