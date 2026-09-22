'use client';

import { useState } from 'react';

export default function ContactClient({ studioInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('Thank you — your message has been received! Our team will review it shortly.');
        setFormData({ name: '', email: '', phone: '', topic: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An error occurred. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section class="page-intro">
        <div class="container">
          <span class="eyebrow">Get in touch</span>
          <h1>Let's talk about your order.</h1>
          <p>Questions about sizing, a custom piece, or wholesale? Send a message and we'll respond within 1–2 business days.</p>
        </div>
      </section>

      <section class="section">
        <div class="container contact-grid">
          <div>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div class="field">
                <label htmlFor="name">Full name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div class="field">
                <label htmlFor="email">Email address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div class="field">
                <label htmlFor="phone">Phone number (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div class="field">
                <label htmlFor="topic">What's this about? *</label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="order">An existing order</option>
                  <option value="custom">Custom / made-to-order piece</option>
                  <option value="wholesale">Wholesale &amp; partnerships</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div class="field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us what you're looking for..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" class="btn btn-solid" disabled={submitting}>
                {submitting ? 'Sending message...' : 'Send message'}
              </button>
              <p class="form-note">Your message is stored securely in our database for store moderation.</p>
              {successMsg && <div class="form-success">{successMsg}</div>}
              {errorMsg && (
                <div class="form-success" style={{ borderLeftColor: '#a82323', background: '#fce8e8' }}>
                  {errorMsg}
                </div>
              )}
            </form>
          </div>

          <div>
            <div class="info-block">
              <h3>Studio</h3>
              <p>{studioInfo.studioAddress}</p>
            </div>
            <div class="info-block">
              <h3>Email</h3>
              <p>{studioInfo.studioEmail}</p>
            </div>
            <div class="info-block">
              <h3>Phone &amp; WhatsApp</h3>
              <p>{studioInfo.studioPhone}</p>
            </div>
            <div class="info-block">
              <h3>Hours</h3>
              <p>{studioInfo.studioHours}</p>
            </div>
            <div class="info-block">
              <h3>Follow along</h3>
              <div class="social-row" style={{ borderTop: 'none' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>IG</a>
                <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>FB</a>
                <a href="https://wa.me/2340000000000" target="_blank" rel="noopener" aria-label="WhatsApp" style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}>WA</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
