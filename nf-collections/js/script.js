// NF Collections — site scripts

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
      const isOpen = links.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('is-open'))
    );
  }

  /* Category filters — used on shop.html and gallery.html */
  const filterBtns = document.querySelectorAll('.filters button');
  const filterItems = document.querySelectorAll('[data-category]');
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const target = btn.dataset.filter;
        filterItems.forEach(item => {
          const show = target === 'all' || item.dataset.category === target;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Contact form — frontend only, per project brief */
  const form = document.getElementById('contact-form');
  if (form) {
    const success = document.querySelector('.form-success');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      success.textContent = 'Thank you — your message has been received. We reply within 1–2 business days.';
      success.classList.add('is-visible');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
