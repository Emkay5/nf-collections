import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import { getSiteContent, getProducts, getGallery, getMessages } from '@/lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export const revalidate = 0;

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();
  const products = await getProducts();
  const gallery = await getGallery();
  const messages = await getMessages();

  return (
    <AdminDashboardClient
      initialContent={content}
      initialProducts={products}
      initialGallery={gallery}
      initialMessages={messages}
    />
  );
}
