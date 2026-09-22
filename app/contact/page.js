import { getSiteContent } from '@/lib/db';
import ContactClient from './ContactClient';

export const revalidate = 0;

export default async function ContactPage() {
  const content = await getSiteContent();
  return <ContactClient studioInfo={content} />;
}
