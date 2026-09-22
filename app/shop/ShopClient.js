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
      <section class="page-intro">
        <div class="container">
          <span class="eyebrow">Shop the collection</span>
          <h1>Clothing, shoes, bags &amp; jewelry.</h1>
          <p>Filter by category below. Prices shown in Naira; made-to-order pieces are noted individually.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="filters">
            <button
              class={activeFilter === 'all' ? 'is-active' : ''}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button
              class={activeFilter === 'clothing' ? 'is-active' : ''}
              onClick={() => setActiveFilter('clothing')}
            >
              Clothing
            </button>
            <button
              class={activeFilter === 'shoes' ? 'is-active' : ''}
              onClick={() => setActiveFilter('shoes')}
            >
              Shoes
            </button>
            <button
              class={activeFilter === 'bags' ? 'is-active' : ''}
              onClick={() => setActiveFilter('bags')}
            >
              Bags
            </button>
            <button
              class={activeFilter === 'jewelry' ? 'is-active' : ''}
              onClick={() => setActiveFilter('jewelry')}
            >
              Jewelry
            </button>
          </div>

          <div class="grid-4">
            {filteredProducts.map((prod) => (
              <div key={prod.id} class="card">
                <div class="card-media">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <h3 class="card-title">{prod.name}</h3>
                <p class="card-meta">
                  <span>{prod.subtext}</span>
                  <span class="card-price">{prod.formattedPrice}</span>
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

      <section class="section section-stone">
        <div class="container two-col">
          <div>
            <h2>Don't see your size or style?</h2>
            <p>Most clothing and select bags are available made-to-order. Send your measurements and preferred fabric, and we'll get back to you with a quote and timeline.</p>
          </div>
          <div class="hero-actions">
            <Link href="/contact" class="btn btn-solid">Request a custom order</Link>
          </div>
        </div>
      </section>
    </>
  );
}
