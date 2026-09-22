'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header class="site-header">
      <div class="nav-wrap">
        <Link href="/" class="brand">
          <img src="/assets/logo-full.svg" alt="NF Collections" />
        </Link>
        <button
          class="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  class={isActive ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/admin"
              class={pathname.startsWith('/admin') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              CMS Admin <span class="admin-badge-nav">CMS</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
