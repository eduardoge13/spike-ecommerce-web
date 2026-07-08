import { Product } from '@/types/product';
import Image from 'next/image';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { formatMXNFromCents, getSavingsLabel } from '@/lib/pricing';

interface ProductCardProps {
  product: Product;
}

function getWhatsAppLink(product: Product) {
  const message = product.whatsappMessage || `Hola! Me interesa el ${product.name}. Esta disponible?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceInMXN = formatMXNFromCents(product.price);
  const originalPriceInMXN = product.originalPrice
    ? formatMXNFromCents(product.originalPrice)
    : null;
  const savingsLabel = product.badgeText ?? getSavingsLabel(product.price, product.originalPrice);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div
      id={`producto-${product.id}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        {savingsLabel && (
          <div className="absolute right-2 top-2 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
            {savingsLabel}
          </div>
        )}
        {isOutOfStock ? (
          <div className="absolute bottom-2 left-2 rounded-full bg-gray-700 px-2.5 py-1 text-[10px] font-bold text-white">
            Agotado
          </div>
        ) : (
          product.stock !== undefined &&
          product.stock < 5 && (
            <div className="absolute bottom-2 left-2 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold text-white">
              Quedan {product.stock}
            </div>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-[#0D1F4E]">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 flex-1 text-xs leading-relaxed text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="mb-3">
            {originalPriceInMXN && (
              <p className="text-xs text-gray-400 line-through">${originalPriceInMXN} MXN</p>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-red-600">${priceInMXN}</span>
              <span className="text-xs font-semibold text-red-500">MXN</span>
            </div>
          </div>

          <div className="space-y-2">
            {isOutOfStock ? (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 px-5 py-3 text-sm font-bold text-gray-500"
              >
                Agotado
              </button>
            ) : (
              <StripeCheckoutButton productId={product.id} productName={product.name} />
            )}
            <a
              href={getWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-500 px-4 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
