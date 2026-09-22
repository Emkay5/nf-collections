'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GalleryClient({ initialGallery }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? initialGallery
    : initialGallery.filter(g => g.category === activeFilter);

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">Lookbook</span>
          <h1>The collection, in detail.</h1>
          <p>A closer look at pieces across clothing, shoes, bags and jewelry — styled the way they're meant to be worn.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters">
            {['all', 'clothing', 'shoes', 'bags', 'jewelry', 'studio'].map((cat) => (
              <button
                key={cat}
                className={activeFilter === cat ? 'is-active' : ''}
                onClick={() => setActiveFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="gallery">
            {filteredItems.map((item) => (
              <figure key={item.id} className={item.size || ''}>
                <img src={item.image} alt={item.caption} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--ink-soft)' }}>
              No lookbook images found in this category.
            </p>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-col">
          <div>
            <h2>Want to see a piece in person?</h2>
            <p>Book a fitting at our Lagos studio, or ask us to send more photos of any item.</p>
          </div>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-light">Book a fitting</Link>
          </div>
        </div>
      </section>
    </>
  );
}
