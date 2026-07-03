import StoreFront from '@/components/StoreFront';
import { getAllProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default function Home() {
  const products = getAllProducts();
  return <StoreFront products={products} />;
}
