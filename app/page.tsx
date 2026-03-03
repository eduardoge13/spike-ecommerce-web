import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Spike E-commerce</h1>
          <p className="text-gray-600 mt-1">Productos de calidad para ti</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nuestros Productos
          </h2>
          <p className="text-gray-600">
            Explora nuestra colección de productos
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay productos disponibles en este momento.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Los productos se agregarán pronto.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2026 Spike E-commerce. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}