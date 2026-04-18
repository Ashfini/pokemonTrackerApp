import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { View } from '../types';

interface Props {
  setView: (v: View) => void;
}

export default function SignInView({ setView }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) setError(error.message);
    else setView('list');
  }

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Don't have an account?{' '}
        <button
          onClick={() => setView('signup')}
          style={{ padding: 0, border: 'none', color: 'var(--accent)', background: 'none', cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
