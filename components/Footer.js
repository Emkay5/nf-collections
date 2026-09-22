'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-mark.svg" alt="NF Collections mark" style={{ height: '44px' }} />
            <p>Fashion built with intention — clothing, shoes, bags and jewelry by Nana Firdausi Asabi.</p>
            <div className="social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
              <a href="https://wa.me/2340000000000" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">Clothing</Link></li>
              <li><Link href="/shop">Shoes</Link></li>
              <li><Link href="/shop">Bags</Link></li>
              <li><Link href="/shop">Jewelry</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/admin">Admin Panel</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>hello@nfcollections.com</li>
              <li>+234 000 000 0000</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {currentYear} NF Collections. All rights reserved.</span>
          <span>Built by Nana Firdausi Asabi</span>
        </div>
      </div>
    </footer>
  );
}
