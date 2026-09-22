import { getProducts } from '@/lib/db';
import ShopClient from './ShopClient';

export const revalidate = 0;

export default function ShopPage() {
  const products = getProducts();
  return <ShopClient initialProducts={products} />;
}
