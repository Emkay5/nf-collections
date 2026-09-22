'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="admin-login-box">
        <span className="eyebrow">Store Management</span>
        <h2>Admin Authentication</h2>
        <p>Log in to access the NF Collections backend CMS, edit site copy, manage products, lookbook, and moderate incoming messages.</p>

        <form onSubmit={handleLogin} style={{ marginTop: '1.5rem' }}>
          <div className="field">
            <label htmlFor="password">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password (default: admin123)"
              required
            />
          </div>

          {error && (
            <p style={{ color: '#a82323', fontSize: '0.88rem', margin: '0.5rem 0 1rem' }}>
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-solid" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p className="form-note" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Default password is <code>admin123</code>. You can customize this in your environment config.
        </p>
      </div>
    </div>
  );
}
