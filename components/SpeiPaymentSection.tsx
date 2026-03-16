'use client';

import { useState } from 'react';
import { SPEI_CLABE } from '@/lib/constants';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function SpeiPaymentSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SPEI_CLABE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback for browsers without clipboard API
    }
  };

  return (
    <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-900/30 via-[#08132E] to-cyan-900/20 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* SPEI badge */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15">
          <svg className="h-7 w-7 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Pago por Transferencia Bancaria</h2>
          <p className="mt-0.5 text-sm text-emerald-300 font-medium">SPEI — Inmediato y seguro</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
        Realiza tu pago por transferencia SPEI y envía tu comprobante por WhatsApp.
        Procesamos tu pedido en cuanto recibamos la confirmación.
      </p>

      {/* CLABE display */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0D1F4E]/70 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Número de CLABE interbancaria</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-2xl font-bold tracking-wider text-white sm:text-3xl">
            {SPEI_CLABE}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
              copied
                ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-300'
                : 'border-white/20 bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                ¡Copiado!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar CLABE
              </>
            )}
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ['01', 'Copia la CLABE', 'Usa el botón de arriba para copiarla al portapapeles.'],
          ['02', 'Realiza la transferencia', 'Desde tu banco en línea o app móvil vía SPEI.'],
          ['03', 'Envía tu comprobante', 'Mándanos el comprobante por WhatsApp para procesar tu pedido.'],
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
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={waLink('Hola! Ya realicé mi pago por transferencia SPEI. Adjunto el comprobante.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1fb558]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar comprobante por WhatsApp
        </a>
        <p className="text-xs text-slate-400">
          También puedes preguntar tu número de cuenta por WhatsApp antes de transferir.
        </p>
      </div>
    </div>
  );
}
