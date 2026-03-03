import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceInMXN = (product.price / 100).toFixed(2);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
          {product.stock !== undefined && product.stock < 10 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ¡Solo {product.stock} disponibles!
            </div>
          )}
          {product.category && (
            <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              {product.category}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Precio</p>
              <span className="text-2xl font-black text-gray-900">
                ${priceInMXN}
              </span>
              <span className="text-sm text-gray-600 ml-1">MXN</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-md hover:shadow-lg">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
