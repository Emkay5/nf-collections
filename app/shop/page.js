import { getProducts } from '@/lib/db';
import ShopClient from './ShopClient';

export const revalidate = 0;

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient initialProducts={products} />;
}
