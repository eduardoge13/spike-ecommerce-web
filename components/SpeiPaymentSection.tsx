import { WHATSAPP_NUMBER } from '@/lib/constants';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function SpeiPaymentSection() {
  return (
    <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-900/30 via-[#08132E] to-cyan-900/20 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15">
          <svg className="h-7 w-7 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Transferencia bancaria (SPEI)</h2>
          <p className="mt-0.5 text-sm text-emerald-300 font-medium">Coordinada directo por WhatsApp</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
        ¿Prefieres pagar por transferencia? Escríbenos por WhatsApp y te compartimos los datos
        bancarios al momento, confirmamos tu pedido y coordinamos el envío en cuanto recibamos tu comprobante.
      </p>

      {/* Steps */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ['01', 'Escríbenos', 'Cuéntanos qué producto quieres por WhatsApp.'],
          ['02', 'Recibe los datos', 'Te enviamos la cuenta bancaria vigente al instante.'],
          ['03', 'Confirma tu pago', 'Envía tu comprobante y procesamos tu pedido.'],
        ].map(([step, title, text]) => (
          <div key={step} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-200">
              {step}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <a
          href={waLink('Hola! Quiero pagar por transferencia SPEI. Me pueden compartir los datos bancarios?')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1fb558]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Solicitar datos por WhatsApp
        </a>
      </div>
    </div>
  );
}
