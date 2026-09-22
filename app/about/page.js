import Link from 'next/link';
import { getSiteContent } from '@/lib/db';

export const revalidate = 0;

export default function AboutPage() {
  const content = getSiteContent();

  return (
    <>
      <section class="page-intro">
        <div class="container">
          <span class="eyebrow">About NF Collections</span>
          <h1>Built one garment at a time.</h1>
          <p>What began as a one-woman tailoring practice is now a full fashion house — still run on the same principle: make it well, or don't make it.</p>
        </div>
      </section>

      <section class="section">
        <div class="container two-col">
          <div class="hero-media" style={{ minHeight: '420px' }}>
            <img
              src="https://images.unsplash.com/photo-1753164597544-a2736833357e?auto=format&fit=crop&w=1000&q=80"
              alt="Fashion design studio with sewing machines and half-finished garments"
            />
          </div>
          <div>
            <span class="eyebrow">Our story</span>
            <h2>From a single sewing table to four product lines.</h2>
            <p>{content.founderBio}</p>
            <p>Today NF Collections works with a small network of tailors, artisans and vetted suppliers to keep every category personal rather than mass-produced, while still making it possible to shop the collection online.</p>
          </div>
        </div>
      </section>

      <section class="section section-stone">
        <div class="container">
          <div class="section-head">
            <h2>What guides the work</h2>
            <p>Three commitments that shape every collection, whether it's a fabric choice or a customer email.</p>
          </div>
          <div class="value-list">
            <div>
              <h3>Fit first</h3>
              <p>Every clothing piece is graded and, where needed, adjusted — because a good design in the wrong fit isn't a good outfit.</p>
            </div>
            <div>
              <h3>Honest materials</h3>
              <p>Genuine leather for bags and shoes, quality-tested metals for jewelry. No pretending vinyl is leather.</p>
            </div>
            <div>
              <h3>Slow releases</h3>
              <p>Small, seasonal drops rather than constant restocks — so each collection stays intentional, not disposable.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container two-col">
          <div>
            <span class="eyebrow">The founder</span>
            <h2>Nana Firdausi Asabi</h2>
            <p>{content.founderSubBio}</p>
            <p>Outside the studio, Nana consults with young designers entering the industry and speaks on building a fashion brand from the ground up.</p>
          </div>
          <div>
            <p class="statement">"{content.founderQuote}"</p>
          </div>
        </div>
      </section>

      <section class="section section-dark">
        <div class="container two-col">
          <div>
            <h2>Come see the current collection.</h2>
            <p>New pieces are added by category throughout the season.</p>
          </div>
          <div class="hero-actions">
            <Link href="/shop" class="btn btn-light">Shop now</Link>
            <Link href="/contact" class="btn-solid btn">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
