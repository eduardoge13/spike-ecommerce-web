import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId || !isStripeConfigured()) {
    return (
      <main className="min-h-screen bg-[#08132E] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Pago recibido
          </p>
          <h1 className="mt-4 text-3xl font-extrabold">Gracias por tu compra.</h1>
          <p className="mt-3 text-slate-300">
            No pudimos cargar el detalle del checkout, pero si el pago fue aprobado te
            contactaremos para confirmar tu pedido y envío.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0D1F4E]"
            >
              Volver a la tienda
            </Link>
            <a
              href={waLink('Hola! Ya realicé mi pago en Punto Clave MX y quiero confirmar mi pedido.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              Confirmar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    );
  }

  let session:
    | Awaited<ReturnType<ReturnType<typeof getStripe>['checkout']['sessions']['retrieve']>>
    | null = null;

  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
  } catch (error) {
    console.error('[stripe] success page failed to retrieve session', error);
  }

  const lineItems = session?.line_items?.data ?? [];
  const customerEmail = session?.customer_details?.email ?? 'No disponible';
  const customerName = session?.customer_details?.name ?? 'Cliente';
  const amountTotal = session?.amount_total ?? null;
  const paymentStatus = session?.payment_status ?? null;
  const isPaid = paymentStatus === 'paid';
  const whatsappMessage = session
    ? `Hola! Ya pagué mi pedido ${session.id} en Punto Clave MX. Quiero confirmar mi envío.`
    : 'Hola! Ya realicé mi pago en Punto Clave MX y quiero confirmar mi pedido.';

  return (
    <main className="min-h-screen bg-[#08132E] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#0D1F4E] via-[#0A1637] to-cyan-950/60 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {isPaid ? 'Pedido confirmado' : 'Pago en proceso'}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Gracias por tu compra, {customerName}.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            {isPaid
              ? 'Tu pago se registró correctamente en Punto Clave MX. Ya tenemos tus datos de contacto y usaremos la información de checkout para coordinar el envío.'
              : 'Tu pago aún está en proceso de confirmación. En cuanto se acredite, usaremos tus datos de checkout para coordinar el envío. Si tienes duda, escríbenos por WhatsApp.'}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Estatus
              </p>
              <p className="mt-2 text-lg font-bold capitalize text-white">
                {isPaid ? 'Pagado' : paymentStatus === 'unpaid' ? 'En proceso' : (paymentStatus ?? 'No disponible')}
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Total
              </p>
              <p className="mt-2 text-lg font-bold text-white">
                {amountTotal !== null ? currencyFormatter.format(amountTotal / 100) : 'No disponible'}
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Correo
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-white">{customerEmail}</p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold text-white">Resumen del pedido</h2>
            {lineItems.length > 0 ? (
              <div className="mt-5 space-y-3">
                {lineItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-[#0D1F4E]/70 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-white">{item.description}</h3>
                        <p className="mt-1 text-sm text-slate-300">
                          Cantidad: {item.quantity ?? 1}
                        </p>
                      </div>
                      <p className="text-base font-bold text-cyan-200">
                        {item.amount_total !== null
                          ? currencyFormatter.format(item.amount_total / 100)
                          : 'Monto no disponible'}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-slate-300">
                Tu pago ya fue registrado. Si necesitas el detalle del pedido, te lo
                confirmamos por WhatsApp.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold text-white">Siguiente paso</h2>
            <ol className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="rounded-2xl border border-white/10 bg-[#0D1F4E]/70 p-4">
                1. Revisamos tu pago y tu dirección de envío.
              </li>
              <li className="rounded-2xl border border-white/10 bg-[#0D1F4E]/70 p-4">
                2. Confirmamos disponibilidad final y preparación del pedido.
              </li>
              <li className="rounded-2xl border border-white/10 bg-[#0D1F4E]/70 p-4">
                3. Te compartimos seguimiento o atención directa por WhatsApp si lo necesitas.
              </li>
            </ol>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
              >
                Confirmar por WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
