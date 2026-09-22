import { getGallery } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const revalidate = 0;

export default function GalleryPage() {
  const gallery = getGallery();
  return <GalleryClient initialGallery={gallery} />;
}
