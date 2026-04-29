import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSave, onCancel }: Props) {
  // Form state (pre-filled when editing)
  const [title, setTitle] = useState(product ? product.title : 'Pikachu');
  const [description, setDescription] = useState(
    product ? product.description : ''
  );
  const [category, setCategory] = useState(
    product ? product.category : 'Electric'
  );
  const [price, setPrice] = useState<number>(product ? product.price : 0);
  const [rating, setRating] = useState<number>(product ? product.rating : 0);

  const [error, setError] = useState<string | null>(null);
  const [autofillLoading, setAutofillLoading] = useState(false);

  async function handleAutofill() {
    if (!title.trim()) {
      setError('Enter a Pokémon name first');
      return;
    }

    setError(null);
    setAutofillLoading(true);

    try {
      const pokemonName = title.trim().toLowerCase();

      const [pokemonResponse, speciesResponse] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`),
      ]);

      if (!pokemonResponse.ok || !speciesResponse.ok) {
        setError('Pokémon not found. Check the spelling and try again.');
        return;
      }

      const pokemonData = await pokemonResponse.json();
      const speciesData = await speciesResponse.json();

      const formattedName =
        pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

      const types = pokemonData.types
        .map((item: any) => item.type.name)
        .map((type: string) => type.charAt(0).toUpperCase() + type.slice(1))
        .join(' / ');

      const englishEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      );

      const cleanDescription = englishEntry
        ? englishEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ')
        : 'No description found.';

      setTitle(formattedName);
      setCategory(types);
      setDescription(cleanDescription);
    } catch {
      setError('Something went wrong while autofilling.');
    } finally {
      setAutofillLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim()) {
      setError('Name is required');
      return;
    }

    if (!category.trim()) {
      setError('Type is required');
      return;
    }

    if (rating < 0 || rating > 10) {
      setError('Power rating must be between 0 and 10');
      return;
    }

    if (price < 0) {
      setError('Value cannot be negative');
      return;
    }

    // Send data to parent (Add or Edit)
    onSave({
      title,
      description,
      category,
      price,
      rating,
    });
  }

  return (
    <div>
      <h2>{product ? 'Edit Pokémon' : 'Add New Pokémon'}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
        {/* Title */}
        <label style={{ display: 'block', marginBottom: 12 }}>
          Pokémon Name
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        <button type="button" onClick={handleAutofill}>
          {autofillLoading ? 'Autofilling...' : 'Autofill Pokémon Info'}
        </button>

        {/* Description */}
        <label style={{ display: 'block', marginBottom: 12, marginTop: 12 }}>
          Notes
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        {/* Category */}
        <label style={{ display: 'block', marginBottom: 12 }}>
          Type
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        {/* Price */}
        <label style={{ display: 'block', marginBottom: 12 }}>
          Value ($)
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        {/* Rating */}
        <label style={{ display: 'block', marginBottom: 12 }}>
          Power Rating (0–10)
          <input
            type="number"
            min={0}
            max={10}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary" type="submit">
            {product ? 'Save Changes' : 'Add Pokémon'}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}