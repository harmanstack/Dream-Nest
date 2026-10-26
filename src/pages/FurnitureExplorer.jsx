
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FurnitureExplorer.css";

const furniture = [
  { id: 1, name: "Cloud Sofa", category: "Living Room", price: 24999, emoji: "🛋️", color: "#e9dfd2", description: "Comfortable three-seater sofa" },
  { id: 2, name: "Accent Chair", category: "Living Room", price: 8999, emoji: "🪑", color: "#e5d9ed", description: "A stylish reading corner chair" },
  { id: 3, name: "Oak Coffee Table", category: "Living Room", price: 5499, emoji: "🪵", color: "#e9d5b5", description: "Minimal solid-wood coffee table" },
  { id: 4, name: "Platform Bed", category: "Bedroom", price: 22999, emoji: "🛏️", color: "#dce7e2", description: "Modern bed with a clean silhouette" },
  { id: 5, name: "Bedside Lamp", category: "Bedroom", price: 1899, emoji: "💡", color: "#f4e8c9", description: "Warm lighting for peaceful evenings" },
  { id: 6, name: "Wardrobe", category: "Bedroom", price: 17999, emoji: "🚪", color: "#e6ded2", description: "Spacious everyday storage" },
  { id: 7, name: "Dining Table", category: "Dining", price: 15999, emoji: "🍽️", color: "#e8d9ca", description: "A welcoming table for family meals" },
  { id: 8, name: "Dining Chair", category: "Dining", price: 3499, emoji: "🪑", color: "#d8e5dd", description: "Simple, versatile dining chair" },
  { id: 9, name: "Study Desk", category: "Workspace", price: 6999, emoji: "🖥️", color: "#dce5ee", description: "A practical work-from-home desk" },
  { id: 10, name: "Bookshelf", category: "Workspace", price: 4999, emoji: "📚", color: "#e9dfd2", description: "Display books and favourite objects" },
  { id: 11, name: "Floor Plant", category: "Decor", price: 1299, emoji: "🪴", color: "#dce8d4", description: "Bring a natural touch indoors" },
  { id: 12, name: "Pendant Light", category: "Decor", price: 2799, emoji: "🏮", color: "#f0dfc5", description: "A decorative statement light" },
];

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Workspace",
  "Decor",
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function FurnitureExplorer() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("dreamnest-furniture-wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "dreamnest-furniture-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const filteredFurniture = useMemo(() => {
    let result = furniture.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  const showWishlist = () => {
    setCategory("All");
    setSearch("");
    setSort("featured");
  };

  const wishlistItems = furniture.filter((item) =>
    wishlist.includes(item.id)
  );

  return (
    <main className="fe-page">
      <header className="fe-topbar">
        <button
          className="fe-brand"
          onClick={() => navigate("/")}
          aria-label="Go to DreamNest home"
        >
          <span className="fe-brand-icon">⌂</span>
          DreamNest
        </button>

        <div className="fe-top-actions">
          <button className="fe-home-btn" onClick={() => navigate("/")}>
            ← Home
          </button>
          <button
            className="fe-studio-btn"
            onClick={() => navigate("/studio")}
          >
            Open Studio ↗
          </button>
        </div>
      </header>

      <section className="fe-hero">
        <div className="fe-hero-copy">
          <span className="fe-eyebrow">THE FURNITURE EDIT</span>
          <h1>
            Find pieces
            <br />
            that feel like <em>home.</em>
          </h1>
          <p>
            Explore furniture and decor for every corner of your dream home.
            Save your favourites and build your own collection.
          </p>

          <div className="fe-hero-stats">
            <div>
              <strong>{furniture.length}</strong>
              <span>Curated pieces</span>
            </div>
            <div>
              <strong>{categories.length - 1}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>{wishlist.length}</strong>
              <span>Saved items</span>
            </div>
          </div>
        </div>

        <div className="fe-hero-art" aria-label="Furniture illustration">
          <div className="fe-art-circle" />
          <div className="fe-art-plant">🪴</div>
          <div className="fe-art-lamp">💡</div>
          <div className="fe-art-sofa">🛋️</div>
          <div className="fe-art-table">🪵</div>
          <div className="fe-art-note">
            <span>YOUR SPACE</span>
            <strong>Your story.</strong>
          </div>
        </div>
      </section>

      <section className="fe-catalog">
        <div className="fe-section-heading">
          <div>
            <span className="fe-eyebrow">MAKE YOURSELF AT HOME</span>
            <h2>Explore the collection</h2>
            <p>Find your next favourite piece.</p>
          </div>

          <button
            className={`fe-wishlist-filter ${
              category === "All" && search === "__wishlist__" ? "active" : ""
            }`}
            onClick={() => {
              setSearch("__wishlist__");
              setCategory("All");
            }}
          >
            ♡ Wishlist ({wishlist.length})
          </button>
        </div>

        <div className="fe-controls">
          <label className="fe-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search furniture..."
              value={search === "__wishlist__" ? "" : search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search furniture"
            />
          </label>

          <label className="fe-sort">
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort furniture"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div className="fe-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={`fe-category ${
                category === item ? "active" : ""
              }`}
              onClick={() => {
                setCategory(item);
                setSearch("");
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {search === "__wishlist__" ? (
          <>
            <div className="fe-results-line">
              <span>Your saved collection</span>
              <button onClick={showWishlist}>Show all furniture</button>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="fe-empty">
                <span>♡</span>
                <h3>Your wishlist is waiting</h3>
                <p>Tap the heart on any furniture card to save it here.</p>
                <button onClick={showWishlist}>Explore furniture</button>
              </div>
            ) : (
              <div className="fe-grid">
                {wishlistItems.map((item) => (
                  <FurnitureCard
                    key={item.id}
                    item={item}
                    saved
                    onToggle={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="fe-results-line">
              <span>
                Showing {filteredFurniture.length} pieces
                {category !== "All" ? ` in ${category}` : ""}
              </span>
              {(search || category !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Clear filters ×
                </button>
              )}
            </div>

            {filteredFurniture.length === 0 ? (
              <div className="fe-empty">
                <span>⌕</span>
                <h3>No furniture found</h3>
                <p>Try a different name or choose another category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Reset search
                </button>
              </div>
            ) : (
              <div className="fe-grid">
                {filteredFurniture.map((item) => (
                  <FurnitureCard
                    key={item.id}
                    item={item}
                    saved={wishlist.includes(item.id)}
                    onToggle={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <footer className="fe-footer">
        <button onClick={() => navigate("/")}>⌂ DreamNest</button>
        <span>Make room for what matters.</span>
        <button onClick={() => navigate("/studio")}>Design your space ↗</button>
      </footer>
    </main>
  );
}

function FurnitureCard({ item, saved, onToggle }) {
  return (
    <article className="fe-card">
      <div
        className="fe-card-art"
        style={{ "--item-bg": item.color }}
      >
        <span className="fe-card-emoji" aria-hidden="true">
          {item.emoji}
        </span>

        <span className="fe-card-category">{item.category}</span>

        <button
          className={`fe-heart ${saved ? "saved" : ""}`}
          onClick={() => onToggle(item.id)}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="fe-card-info">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <strong>{formatPrice(item.price)}</strong>
      </div>

      <button
        className={`fe-save-btn ${saved ? "saved" : ""}`}
        onClick={() => onToggle(item.id)}
      >
        {saved ? "♥ Saved to wishlist" : "+ Add to wishlist"}
      </button>
    </article>
  );
}

export default FurnitureExplorer;
