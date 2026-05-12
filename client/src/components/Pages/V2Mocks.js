import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import V2Wordmark from "./V2Wordmark";
import "./V2Home.css";
import "./V2Menu.css";
import "./V2Mocks.css";

/**
 * V2Mocks — design exploration page for the top-right cart button.
 * Shows alternative styles side-by-side so we can pick a direction.
 * Each mock renders a fake nav frame with the cart button inside, plus
 * an empty-state and a with-items state.
 */
function V2Mocks() {
  const MOCKS = [
    {key: "current",   title: "№ 01 — Current (regal frame)",
      desc: "Square ink block with double gold border + 4 corner brackets. Cormorant Garamond label. Hover swaps to seal-red."},
    {key: "minimal",   title: "№ 02 — Quiet text-link",
      desc: "Just \"Cart (3)\" as a clean text link with the count next to it. Underlined on hover. The most restrained option."},
    {key: "icon-pill", title: "№ 03 — Icon pill with badge",
      desc: "A round black pill with a cart icon, cream label, and a gold counter circle. Familiar e-commerce pattern."},
    {key: "lantern",   title: "№ 04 — Hanging lantern",
      desc: "Red lantern with a thin gold tassel. The cart count sits inside the lantern. Very on-brand."},
    {key: "stamp",     title: "№ 05 — Square seal stamp",
      desc: "Big seal-red square with white 籃 (basket) hanzi. Like a chop pressed onto the page."},
    {key: "scroll",    title: "№ 06 — Scroll tab",
      desc: "Slim cream tab with curled top corners + a vertical seal-red badge on the right edge."},
    {key: "ghost",     title: "№ 07 — Outlined ghost button",
      desc: "Thin gold outline, transparent fill, ink text. Hovers fill with ink. Tasteful and quiet."},
    {key: "tally",     title: "№ 08 — Tally counter",
      desc: "Small uppercase \"VIEW CART\" with the count rendered as a circular numeral chip."},
  ];

  return (
    <div className="v2-root v2-menu-root v2-mocks-root">
      <Helmet>
        <title>Cart Button Mocks — China Delight</title>
      </Helmet>

      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Live Cart</Link>
          </div>
        </nav>
      </div>

      <header className="v2-container v2-menu-header">
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          Design exploration
        </div>
        <h1 className="v2-hero-title">
          <em>Cart</em> button mocks
        </h1>
        <p className="v2-menu-lede">
          Eight alternatives for the top-right cart control. Each frame
          shows the button at empty (count 0) and full (count 3) states
          inside a mini nav. The current live design is mock 01.
        </p>
      </header>

      <main className="v2-container v2-mocks-main">
        {MOCKS.map((mock) => (
          <section className="v2-mock-section" key={mock.key}>
            <header className="v2-mock-head">
              <div>
                <h2 className="v2-mock-title">{mock.title}</h2>
                <p className="v2-mock-desc">{mock.desc}</p>
              </div>
            </header>

            <div className="cb-frame-stack">
              <CartFrame variant={mock.key} count={0} label="Empty cart" />
              <CartFrame variant={mock.key} count={3} label="3 items" />
            </div>
          </section>
        ))}
      </main>

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

/* ============================================================
   Mini-nav frame that hosts each cart-button variant
   ============================================================ */
function CartFrame({variant, count, label}) {
  return (
    <div className="cb-frame">
      <span className="cb-frame-label">{label}</span>
      <nav className="cb-nav">
        <span className="cb-nav-wordmark">
          <span className="cb-nav-seal">中</span>
          <span className="cb-nav-text">China Delight</span>
        </span>
        <span className="cb-nav-links">
          <span className="cb-nav-link">Menu</span>
          <CartButton variant={variant} count={count} />
        </span>
      </nav>
    </div>
  );
}

/* ============================================================
   The actual button variants — each is a span tree, no nav.
   ============================================================ */
function CartButton({variant, count}) {
  switch (variant) {
    case "current":
      return (
        <span className="cb-current">
          Cart
          {count > 0 && <span className="cb-current-badge">{count}</span>}
        </span>
      );

    case "minimal":
      return (
        <span className="cb-minimal">
          Cart {count > 0 && <em>({count})</em>}
        </span>
      );

    case "icon-pill":
      return (
        <span className="cb-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            width="16" height="16">
            <path d="M3 3h2l2.5 12.5a2 2 0 0 0 2 1.5h9a2 2 0 0 0 2-1.5L23 7H6" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
          Cart
          {count > 0 && <span className="cb-pill-badge">{count}</span>}
        </span>
      );

    case "lantern":
      return (
        <span className="cb-lantern">
          <span className="cb-lantern-cap" />
          <span className="cb-lantern-body">
            <span className="cb-lantern-num">{count > 0 ? count : ""}</span>
          </span>
          <span className="cb-lantern-tassel" />
        </span>
      );

    case "stamp":
      return (
        <span className="cb-stamp">
          <span className="cb-stamp-zh">籃</span>
          {count > 0 && <span className="cb-stamp-num">{count}</span>}
        </span>
      );

    case "scroll":
      return (
        <span className="cb-scroll">
          <span className="cb-scroll-label">Cart</span>
          <span className="cb-scroll-badge">{count}</span>
        </span>
      );

    case "ghost":
      return (
        <span className="cb-ghost">
          Cart
          {count > 0 && <span className="cb-ghost-dot">{count}</span>}
        </span>
      );

    case "tally":
      return (
        <span className="cb-tally">
          <span className="cb-tally-label">View Cart</span>
          <span className="cb-tally-num">{count}</span>
        </span>
      );

    default:
      return null;
  }
}

export default V2Mocks;
