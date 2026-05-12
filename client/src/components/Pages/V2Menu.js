import React, {useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import V2Wordmark from "./V2Wordmark";
import {Link, useParams, Redirect} from "react-router-dom";
import api from "../api";
import {useCartContext} from "../CartContext";
import V2ItemDialog from "./V2ItemDialog";
import V2CategoryNav from "./V2CategoryNav";
import CATEGORIES from "./v2Categories";
import "./V2Home.css";
import "./V2Menu.css";

/**
 * V2Menu — generic category page driven by the :category URL param.
 * Pulls items from the matching v1 API endpoint and renders the same
 * card grid + dialog flow regardless of category.
 */
const SORT_OPTIONS = [
  {key: "default",   label: "Default"},
  {key: "popular",   label: "Most popular"},
  {key: "rating",    label: "Highest rated"},
  {key: "price-asc", label: "Price: low to high"},
  {key: "price-desc",label: "Price: high to low"},
  {key: "name",      label: "A – Z"},
];

function V2Menu() {
  const params = useParams();
  // default to "dinner" if no :category was provided in the URL
  const categoryKey = params.category || "dinner";
  const cat = CATEGORIES[categoryKey];

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("popular");
  const [active, setActive] = useState(null);
  const {userCartCount} = useCartContext();

  useEffect(() => {
    if (!cat) return;
    setItems([]); // reset while fetching
    api.get(cat.endpoint).then((res) => setItems(res.data || []));
  }, [cat]);

  // unknown category → redirect to the menu index
  if (!cat) return <Redirect to="/menu" />;

  const matchingFilter = items.filter((d) =>
    d.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const visible = sortDinners(matchingFilter, sort);

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className="v2-root v2-menu-root">
      <Helmet>
        <title>{cat.label} — China Delight</title>
      </Helmet>

      {/* slim top bar */}
      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <Link to="/menu">Menu</Link>
            <NavCategoryDropdown active={categoryKey} />
            <Link className="v2-nav-cta v2-cart-pill" to="/cart">
              Cart
              {userCartCount > 0 && (
                <span className="v2-cart-badge">{userCartCount}</span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      <V2CategoryNav active={categoryKey} />

      <header className="v2-container v2-menu-header">
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          {cat.eyebrow}
        </div>
        <h1 className="v2-hero-title">
          <em>{cat.titleAccent}</em>{cat.titleRest && ` ${cat.titleRest}`}
        </h1>
        <p className="v2-hero-zh">{cat.zhSubtitle}</p>
        <p className="v2-menu-lede">{cat.lede}</p>

        <div className="v2-toolbar">
          <div className="v2-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" width="16" height="16">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Search dishes…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {filter && (
              <button
                className="v2-search-clear"
                aria-label="Clear search"
                onClick={() => setFilter("")}
              >×</button>
            )}
          </div>

          <label className="v2-sort">
            <span className="v2-sort-label">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort dishes"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              width="14" height="14" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </label>
        </div>
      </header>

      <section id="dishes" className="v2-container v2-menu-grid-wrap">
        {visible.length === 0 && items.length > 0 && (
          <div className="v2-menu-empty">
            No dishes match "{filter}".
          </div>
        )}
        {items.length === 0 && (
          <div className="v2-menu-empty">Loading menu…</div>
        )}

        <div className="v2-menu-grid">
          {visible.map((d, i) => (
            <article
              className="v2-menu-card"
              key={d._id || d.name}
              onClick={() => setActive(d)}
            >
              <div className="v2-menu-card-img">
                <DishImage src={d.img} alt={d.name} index={i} />
              </div>
              {d.reviews && d.reviews.length > 0 && (
                <div className="v2-menu-card-rating">
                  ★ {avgRating(d.reviews)} <span>({d.reviews.length})</span>
                </div>
              )}
              <div className="v2-menu-card-body">
                <h3 className="v2-menu-card-name">{d.name}</h3>
                <p className="v2-menu-card-desc">{d.description}</p>
                <div className="v2-menu-card-foot">
                  <span className="v2-menu-card-price">{formatItemPrice(d, fmt)}</span>
                  <span className="v2-menu-card-cta">
                    Customize
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.6" strokeLinecap="round" width="14" height="14">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {active && (
        <V2ItemDialog
          item={active}
          category={cat}
          onClose={() => setActive(null)}
        />
      )}

      <footer className="v2-footer v2-menu-footer">
        <div className="v2-container">
          <div className="v2-footer-tag">Forest Hill · Since 2004</div>
          <div className="v2-footer-copy">
            © {new Date().getFullYear()} China Delight
          </div>
          <div className="v2-footer-by">
            Made with <span className="v2-footer-by-heart" aria-label="love">♥</span> by wz
          </div>
        </div>
      </footer>
    </div>
  );
}

// shares the same ordering V2CategoryNav uses
const NAV_CATEGORIES = [
  {key: "lunch",       label: "Lunch",          zh: "午餐"},
  {key: "dinner",      label: "Dinner",         zh: "晚餐"},
  {key: "appetizers",  label: "Appetizers",     zh: "前菜"},
  {key: "soups",       label: "Soups",          zh: "湯"},
  {key: "chef",        label: "Chef's Specials", zh: "招牌"},
  {key: "sweet-sour",  label: "Sweet & Sour",   zh: "糖醋"},
  {key: "poultry",     label: "Poultry",        zh: "禽"},
  {key: "beef",        label: "Beef",           zh: "牛肉"},
  {key: "pork",        label: "Pork",           zh: "豬肉"},
  {key: "seafood",     label: "Seafood",        zh: "海鮮"},
  {key: "vegetable",   label: "Vegetable",      zh: "蔬菜"},
  {key: "lo-mein",     label: "Lo Mein",        zh: "撈麵"},
  {key: "chow-mein",   label: "Chow Mein",      zh: "炒麵"},
  {key: "fried-rice",  label: "Fried Rice",     zh: "炒飯"},
  {key: "egg-foo",     label: "Egg Foo Young",  zh: "芙蓉蛋"},
  {key: "sides",       label: "Sides",          zh: "小菜"},
];

function NavCategoryDropdown({active = "dinner"}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const activeCat = NAV_CATEGORIES.find((c) => c.key === active) || NAV_CATEGORIES[0];

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="v2-nav-dropdown" ref={wrapRef}>
      <button
        type="button"
        className={`v2-nav-dropdown-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {activeCat.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          width="13" height="13" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="v2-nav-dropdown-panel" role="listbox">
          {NAV_CATEGORIES.map((c) => {
            const isActive = c.key === active;
            return (
              <li key={c.key} role="option" aria-selected={isActive}>
                <Link
                  to={`/menu/${c.key}`}
                  className={`v2-catnav-panel-item ${isActive ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="v2-catnav-panel-zh" aria-hidden>{c.zh}</span>
                  <span className="v2-catnav-panel-label">{c.label}</span>
                  {isActive && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                      width="14" height="14" aria-hidden>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DishImage({src, alt, index = 0, className = ""}) {
  const [broken, setBroken] = useState(!src);
  // a fresh src means try again
  useEffect(() => {
    setBroken(!src);
  }, [src]);

  if (broken) {
    // pick a soft gradient based on the index so cards feel varied
    const variant = (index % 5) + 1;
    return (
      <div className={`v2-menu-card-placeholder v2-ph-grad-${variant} ${className}`}>
        <span className="v2-menu-card-num">
          № {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}

function avgRating(reviews) {
  if (!reviews?.length) return "—";
  const total = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0);
  return (total / reviews.length).toFixed(1);
}

// Display the right price for the card. If the item has a fixed `price`,
// show it; otherwise fall back to the small (pint) size as the "starting at"
// price. Returns "—" if neither is available.
function formatItemPrice(item, fmt) {
  const fixed = item.price;
  const sm = item.priceSm;
  if (fixed != null && fixed !== "") return fmt.format(Number(fixed));
  if (sm != null && sm !== "") return fmt.format(Number(sm));
  return "—";
}

function sortDinners(items, mode) {
  const arr = [...items];
  switch (mode) {
    case "popular":
      // most reviews first; ties broken by higher rating
      return arr.sort((a, b) => {
        const ra = a.reviews?.length || 0;
        const rb = b.reviews?.length || 0;
        if (rb !== ra) return rb - ra;
        return numericAvg(b.reviews) - numericAvg(a.reviews);
      });
    case "rating":
      // highest avg rating; require at least 1 review to count
      return arr.sort((a, b) => {
        const ra = numericAvg(a.reviews);
        const rb = numericAvg(b.reviews);
        if (rb !== ra) return rb - ra;
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      });
    case "price-asc":
      return arr.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return arr.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case "name":
      return arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    default:
      return arr;
  }
}

function numericAvg(reviews) {
  if (!reviews?.length) return 0;
  return reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length;
}

// Returns the comparable starting price (fixed price, or priceSm fallback)
function effectivePrice(d) {
  if (d.price != null && d.price !== "") return Number(d.price);
  if (d.priceSm != null && d.priceSm !== "") return Number(d.priceSm);
  return 0;
}

export default V2Menu;
