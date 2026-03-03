import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export default function Home() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header / Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                Spike Store
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">Calidad Premium</p>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-8">
                <a href="#productos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Productos
                </a>
                <a href="#categorias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Categorías
                </a>
                <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Contacto
                </a>
              </nav>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg">
                Carrito (0)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🔥 Nueva Colección Disponible
            </div>
            <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              Encuentra el producto
              <br />
              <span className="text-yellow-300">perfecto para ti</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Explora nuestra selección exclusiva de productos de alta calidad.
              Envío gratis en compras mayores a $1,000 MXN.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#productos"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-xl inline-block"
              >
                Ver Productos
              </a>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
                Más Información
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Calidad Garantizada</h3>
                <p className="text-sm text-gray-600">Productos verificados</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Envío Rápido</h3>
                <p className="text-sm text-gray-600">24-48 horas hábiles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Pago Seguro</h3>
                <p className="text-sm text-gray-600">100% protegido</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra colección exclusiva de productos seleccionados especialmente para ti
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg font-semibold">
                Pronto agregaremos más productos
              </p>
              <p className="text-gray-400 text-sm mt-2">
                ¡Mantente atento!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            ¿Listo para comprar?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos y encuentra lo que buscas
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-xl">
            Explorar Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-black text-xl mb-4">Spike Store</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tu destino para productos de calidad premium.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Productos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categorías</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>contacto@spikestore.com</li>
                <li>+52 55 1234 5678</li>
                <li>Ciudad de México</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Spike E-commerce. Todos los derechos reservados.</p>
            <p className="text-gray-500 mt-2">Diseñado con ❤️ para ofrecer la mejor experiencia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
