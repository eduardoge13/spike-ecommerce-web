export default function StripePaymentSection() {
  return (
    <div className="rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-[#0D1F4E] via-[#0A1637] to-cyan-950/70 p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10">
          <svg
            className="h-7 w-7 text-cyan-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a5 5 0 00-10 0v2m-2 0h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Pago con tarjeta en checkout seguro
          </h2>
          <p className="mt-0.5 text-sm font-medium text-cyan-200">
            Stripe Checkout — rápido, claro y protegido
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
        Selecciona tu producto y paga con tarjeta de crédito o débito en una pasarela segura
        alojada por Stripe. El flujo captura tus datos de contacto y envío para confirmar
        tu pedido sin fricción.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ['Confirmación inmediata', 'Tu compra avanza en el momento y recibes pantalla de confirmación.'],
          ['Datos protegidos', 'El procesamiento del pago ocurre dentro del entorno seguro de Stripe.'],
          ['Dirección de envío', 'El checkout solicita tus datos para coordinar la entrega dentro de México.'],
          ['Respaldo humano', 'Si necesitas ayuda, seguimos disponibles por WhatsApp durante la compra.'],
        ].map(([title, text]) => (
          <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{text}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {['Stripe Checkout', 'Tarjeta de crédito', 'Tarjeta de débito', 'MXN'].map((item) => (
          <span
            key={item}
            className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-400">
        La compra con tarjeta se inicia desde cada producto para mostrarte el importe exacto
        y mantener el checkout limpio.
      </p>
    </div>
  );
}
