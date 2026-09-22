import { getGallery } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const revalidate = 0;

export default async function GalleryPage() {
  const gallery = await getGallery();
  return <GalleryClient initialGallery={gallery} />;
}
