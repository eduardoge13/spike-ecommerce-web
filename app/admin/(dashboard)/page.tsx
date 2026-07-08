import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { formatMXNFromCents } from '@/lib/pricing';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import { deleteProductAction } from './products/product-actions';

export const dynamic = 'force-dynamic';

interface AdminHomeProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminProductsPage({ searchParams }: AdminHomeProps) {
  const { error } = await searchParams;
  const products = getAllProducts();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900">Productos ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-[#E04040] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#c43333]"
        >
          + Nuevo producto
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Píldora</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-50">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">{product.name}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  <Link href={`/producto/${product.slug}`} className="hover:text-[#0D1F4E]">
                    /producto/{product.slug}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  ${formatMXNFromCents(product.price)}
                  {product.originalPrice && (
                    <span className="ml-1 text-xs text-gray-400 line-through">
                      ${formatMXNFromCents(product.originalPrice)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500">{product.badgeText ?? '—'}</td>
                <td className="px-4 py-3 text-gray-700">{product.stock ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-[#0D1F4E] hover:text-[#0D1F4E]"
                    >
                      Editar
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Eliminar
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Todavía no hay productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
