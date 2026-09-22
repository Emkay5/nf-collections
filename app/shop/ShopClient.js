'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ShopClient({ initialProducts }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all'
    ? initialProducts
    : initialProducts.filter(p => p.category === activeFilter);

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <span className="eyebrow">Shop the collection</span>
          <h1>Clothing, shoes, bags &amp; jewelry.</h1>
          <p>Filter by category below. Prices shown in Naira; made-to-order pieces are noted individually.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters">
            <button
              className={activeFilter === 'all' ? 'is-active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              className={activeFilter === 'clothing' ? 'is-active' : ''}
              onClick={() => setActiveFilter('clothing')}
            >
              Clothing
            </button>
            <button
              className={activeFilter === 'shoes' ? 'is-active' : ''}
              onClick={() => setActiveFilter('shoes')}
            >
              Shoes
            </button>
            <button
              className={activeFilter === 'bags' ? 'is-active' : ''}
              onClick={() => setActiveFilter('bags')}
            >
              Bags
            </button>
            <button
              className={activeFilter === 'jewelry' ? 'is-active' : ''}
              onClick={() => setActiveFilter('jewelry')}
            >
              Jewelry
            </button>
          </div>

          <div className="grid-4">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="card">
                <div className="card-media">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <h3 className="card-title">{prod.name}</h3>
                <p className="card-meta">
                  <span>{prod.subtext}</span>
                  <span className="card-price">{prod.formattedPrice}</span>
                </p>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--ink-soft)' }}>
              No products found in this category.
            </p>
          )}
        </div>
      </section>

      <section className="section section-stone">
        <div className="container two-col">
          <div>
            <h2>Don't see your size or style?</h2>
            <p>Most clothing and select bags are available made-to-order. Send your measurements and preferred fabric, and we'll get back to you with a quote and timeline.</p>
          </div>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-solid">Request a custom order</Link>
          </div>
        </div>
      </section>
    </>
  );
}
