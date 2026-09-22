'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardClient({ initialContent, initialProducts, initialGallery, initialMessages }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');

  const [content, setContent] = useState(initialContent);
  const [savingContent, setSavingContent] = useState(false);
  const [contentMsg, setContentMsg] = useState('');

  const [products, setProducts] = useState(initialProducts);
  const [newProd, setNewProd] = useState({ name: '', category: 'clothing', price: '', subtext: '', image: '' });
  const [addingProd, setAddingProd] = useState(false);

  const [gallery, setGallery] = useState(initialGallery);
  const [newGal, setNewGal] = useState({ category: 'clothing', caption: '', image: '', size: '' });
  const [addingGal, setAddingGal] = useState(false);

  const [messages, setMessages] = useState(initialMessages);
  const [msgFilter, setMsgFilter] = useState('all');

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    setContentMsg('');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (res.ok) {
        setContentMsg('Site content updated successfully in XAMPP MySQL database!');
      } else {
        setContentMsg('Failed to update content: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setContentMsg('Error updating content.');
    } finally {
      setSavingContent(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddingProd(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });
      const data = await res.json();
      if (res.ok && data.product) {
        setProducts([data.product, ...products]);
        setNewProd({ name: '', category: 'clothing', price: '', subtext: '', image: '' });
      }
    } catch (err) {
      alert('Failed to add product');
    } finally {
      setAddingProd(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    setAddingGal(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGal)
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setGallery([data.item, ...gallery]);
        setNewGal({ category: 'clothing', caption: '', image: '', size: '' });
      }
    } catch (err) {
      alert('Failed to add gallery item');
    } finally {
      setAddingGal(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!confirm('Are you sure you want to delete this lookbook image?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery(gallery.filter(g => g.id !== id));
      }
    } catch (err) {
      alert('Failed to delete gallery item');
    }
  };

  const handleUpdateMsgStatus = async (id, status) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
      }
    } catch (err) {
      alert('Failed to update message status');
    }
  };

  const handleDeleteMsg = async (id) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      }
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const filteredMessages = msgFilter === 'all'
    ? messages
    : messages.filter(m => m.status === msgFilter);

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <div className="admin-header">
        <div>
          <span className="eyebrow">NF Collections CMS &amp; Moderation (XAMPP MySQL)</span>
          <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Control Center</h1>
        </div>
        <div>
          <button onClick={handleLogout} className="btn btn-sm btn-danger">Sign Out</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Site Copy &amp; Content Editor
        </button>
        <button
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products ({products.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Lookbook Gallery ({gallery.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages &amp; Inquiries {unreadCount > 0 && <span className="badge-unread" style={{ marginLeft: '6px' }}>{unreadCount} New</span>}
        </button>
      </div>

      {/* TAB 1: SITE CONTENT EDITOR */}
      {activeTab === 'content' && (
        <div className="admin-card">
          <h2>Edit Homepage &amp; Brand Content</h2>
          <p>Changes made here immediately update your XAMPP MySQL database and frontend pages.</p>

          <form onSubmit={handleContentSubmit}>
            <h3 style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.4rem', marginTop: '1.5rem' }}>Hero Section</h3>
            <div className="field">
              <label>Hero Eyebrow Banner</label>
              <input
                type="text"
                value={content.heroEyebrow || ''}
                onChange={(e) => setContent({ ...content, heroEyebrow: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Hero Title (Headline)</label>
              <textarea
                rows={2}
                value={content.heroTitle || ''}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Hero Lede (Subheadline Description)</label>
              <textarea
                rows={3}
                value={content.heroLede || ''}
                onChange={(e) => setContent({ ...content, heroLede: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Hero Media Tag</label>
              <input
                type="text"
                value={content.heroTag || ''}
                onChange={(e) => setContent({ ...content, heroTag: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Hero Display Image URL</label>
              <input
                type="text"
                value={content.heroImage || ''}
                onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
              />
            </div>

            <h3 style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.4rem', marginTop: '2rem' }}>Founder Statement &amp; Bio</h3>
            <div className="field">
              <label>Founder Quote Statement</label>
              <input
                type="text"
                value={content.founderQuote || ''}
                onChange={(e) => setContent({ ...content, founderQuote: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Founder Bio Story (Paragraph 1)</label>
              <textarea
                rows={3}
                value={content.founderBio || ''}
                onChange={(e) => setContent({ ...content, founderBio: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Founder Secondary Story (Paragraph 2)</label>
              <textarea
                rows={3}
                value={content.founderSubBio || ''}
                onChange={(e) => setContent({ ...content, founderSubBio: e.target.value })}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="field">
                <label>Stat 1: Lines</label>
                <input
                  type="text"
                  value={content.statProductLines || ''}
                  onChange={(e) => setContent({ ...content, statProductLines: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Stat 2: Quality %</label>
                <input
                  type="text"
                  value={content.statQualityChecked || ''}
                  onChange={(e) => setContent({ ...content, statQualityChecked: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Stat 3: Cities</label>
                <input
                  type="text"
                  value={content.statCitiesServed || ''}
                  onChange={(e) => setContent({ ...content, statCitiesServed: e.target.value })}
                />
              </div>
            </div>

            <h3 style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.4rem', marginTop: '2rem' }}>Studio &amp; Contact Details</h3>
            <div className="field">
              <label>Studio Address</label>
              <input
                type="text"
                value={content.studioAddress || ''}
                onChange={(e) => setContent({ ...content, studioAddress: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Studio Contact Email</label>
              <input
                type="email"
                value={content.studioEmail || ''}
                onChange={(e) => setContent({ ...content, studioEmail: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Phone &amp; WhatsApp</label>
              <input
                type="text"
                value={content.studioPhone || ''}
                onChange={(e) => setContent({ ...content, studioPhone: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Studio Hours</label>
              <input
                type="text"
                value={content.studioHours || ''}
                onChange={(e) => setContent({ ...content, studioHours: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-solid" style={{ marginTop: '1rem' }} disabled={savingContent}>
              {savingContent ? 'Saving to Database...' : 'Save Site Content'}
            </button>
            {contentMsg && (
              <p style={{ marginTop: '1rem', color: 'var(--wine)', fontWeight: '600' }}>
                {contentMsg}
              </p>
            )}
          </form>
        </div>
      )}

      {/* TAB 2: PRODUCTS CMS */}
      {activeTab === 'products' && (
        <div>
          <div className="admin-card">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="field">
                <label>Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Silk Kimono"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Category</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                >
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="bags">Bags</option>
                  <option value="jewelry">Jewelry</option>
                </select>
              </div>
              <div className="field">
                <label>Price in Naira (₦)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 45000"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Subtext / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Clothing · Made-to-order"
                  value={newProd.subtext}
                  onChange={(e) => setNewProd({ ...newProd, subtext: e.target.value })}
                />
              </div>
              <div className="field" style={{ gridColumn: 'span 2' }}>
                <label>Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn btn-solid" disabled={addingProd}>
                  {addingProd ? 'Adding Product...' : '+ Add Product to Catalog'}
                </button>
              </div>
            </form>
          </div>

          <h2>Current Catalog Items ({products.length})</h2>
          <div className="grid-4" style={{ marginTop: '1rem' }}>
            {products.map((prod) => (
              <div key={prod.id} className="admin-card" style={{ padding: '1rem' }}>
                <div className="card-media" style={{ height: '160px', marginBottom: '0.6rem' }}>
                  <img src={prod.image} alt={prod.name} />
                </div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.2rem' }}>{prod.name}</h3>
                <p style={{ fontSize: '0.85rem', margin: '0 0 0.4rem' }}>{prod.subtext}</p>
                <p style={{ fontWeight: 'bold', color: 'var(--wine)', margin: '0 0 0.8rem' }}>
                  {prod.formattedPrice}
                </p>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  className="btn btn-sm btn-danger"
                  style={{ width: '100%' }}
                >
                  Delete Item
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GALLERY CMS */}
      {activeTab === 'gallery' && (
        <div>
          <div className="admin-card">
            <h2>Add Lookbook Item</h2>
            <form onSubmit={handleAddGallery} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="field">
                <label>Category Tag</label>
                <select
                  value={newGal.category}
                  onChange={(e) => setNewGal({ ...newGal, category: e.target.value })}
                >
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="bags">Bags</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div className="field">
                <label>Grid Display Layout Size</label>
                <select
                  value={newGal.size}
                  onChange={(e) => setNewGal({ ...newGal, size: e.target.value })}
                >
                  <option value="">Normal (1x1)</option>
                  <option value="gspan-2">Wide Span (2x1)</option>
                  <option value="grow-2">Tall Span (1x2)</option>
                  <option value="gspan-2 grow-2">Featured Large (2x2)</option>
                </select>
              </div>
              <div className="field" style={{ gridColumn: 'span 2' }}>
                <label>Image Caption</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clothing — Zainab Two-Piece Set"
                  value={newGal.caption}
                  onChange={(e) => setNewGal({ ...newGal, caption: e.target.value })}
                />
              </div>
              <div className="field" style={{ gridColumn: 'span 2' }}>
                <label>Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newGal.image}
                  onChange={(e) => setNewGal({ ...newGal, image: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn btn-solid" disabled={addingGal}>
                  {addingGal ? 'Adding Image...' : '+ Add Lookbook Item'}
                </button>
              </div>
            </form>
          </div>

          <h2>Lookbook Gallery ({gallery.length})</h2>
          <div className="admin-grid" style={{ marginTop: '1rem' }}>
            {gallery.map((item) => (
              <div key={item.id} className="admin-card" style={{ padding: '1rem' }}>
                <div style={{ height: '160px', overflow: 'hidden', marginBottom: '0.6rem', background: 'var(--stone)' }}>
                  <img src={item.image} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="eyebrow" style={{ textTransform: 'capitalize' }}>{item.category}</span>
                <p style={{ fontSize: '0.9rem', fontWeight: '500', margin: '0 0 0.8rem' }}>{item.caption}</p>
                <button
                  onClick={() => handleDeleteGallery(item.id)}
                  className="btn btn-sm btn-danger"
                  style={{ width: '100%' }}
                >
                  Delete Image
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MESSAGE MODERATION */}
      {activeTab === 'messages' && (
        <div>
          <div className="filters" style={{ marginBottom: '1.5rem' }}>
            <button
              className={msgFilter === 'all' ? 'is-active' : ''}
              onClick={() => setMsgFilter('all')}
            >
              All Inquiries ({messages.length})
            </button>
            <button
              className={msgFilter === 'unread' ? 'is-active' : ''}
              onClick={() => setMsgFilter('unread')}
            >
              Unread / New ({messages.filter(m => m.status === 'unread').length})
            </button>
            <button
              className={msgFilter === 'read' ? 'is-active' : ''}
              onClick={() => setMsgFilter('read')}
            >
              Read
            </button>
            <button
              className={msgFilter === 'replied' ? 'is-active' : ''}
              onClick={() => setMsgFilter('replied')}
            >
              Replied
            </button>
            <button
              className={msgFilter === 'archived' ? 'is-active' : ''}
              onClick={() => setMsgFilter('archived')}
            >
              Archived
            </button>
          </div>

          {filteredMessages.length === 0 ? (
            <div className="admin-card">
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>No messages found in this moderation filter.</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className={`msg-item ${msg.status === 'unread' ? 'unread' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div>
                    <strong style={{ fontSize: '1.1rem' }}>{msg.name}</strong> &lt;{msg.email}&gt;
                    {msg.phone && <span style={{ marginLeft: '0.8rem', color: 'var(--ink-soft)' }}>📞 {msg.phone}</span>}
                  </div>
                  <div>
                    <span className={`badge-${msg.status}`}>
                      {msg.status.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '0.8rem' }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <p style={{ background: 'var(--ivory)', padding: '0.8rem', borderLeft: '2px solid var(--gold)', margin: '0.6rem 0 1rem' }}>
                  <strong>Topic: {msg.topic}</strong><br />
                  "{msg.message}"
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {msg.status !== 'read' && (
                    <button onClick={() => handleUpdateMsgStatus(msg.id, 'read')} className="btn btn-sm">Mark Read</button>
                  )}
                  {msg.status !== 'replied' && (
                    <button onClick={() => handleUpdateMsgStatus(msg.id, 'replied')} className="btn btn-sm btn-solid">Mark Replied</button>
                  )}
                  {msg.status !== 'archived' && (
                    <button onClick={() => handleUpdateMsgStatus(msg.id, 'archived')} className="btn btn-sm">Archive</button>
                  )}
                  {msg.status !== 'unread' && (
                    <button onClick={() => handleUpdateMsgStatus(msg.id, 'unread')} className="btn btn-sm">Mark Unread</button>
                  )}
                  <button onClick={() => handleDeleteMsg(msg.id)} className="btn btn-sm btn-danger" style={{ marginLeft: 'auto' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
