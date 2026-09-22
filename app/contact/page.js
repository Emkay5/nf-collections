import { getSiteContent } from '@/lib/db';
import ContactClient from './ContactClient';

export const revalidate = 0;

export default function ContactPage() {
  const content = getSiteContent();
  return <ContactClient studioInfo={content} />;
}
