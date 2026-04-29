export default function HomeView() {
  return (
    <div>
      {/* TODO: Replace with your own landing-page copy. Tell a first-time
          visitor what this app does and why they'd use it. */}
      <h1>Welcome to Your Pokémon Tracker</h1>

      <div className="card">
        <h2>Gotta Track ’Em All!</h2>

        <p>
          This app helps you keep track of your favorite <b>Pokémon</b>,
          including their type, value, notes, and power rating.
        </p>

        <p>
          Add Pokémon to your collection, edit their details, and view automatic
          summary stats for your collection.
        </p>

        <p style={{ color: 'var(--muted)' }}>
          Use the Pokémon page to start building your collection.
        </p>
      </div>

      {/* What You Track Section */}
      <div className="card">
        <h2>What You Track</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li><b>Name:</b> The Pokémon’s name</li>
          <li><b>Type:</b> Fire, Water, Grass, Electric, etc.</li>
          <li><b>Value:</b> Estimated card or collection value</li>
          <li><b>Power Rating:</b> Your rating from 0–10</li>
          <li><b>Notes:</b> Any additional details or thoughts</li>
        </ul>
      </div>

      {/* What's Automatically Tracked Section */}
      <div className="card">
        <h2>What’s Automatically Tracked</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li><b>Total Pokémon:</b> Counts how many Pokémon are in your collection</li>
          <li><b>Average Rating:</b> Calculates the average power rating of your Pokémon</li>
          <li><b>Total Collection Value:</b> Adds up the value of all Pokémon in your collection</li>
        </ul>
      </div>
    </div>
  );
}