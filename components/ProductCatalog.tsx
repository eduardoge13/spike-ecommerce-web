'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

export default function ProductCatalog({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((product) => product.category ?? 'Otros')))],
    [products],
  );
  const [activeCategory, setActiveCategory] = useState('Todos');
  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter((product) => product.category === activeCategory);
  const resultLabel = filteredProducts.length === 1
    ? 'Mostrando 1 producto'
    : `Mostrando ${filteredProducts.length} productos`;

  return (
    <>
      <div className="category-switcher" data-reveal role="group" aria-label="Filtrar productos por categoría">
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} aria-controls="catalog-results">
            {category}<span>{category === 'Todos' ? products.length : products.filter((product) => product.category === category).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{resultLabel} en {activeCategory}.</p>
      <div id="catalog-results" className="product-grid" key={activeCategory} aria-label={resultLabel}>
        {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
      </div>
    </>
  );
}
