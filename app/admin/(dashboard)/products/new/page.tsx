import ProductFormFields from '@/components/admin/ProductFormFields';
import { createProductAction } from '../product-actions';

interface NewProductPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewProductPage({ searchParams }: NewProductPageProps) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Nuevo producto</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <form action={createProductAction} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <ProductFormFields />

        <div>
          <label htmlFor="images" className="block text-sm font-semibold text-gray-700">
            Fotos del producto
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            required
            className="mt-1 w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700"
          />
          <p className="mt-1 text-xs text-gray-400">
            Puedes seleccionar varias fotos a la vez (JPG, PNG o WEBP, máx. 8MB cada una).
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#E04040] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#c43333] sm:w-auto"
        >
          Crear producto
        </button>
      </form>
    </div>
  );
}
