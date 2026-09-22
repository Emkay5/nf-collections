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

  const content = getSiteContent();
  const products = getProducts();
  const gallery = getGallery();
  const messages = getMessages();

  return (
    <AdminDashboardClient
      initialContent={content}
      initialProducts={products}
      initialGallery={gallery}
      initialMessages={messages}
    />
  );
}
