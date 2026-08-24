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

  return (
    <>
      <div className="category-switcher" data-reveal>
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category}>
            {category}<span>{category === 'Todos' ? products.length : products.filter((product) => product.category === category).length}</span>
          </button>
        ))}
      </div>
      <div className="product-grid">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
    </>
  );
}
