'use client';

import { useState } from 'react';

interface StripeCheckoutButtonProps {
  productId: string;
  productName: string;
}

export default function StripeCheckoutButton({
  productId,
  productName,
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!response.ok || !payload?.url) {
        throw new Error(
          payload?.error ??
            'No pudimos iniciar el pago en este momento. Intenta de nuevo o compra por WhatsApp.',
        );
      }

      window.location.assign(payload.url);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos iniciar el pago en este momento. Intenta de nuevo más tarde.',
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        aria-label={`Pagar ${productName} con tarjeta mediante Stripe`}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0D1F4E] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#11265d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
            Redirigiendo al checkout...
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a5 5 0 00-10 0v2m-2 0h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
              />
            </svg>
            Pagar con tarjeta
          </>
        )}
      </button>

      {errorMessage && (
        <p role="status" className="text-xs font-medium text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
