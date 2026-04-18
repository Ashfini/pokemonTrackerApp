import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: Props) {
  // TODO: Add one useState per field in your Product type. When editing, seed
  // each state value from `product` so the form is pre-populated.
  //
  // Example:
  // const [title, setTitle] = useState(product?.title ?? '');
  // const [rating, setRating] = useState(product?.rating ?? 0);

  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // TODO: Validate required fields, then call onSave with them.
    //
    // if (!title.trim()) {
    //   setError('Title is required');
    //   return;
    // }
    // onSave({ title, rating, ... });

    onSave({});
  }

  return (
    <div>
      <h2>{product ? 'Edit Item' : 'Add New Item'}</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
        {/* TODO: Add one labeled <input> per field.

            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Rating
              <input
                type="number"
                min={0}
                max={10}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </label>
        */}

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="primary" type="submit">
            {product ? 'Save Changes' : 'Add Item'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
