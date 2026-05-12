import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

/**
 * V2CategoryNav — category navigation.
 * Desktop (≥900px): clean horizontal text-link row with separators.
 * Mobile (<900px):  dropdown trigger button that opens a panel.
 *
 * For now every non-active link points to /v2/menu/dinner; when other
 * category pages exist, just update the `to` field below.
 */

const CATEGORIES = [
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

function V2CategoryNav({active = "dinner"}) {
  const [open, setOpen] = useState(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const railRef = useRef(null);
  const wrapRef = useRef(null);
  const activeCat = CATEGORIES.find((c) => c.key === active) || CATEGORIES[0];

  // track whether the rail can be scrolled left or right
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setCanLeft(rail.scrollLeft > 1);
      setCanRight(rail.scrollLeft < max - 1);
    };
    update();
    rail.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({left: dir * Math.max(rail.clientWidth - 80, 200), behavior: "smooth"});
  };

  // close mobile dropdown on outside click + escape
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

  // scroll the active link into view on desktop
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.querySelector(`[data-cat="${active}"]`);
    if (el) {
      const railRect = rail.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      rail.scrollLeft += elRect.left - railRect.left - 24;
    }
  }, [active]);

  return (
    <div className="v2-catnav-wrap" ref={wrapRef}>
      {/* Mobile: dropdown trigger */}
      <div className="v2-catnav v2-catnav--mobile">
        <button
          type="button"
          className={`v2-catnav-trigger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="v2-catnav-trigger-eyebrow">Browse</span>
          <span className="v2-catnav-trigger-label">
            <span className="v2-catnav-trigger-zh" aria-hidden>{activeCat.zh}</span>
            {activeCat.label}
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="16" height="16" className="v2-catnav-trigger-chev" aria-hidden>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul className="v2-catnav-panel" role="listbox">
            {CATEGORIES.map((c) => {
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

      {/* Desktop: horizontal folder-tab row */}
      <nav className="v2-catnav v2-catnav--desktop" aria-label="Menu categories">
        <button
          type="button"
          className={`v2-catnav-arrow v2-catnav-arrow--left ${canLeft ? "is-on" : ""}`}
          onClick={() => scrollBy(-1)}
          aria-label="Scroll categories left"
          tabIndex={canLeft ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="18" height="18" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="v2-catnav-rail" ref={railRef}>
          {CATEGORIES.map((c, i) => {
            const isActive = c.key === active;
            return (
              <React.Fragment key={c.key}>
                <Link
                  to={`/menu/${c.key}`}
                  data-cat={c.key}
                  className={`v2-catnav-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {c.label}
                </Link>
                {i < CATEGORIES.length - 1 && (
                  <span className="v2-catnav-sep" aria-hidden>·</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button
          type="button"
          className={`v2-catnav-arrow v2-catnav-arrow--right ${canRight ? "is-on" : ""}`}
          onClick={() => scrollBy(1)}
          aria-label="Scroll categories right"
          tabIndex={canRight ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="18" height="18" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

export default V2CategoryNav;
