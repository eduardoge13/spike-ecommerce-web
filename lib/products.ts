import { Product } from '@/types/product';
import productsData from '@/data/products.json';

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((product) => product.id === id) as Product | undefined;
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.filter((product) => product.category === category) as Product[];
}
