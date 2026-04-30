import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import ProductForm from '../components/ProductForm';
import SummaryCards from '../components/SummaryCards';

interface Props {
  user: User | null;
}

export default function ProductListView({ user }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    // TODO: Replace 'products' with your actual table name, and replace
    // Product with your type. Order however makes sense for your data.
    //
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (user) {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query;

    if (error) setError(error.message);
    else setProducts(data ?? []);

    setLoading(false);
  }

  async function handleAdd(data: Partial<Product>) {
    if (!user) return;

    // TODO: Insert into your table. Remember to include user_id so your
    // RLS policy can check ownership on later updates/deletes.
    //
    const { error } = await supabase
      .from('products')
      .insert([{ ...data, user_id: user.id }]);

    if (error) {
      alert(error.message);
      return;
    }

    setShowForm(false);
    fetchProducts();

    console.log('Add:', data);
  }

  async function handleEdit(data: Partial<Product>) {
    if (!editing) return;

    // TODO: Update the row by id.
    //
    const { error } = await supabase
      .from('products')
      .update(data)
      .eq('id', editing.id)
      .eq('user_id', user?.id);

    if (error) {
      alert(error.message);
      return;
    }

    setEditing(null);
    fetchProducts();

    console.log('Edit:', editing.id, data);
  }

  async function handleDelete() {
    if (!deleting) return;

    // TODO: Delete the row by id.
    //
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', deleting.id)
      .eq('user_id', user?.id);

    if (error) {
      alert(error.message);
      return;
    }

    setDeleting(null);
    fetchProducts();

    console.log('Delete:', deleting.id);
  }

  const summary = {
    totalCount: products.length,
    averageRating:
      products.length > 0
        ? products.reduce((sum, p) => sum + Number(p.rating), 0) /
          products.length
        : 0,
    totalValue: products.reduce((sum, p) => sum + Number(p.price), 0),
  };

  if (loading) return <p>Loading Pokémon...</p>;
  if (error) return <p className="error">Failed to load: {error}</p>;

  if (showForm || editing) {
    return (
      <ProductForm
        product={editing}
        onSave={editing ? handleEdit : handleAdd}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ flex: 1 }}>{user ? 'My Pokémon' : 'Pokémon'}</h1>

        {/* Only signed-in users see the Add button. RLS enforces the real rule
            at the database level — this UI check just hides the affordance. */}
        {user && (
          <button className="primary" onClick={() => setShowForm(true)}>
            + Add Pokémon
          </button>
        )}
      </div>

      <SummaryCards summary={summary} />

      {products.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>
          No Pokémon yet.{' '}
          {user
            ? 'Click “Add Pokémon” to create one.'
            : 'Sign in to add the first one.'}
        </p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="card">
            {/* TODO: Render all of your fields here.
                Example:
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p>Platform: {p.platform} · Rating: {p.rating}/10</p>
            */}

            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>
              <strong>Type:</strong> {p.category}
            </p>
            <p>
              <strong>Value:</strong> ${Number(p.price).toFixed(2)}
            </p>
            <p>
              <strong>Power Rating:</strong> {p.rating}/10
            </p>

            {user && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => setEditing(p)}>Edit</button>
                <button className="danger" onClick={() => setDeleting(p)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {deleting && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Delete Pokémon?</h2>

            <p>
              Are you sure you want to delete <b>{deleting.title}</b>? This
              cannot be undone.
            </p>

            <div className="modal-actions">
              <button onClick={() => setDeleting(null)}>Cancel</button>
              <button className="danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}