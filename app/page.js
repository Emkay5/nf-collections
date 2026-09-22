import Link from 'next/link';
import { getSiteContent, getProducts } from '@/lib/db';

export const revalidate = 0;

export default async function HomePage() {
  const content = await getSiteContent();
  const products = await getProducts();

  const categories = [
    {
      title: 'Clothing',
      meta: 'Ready-to-wear & made-to-order',
      image: products.find(p => p.category === 'clothing')?.image || 'https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=700&q=80'
    },
    {
      title: 'Shoes',
      meta: 'Heels, flats & sandals',
      image: products.find(p => p.category === 'shoes')?.image || 'https://images.unsplash.com/photo-1525774279600-f3422303f134?auto=format&fit=crop&w=700&q=80'
    },
    {
      title: 'Bags',
      meta: 'Totes, clutches & crossbody',
      image: products.find(p => p.category === 'bags')?.image || 'https://images.unsplash.com/photo-1754573433744-bf2b79d0eaf4?auto=format&fit=crop&w=700&q=80'
    },
    {
      title: 'Jewelry',
      meta: 'Necklaces, earrings & rings',
      image: products.find(p => p.category === 'jewelry')?.image || 'https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=700&q=80'
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">{content.heroEyebrow}</span>
          <h1 style={{ whiteSpace: 'pre-line' }}>{content.heroTitle}</h1>
          <p class="lede">{content.heroLede}</p>
          <div class="hero-actions">
            <Link href="/shop" class="btn btn-solid">Shop the collection</Link>
            <Link href="/about" class="btn">Our story</Link>
          </div>
        </div>
        <div class="hero-media">
          <img src={content.heroImage} alt="NF Collections boutique display" />
          <span class="tag">{content.heroTag}</span>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section class="section">
        <div class="container">
          <div class="section-head">
            <h2>Shop by category</h2>
            <p>Four lines, one standard: every piece is chosen or made to be worn often, not just once.</p>
          </div>
          <div class="grid-4">
            {categories.map((cat, idx) => (
              <Link key={idx} href="/shop" class="card">
                <div class="card-media">
                  <img src={cat.image} alt={cat.title} />
                </div>
                <h3 class="card-title">{cat.title}</h3>
                <p class="card-meta">{cat.meta}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER STATEMENT */}
      <section class="section section-stone">
        <div class="container two-col">
          <div>
            <span class="eyebrow">From the founder</span>
            <p class="statement">"{content.founderQuote}"</p>
            <p style={{ marginTop: '1.5rem' }}>— Nana Firdausi Asabi, Founder</p>
          </div>
          <div>
            <p>{content.founderBio}</p>
            <div class="stat-row">
              <div class="stat"><b>{content.statProductLines}</b><span>Product lines</span></div>
              <div class="stat"><b>{content.statQualityChecked}</b><span>Quality-checked pieces</span></div>
              <div class="stat"><b>{content.statCitiesServed}</b><span>Cities served</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section class="section section-dark">
        <div class="container two-col">
          <div>
            <h2>Visit the current collection.</h2>
            <p>Browse pieces by category, or get in touch for a custom order and personal styling.</p>
          </div>
          <div class="hero-actions">
            <Link href="/shop" class="btn btn-light">Browse the shop</Link>
            <Link href="/contact" class="btn-solid btn">Book a consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
