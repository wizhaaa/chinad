import React, {useState, useEffect, useRef} from "react";
import {Helmet} from "react-helmet";
import V2FooterWordmark from "./V2FooterWordmark";
import V2Wordmark from "./V2Wordmark";
import "./V2Home.css";

/**
 * V2Home — China Delight tea-house refresh.
 * Lives at /v2 alongside the existing site at /. Visual-only.
 * Single 3D focal scene: a parallax-tilting bao-bun with floating
 * chopsticks + steam, reacting to the viewer's mouse position.
 */

// inline SVG icons keep us off another dep
const Icon = {
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Spice: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2c-.6 1.6-1.5 2.9-2.5 3.8C7 8 6 10.4 6 13a6 6 0 0 0 12 0c0-2.6-1-5-3.5-7.2C13.5 4.9 12.6 3.6 12 2z"/>
    </svg>
  ),
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 19c0-8 6-14 16-14 0 10-6 16-14 16-2 0-2-2-2-2z" /><path d="M5 19l8-8" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/>
    </svg>
  ),
};

function V2Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouse, setMouse] = useState({x: 0, y: 0});
  const stageRef = useRef(null);

  // mouse parallax for the 3D scene — tracks mouse anywhere in the window,
  // computing rotation relative to the stage's center on screen.
  useEffect(() => {
    const onMove = (e) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // normalize: distance from stage center, scaled by viewport so it
      // saturates near the screen edges instead of only near the stage.
      const x = (e.clientX - cx) / window.innerWidth;
      const y = (e.clientY - cy) / window.innerHeight;
      setMouse({x: Math.max(-0.5, Math.min(0.5, x)), y: Math.max(-0.5, Math.min(0.5, y))});
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const stageStyle = {
    "--mx": mouse.x,
    "--my": mouse.y,
  };

  // Hand-curated featured list — real items from the China Delight menu.
  // Update this array to spotlight different dishes (chef's specials,
  // seasonal, etc.) without touching API or layout code.
  const dishes = [
    {en: "General Tso's Chicken", zh: "左宗棠雞",
      sub: "Crispy, sweet-chili lacquer over white meat",
      price: "$12.75", art: "dish-1", tag: "star", tagText: "Most loved"},
    {en: "Sesame Chicken", zh: "芝麻雞",
      sub: "Lightly battered, toasted-sesame glaze",
      price: "$12.75", art: "dish-2", tag: "star", tagText: "Customer pick"},
    {en: "Beef with Broccoli", zh: "芥蘭牛",
      sub: "Tender flank in classic brown sauce",
      price: "$12.75", art: "dish-3", tag: "leaf", tagText: "Classic"},
    {en: "Kung Pao Chicken", zh: "宮保雞丁",
      sub: "Peanuts, dried chili, scallion",
      price: "$12.75", art: "dish-4", tag: "spice", tagText: "Mild heat"},
  ];

  // dish card tilt-on-hover
  const tiltOnMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--tx", py * -6);
    card.style.setProperty("--ty", px * 6);
  };
  const tiltReset = (e) => {
    e.currentTarget.style.setProperty("--tx", 0);
    e.currentTarget.style.setProperty("--ty", 0);
  };

  return (
    <div className="v2-root">
      <Helmet>
        <title>China Delight — Tea House Refresh (v2)</title>
      </Helmet>

      {/* ===== NAV ===== */}
      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <a href="/menu">Menu</a>
            <a className="v2-nav-cta" href="/menu/dinner">
              Order <span aria-hidden>→</span>
            </a>
          </div>
          <button
            className="v2-nav-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Icon.Close width="22" height="22" /> : <Icon.Menu width="22" height="22" />}
          </button>
        </nav>
      </div>

      {/* mobile menu panel */}
      <div className={`v2-mobile-panel ${mobileOpen ? "is-open" : ""}`}>
        <a href="/menu" onClick={() => setMobileOpen(false)}>Menu</a>
        <a className="v2-mobile-cta" href="/menu/dinner" onClick={() => setMobileOpen(false)}>
          Order Online →
        </a>
      </div>

      {/* ===== HERO ===== */}
      <section className="v2-container v2-hero">
        <div className="v2-hero-copy">
          <div className="v2-eyebrow">
            <span className="v2-eyebrow-rule" />
            Forest Hill, Maryland · Since 2004
          </div>
          <h1 className="v2-hero-title">
            Authentic Chinese cuisine, <em>thoughtfully</em> prepared.
          </h1>
          <p className="v2-hero-zh">细 致 · 用 心 · 待 客</p>
          <p className="v2-hero-lede">
            A neighborhood kitchen serving the recipes our family has refined
            for decades. Hand-crafted dumplings, slow-simmered broths, and
            dishes you'll remember on the way home.
          </p>
          <div className="v2-cta-row">
            <a className="v2-cta-primary" href="/menu/dinner">
              Order Online
            </a>
            <a className="v2-cta-text" href="/menu">
              View Menu
              <span className="v2-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="v2-hero-stats">
            <div className="v2-stat">
              <span className="v2-stat-num">20+</span>
              <span className="v2-stat-label">years serving</span>
            </div>
            <div className="v2-stat-divider" />
            <div className="v2-stat">
              <span className="v2-stat-num">120+</span>
              <span className="v2-stat-label">menu items</span>
            </div>
            <div className="v2-stat-divider" />
            <div className="v2-stat">
              <span className="v2-stat-num">4.6★</span>
              <span className="v2-stat-label">avg. review</span>
            </div>
          </div>
        </div>

        {/* ===== Interactive 3D scene ===== */}
        <div
          className="v2-scene-stage"
          ref={stageRef}
          style={stageStyle}
          aria-hidden="true"
        >
          <div className="v2-scene-ring" />
          <div className="v2-scene-ring v2-scene-ring--lg" />

          <div className="v2-scene">
            {/* steam curls rising from the open top */}
            <div className="v2-steam-3d">
              <span className="v2-steam-curl v2-steam-curl--1" />
              <span className="v2-steam-curl v2-steam-curl--2" />
              <span className="v2-steam-curl v2-steam-curl--3" />
            </div>

            {/* === Chinese takeout container === */}
            <div className="v2-box">
              <div className="v2-box-shadow" />

              {/* the four trapezoidal walls — front, back, left, right */}
              <div className="v2-box-face v2-box-face--back" />
              <div className="v2-box-face v2-box-face--left" />
              <div className="v2-box-face v2-box-face--right" />
              <div className="v2-box-face v2-box-face--front">
                {/* red pagoda emblem on the front */}
                <svg className="v2-box-emblem" viewBox="0 0 100 100" aria-hidden="true">
                  {/* pagoda silhouette — three tiers */}
                  <g fill="#c8302a">
                    {/* roof tier 1 */}
                    <path d="M50 18 L72 30 L28 30 Z" />
                    <rect x="34" y="30" width="32" height="3" />
                    {/* roof tier 2 */}
                    <path d="M50 36 L74 48 L26 48 Z" />
                    <rect x="32" y="48" width="36" height="3" />
                    {/* roof tier 3 */}
                    <path d="M50 54 L76 66 L24 66 Z" />
                    <rect x="30" y="66" width="40" height="3" />
                    {/* base */}
                    <rect x="36" y="69" width="28" height="14" />
                    {/* doorway */}
                    <rect x="46" y="73" width="8" height="10" fill="#fff" />
                    {/* finial */}
                    <circle cx="50" cy="14" r="2.5" />
                    <rect x="49" y="9" width="2" height="6" />
                  </g>
                </svg>
                {/* "Thank You" text along the bottom, like the real boxes */}
                <div className="v2-box-thanks">THANK YOU · 多 謝</div>
              </div>

              {/* the wire handle */}
              <div className="v2-box-handle">
                <svg viewBox="-60 -90 120 100" aria-hidden="true">
                  <path
                    d="M -50 0 Q -50 -75 0 -75 Q 50 -75 50 0"
                    fill="none"
                    stroke="#5a4a32"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* opened top flaps — the iconic angled wings */}
              <div className="v2-box-flap v2-box-flap--front" />
              <div className="v2-box-flap v2-box-flap--back" />
              <div className="v2-box-flap v2-box-flap--left" />
              <div className="v2-box-flap v2-box-flap--right" />

              {/* dark interior visible through the open top */}
              <div className="v2-box-interior" />

              {/* noodles peeking out of the top */}
              <div className="v2-box-noodles">
                <span /><span /><span /><span /><span />
              </div>
            </div>

            {/* crossed chopsticks beside the box */}
            <div className="v2-chops">
              <div className="v2-chop v2-chop--1" />
              <div className="v2-chop v2-chop--2" />
            </div>
          </div>

        </div>
      </section>

      {/* ===== ABOUT STRIP ===== */}
      <section id="about" className="v2-about">
        <div className="v2-container">
          <div className="v2-about-zh">家 · 味 · 道</div>
          <span className="v2-about-rule" />
          <p className="v2-about-copy">
            "We open the doors at eleven, and we cook as if every guest were
            family — because most of them are, by now."
          </p>
          <div className="v2-about-attr">— The Zhang Family</div>
        </div>
      </section>

      {/* ===== FEATURED DISHES ===== */}
      <section id="menu" className="v2-featured">
        <div className="v2-container">
          <div className="v2-section-head">
            <div className="v2-section-eyebrow">From the Kitchen</div>
            <h2 className="v2-section-title">
              <em>Featured</em> dishes
            </h2>
          </div>

          <div className="v2-dish-grid">
            {dishes.map((d) => {
              const TagIcon = d.tag === "spice" ? Icon.Spice
                : d.tag === "leaf" ? Icon.Leaf
                : Icon.Star;
              return (
                <a
                  className="v2-dish-card"
                  key={d.en}
                  href="/menu/dinner"
                  onMouseMove={tiltOnMove}
                  onMouseLeave={tiltReset}
                  aria-label={`Order ${d.en}`}
                >
                  <div className={`v2-dish-img ${d.art}`}>
                    <span className="v2-dish-zh">{d.zh}</span>
                    <span className="v2-dish-tag">
                      <TagIcon width="13" height="13" /> {d.tagText}
                    </span>
                  </div>
                  <h3 className="v2-dish-name">{d.en}</h3>
                  <p className="v2-dish-sub">{d.sub}</p>
                  <div className="v2-dish-foot">
                    <span className="v2-dish-price">{d.price}</span>
                    <span className="v2-dish-add">
                      <Icon.Plus width="14" height="14" /> Order
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== VISIT ===== */}
      <section id="visit" className="v2-visit">
        <div className="v2-container">
          <div className="v2-section-head">
            <div className="v2-section-eyebrow">Come Sit With Us</div>
            <h2 className="v2-section-title">
              <em>Visit</em> the table
            </h2>
          </div>

          <div className="v2-visit-grid">
            <div className="v2-visit-col">
              <div className="v2-visit-icon"><Icon.Clock width="22" height="22" /></div>
              <div className="v2-visit-zh">時 間</div>
              <h3 className="v2-visit-label">Hours</h3>
              <div className="v2-visit-body">
                <div><strong>Mon – Sat</strong><br />11:00 AM – 9:30 PM</div>
                <div style={{marginTop: 10}}><strong>Sunday</strong><br />12:00 PM – 8:30 PM</div>
                <em>Closed Tuesdays</em>
              </div>
            </div>

            <div className="v2-visit-col">
              <div className="v2-visit-icon"><Icon.Pin width="22" height="22" /></div>
              <div className="v2-visit-zh">地 址</div>
              <h3 className="v2-visit-label">Address</h3>
              <div className="v2-visit-body">
                <div>1E Newport Drive</div>
                <div>Forest Hill, MD 21050</div>
                <em>On Route 24, across from Enotria</em>
              </div>
            </div>

            <div className="v2-visit-col">
              <div className="v2-visit-icon"><Icon.Phone width="22" height="22" /></div>
              <div className="v2-visit-zh">聯 繫</div>
              <h3 className="v2-visit-label">Reach Us</h3>
              <div className="v2-visit-body">
                <div><a href="tel:4108779490">410.877.9490</a></div>
                <div style={{marginTop: 10}}>
                  <a href="mailto:chinadelightmd@gmail.com">
                    <Icon.Mail width="14" height="14" style={{verticalAlign: "-2px", marginRight: 6}} />
                    chinadelightmd@gmail.com
                  </a>
                </div>
                <em>Carryout, dine-in, and online orders</em>
              </div>
            </div>
          </div>

          <div className="v2-map-wrap">
            <iframe
              title="China Delight — Forest Hill, MD"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.182788165903!2d-76.3879002845251!3d39.57803061414107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c7deb7b8b012ab%3A0xd3e57330e03df815!2sChina%20Delight!5e0!3m2!1sen!2sus!4v1617983002384!5m2!1sen!2sus"
              loading="lazy"
              allowFullScreen=""
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="v2-footer">
        <div className="v2-container">
          <div className="v2-seal">逸</div>
          <V2FooterWordmark />
          <div className="v2-footer-tag">Forest Hill · Since 2004</div>
          <div className="v2-footer-copy">
            © {new Date().getFullYear()} China Delight. All rights reserved.
          </div>
          <div className="v2-footer-by">
            Made with <span className="v2-footer-by-heart" aria-label="love">♥</span> by wz
          </div>
        </div>
      </footer>
    </div>
  );
}

export default V2Home;
