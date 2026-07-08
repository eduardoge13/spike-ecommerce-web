import { Product } from '@/types/product';

interface ProductFormFieldsProps {
  product?: Product;
}

function centsToPesosValue(cents?: number) {
  return cents ? (cents / 100).toString() : '';
}

export default function ProductFormFields({ product }: ProductFormFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Nombre del producto
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="slug" className="block text-sm font-semibold text-gray-700">
          URL del producto (slug)
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={product?.slug}
          placeholder="Se genera automáticamente si lo dejas vacío"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          Ejemplo: iphone-17-pro-max. Si se repite, el sistema agregará un sufijo.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
          Precio actual (MXN)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          step="0.01"
          required
          defaultValue={centsToPesosValue(product?.price)}
          placeholder="15999"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="originalPrice" className="block text-sm font-semibold text-gray-700">
          Precio anterior (opcional)
        </label>
        <input
          id="originalPrice"
          name="originalPrice"
          type="number"
          min="0"
          step="0.01"
          defaultValue={centsToPesosValue(product?.originalPrice)}
          placeholder="19999"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
          Categoría
        </label>
        <input
          id="category"
          name="category"
          type="text"
          defaultValue={product?.category}
          placeholder="iPhone, Audio, etc."
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">
          Stock disponible
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          defaultValue={product?.stock}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="badgeText" className="block text-sm font-semibold text-gray-700">
          Leyenda de la píldora (opcional)
        </label>
        <input
          id="badgeText"
          name="badgeText"
          type="text"
          defaultValue={product?.badgeText}
          placeholder='Ej. "Ahorra $2,000" o "Últimas piezas" — vacío = automático'
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-400">
          Si lo dejas vacío, se calcula automáticamente el ahorro cuando hay precio anterior.
        </p>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="whatsappMessage" className="block text-sm font-semibold text-gray-700">
          Mensaje de WhatsApp (opcional)
        </label>
        <input
          id="whatsappMessage"
          name="whatsappMessage"
          type="text"
          defaultValue={product?.whatsappMessage}
          placeholder="Hola! Me interesa este producto..."
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0D1F4E] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 sm:col-span-2">
        <input
          id="isNew"
          name="isNew"
          type="checkbox"
          defaultChecked={product?.isNew}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="isNew" className="text-sm font-medium text-gray-700">
          Marcar como producto nuevo
        </label>
      </div>
    </div>
  );
}
