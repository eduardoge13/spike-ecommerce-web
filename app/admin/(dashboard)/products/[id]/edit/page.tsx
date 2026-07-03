import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductFormFields from '@/components/admin/ProductFormFields';
import { getProductById } from '@/lib/products';
import { updateProductAction } from '../../product-actions';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProductPage({ params, searchParams }: EditProductPageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-gray-900">Editar producto</h1>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <form action={boundAction} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <ProductFormFields product={product} />

        <div>
          <p className="block text-sm font-semibold text-gray-700">Fotos actuales</p>
          <p className="mt-1 text-xs text-gray-400">
            Desmarca una foto para eliminarla al guardar. Debe quedar al menos una.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {(product.images ?? [product.image]).map((image) => (
              <label
                key={image}
                className="relative flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 p-2 text-xs"
              >
                <div className="relative h-20 w-full overflow-hidden rounded-md bg-gray-50">
                  <Image src={image} alt="" fill className="object-contain" />
                </div>
                <span className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    name="keepImages"
                    value={image}
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border-gray-300"
                  />
                  Conservar
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="newImages" className="block text-sm font-semibold text-gray-700">
            Agregar fotos nuevas (opcional)
          </label>
          <input
            id="newImages"
            name="newImages"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="mt-1 w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0D1F4E] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#11265d] sm:w-auto"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
