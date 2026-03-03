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
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">${priceInMXN} MXN</span>
            {product.stock !== undefined && (
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
