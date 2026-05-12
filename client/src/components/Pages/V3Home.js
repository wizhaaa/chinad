import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import "./V3.css";

/**
 * V3Home — sumi-e bamboo + red sun aesthetic.
 * Inspired by Japanese/Chinese ink-paintings: cream paper, black bamboo
 * silhouettes, one bold red sun disc as the only color accent.
 */
function V3Home() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="v3-root">
      <Helmet>
        <title>China Delight — Ink (v3)</title>
      </Helmet>

      <div className="v3-paper" aria-hidden />

      {/* === NAV === */}
      <header className="v3-nav-wrap">
        <nav className="v3-nav">
          <Link className="v3-wordmark" to="/v3">
            <span className="v3-wordmark-zh" aria-hidden>中國之逸</span>
            <span className="v3-wordmark-en">China Delight</span>
          </Link>
          <div className="v3-nav-links">
            <Link to="/v3/menu">Menu</Link>
            <a href="#about">About</a>
            <a href="#visit">Visit</a>
            <Link className="v3-nav-cta" to="/v2/menu/dinner">Order</Link>
          </div>
        </nav>
      </header>

      {/* === HERO === */}
      <section className="v3-hero">
        {/* the red sun disc — slight scroll parallax */}
        <div
          className="v3-sun"
          aria-hidden
          style={{transform: `translate3d(0, ${scroll * 0.08}px, 0)`}}
        >
          <span className="v3-sun-disc" />
        </div>

        {/* bamboo silhouettes — three layered SVGs at different depths */}
        <BambooLeft scroll={scroll} />
        <BambooRight scroll={scroll} />

        {/* vertical right-side calligraphic label, like in the bamboo reference */}
        <div className="v3-vlabel" aria-hidden>
          <span>Hand</span>
          <span>·</span>
          <span>Made</span>
          <span>·</span>
          <span>Since</span>
          <span>·</span>
          <span>2004</span>
        </div>

        <div className="v3-hero-content">
          <div className="v3-hero-eyebrow">
            <span className="v3-rule" /> Forest Hill, Maryland
          </div>

          <h1 className="v3-hero-title">
            Slow-cooked,
            <br />
            <em>thoughtfully</em>
            <br />
            served.
          </h1>

          <div className="v3-hero-zh">細 致 · 用 心 · 待 客</div>

          <p className="v3-hero-lede">
            A neighborhood Chinese kitchen in Forest Hill, Maryland. Hand-pulled
            noodles, slow-simmered broths, recipes our family has refined for
            two decades.
          </p>

          <div className="v3-hero-actions">
            <Link className="v3-cta-primary" to="/v2/menu/dinner">
              Begin your order <span aria-hidden>→</span>
            </Link>
            <Link className="v3-cta-text" to="/v3/menu">
              View the menu
            </Link>
          </div>
        </div>

        {/* small chop in lower-left corner */}
        <div className="v3-chop" aria-hidden>
          <span>逸</span>
        </div>
      </section>

      {/* === ABOUT === */}
      <section id="about" className="v3-about">
        <div className="v3-about-inner">
          <p className="v3-about-quote">
            "We open the doors at eleven, and we cook as if every guest were
            family — because most of them are, by now."
          </p>
          <div className="v3-about-attr">— The Zhang Family</div>
        </div>
      </section>

      {/* === FEATURED — leader-dot menu rows === */}
      <section className="v3-featured">
        <header className="v3-section-head">
          <span className="v3-section-num">壹</span>
          <h2 className="v3-section-title">From the Kitchen</h2>
          <span className="v3-section-rule" />
        </header>

        <ul className="v3-dish-list">
          {[
            {en: "General Tso's Chicken", zh: "左宗棠雞", price: "$12.75",
              note: "Crispy, sweet-chili lacquer over white meat"},
            {en: "Sesame Chicken", zh: "芝麻雞", price: "$12.75",
              note: "Lightly battered, toasted-sesame glaze"},
            {en: "Beef with Broccoli", zh: "芥蘭牛", price: "$12.75",
              note: "Tender flank in classic brown sauce"},
            {en: "Kung Pao Chicken", zh: "宮保雞丁", price: "$12.75",
              note: "Peanuts, dried chili, scallion"},
          ].map((d) => (
            <li className="v3-dish" key={d.en}>
              <Link to="/v2/menu/dinner" className="v3-dish-link">
                <div className="v3-dish-main">
                  <span className="v3-dish-zh" aria-hidden>{d.zh}</span>
                  <h3 className="v3-dish-name">{d.en}</h3>
                </div>
                <span className="v3-dish-leader" aria-hidden />
                <p className="v3-dish-note">{d.note}</p>
                <span className="v3-dish-price">{d.price}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/v3/menu" className="v3-cta-text v3-featured-more">
          See all sections →
        </Link>
      </section>

      {/* === VISIT === */}
      <section id="visit" className="v3-visit">
        <header className="v3-section-head">
          <span className="v3-section-num">貳</span>
          <h2 className="v3-section-title">Visit</h2>
          <span className="v3-section-rule" />
        </header>

        <div className="v3-visit-grid">
          <div className="v3-visit-col">
            <div className="v3-visit-zh" aria-hidden>時 間</div>
            <h3 className="v3-visit-label">Hours</h3>
            <div className="v3-visit-body">
              <div><strong>Mon–Sat</strong> 11 AM – 9:30 PM</div>
              <div><strong>Sunday</strong> 12 PM – 8:30 PM</div>
              <div><em>Closed Tuesdays</em></div>
            </div>
          </div>
          <div className="v3-visit-col">
            <div className="v3-visit-zh" aria-hidden>地 址</div>
            <h3 className="v3-visit-label">Address</h3>
            <div className="v3-visit-body">
              <div>1E Newport Drive</div>
              <div>Forest Hill, MD 21050</div>
              <div><em>On Route 24, across from Enotria</em></div>
            </div>
          </div>
          <div className="v3-visit-col">
            <div className="v3-visit-zh" aria-hidden>聯 繫</div>
            <h3 className="v3-visit-label">Reach Us</h3>
            <div className="v3-visit-body">
              <div><a href="tel:4108779490">410.877.9490</a></div>
              <div><a href="mailto:chinadelightmd@gmail.com">chinadelightmd@gmail.com</a></div>
              <div><em>Carryout & dine-in only</em></div>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="v3-footer">
        <div className="v3-footer-mark" aria-hidden>
          <span className="v3-sun-disc v3-sun-disc--small" />
          <span className="v3-footer-zh">逸</span>
        </div>
        <div className="v3-footer-wordmark">China Delight</div>
        <div className="v3-footer-tag">Forest Hill · Since 2004</div>
        <div className="v3-footer-by">
          Made with <span className="v3-heart">♥</span> by wz
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   Bamboo SVGs — left and right, layered for depth
   ============================================================ */

function BambooLeft({scroll}) {
  return (
    <svg
      className="v3-bamboo v3-bamboo--left"
      viewBox="0 0 320 720"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      style={{transform: `translate3d(0, ${scroll * 0.04}px, 0)`}}
    >
      {/* tall bamboo stalks */}
      <g fill="#1a1614">
        {/* main stalk */}
        <path d="M 95 720 L 95 80 L 110 80 L 110 720 Z" opacity="0.92" />
        {/* knots — slightly fatter horizontal segments */}
        <ellipse cx="102" cy="640" rx="12" ry="3" />
        <ellipse cx="102" cy="540" rx="12" ry="3" />
        <ellipse cx="102" cy="430" rx="12" ry="3" />
        <ellipse cx="102" cy="310" rx="12" ry="3" />
        <ellipse cx="102" cy="200" rx="12" ry="3" />

        {/* second stalk further behind */}
        <path d="M 50 720 L 50 220 L 60 220 L 60 720 Z" opacity="0.5" />
        <ellipse cx="55" cy="640" rx="8" ry="2" opacity="0.5" />
        <ellipse cx="55" cy="540" rx="8" ry="2" opacity="0.5" />
        <ellipse cx="55" cy="430" rx="8" ry="2" opacity="0.5" />
        <ellipse cx="55" cy="320" rx="8" ry="2" opacity="0.5" />

        {/* bamboo leaves — clusters of 5-7 sharp leaf shapes */}
        {/* upper cluster */}
        <g transform="translate(105 240)">
          <path d="M 0 0 Q 30 -5 60 -25 Q 35 -10 0 0 Z" />
          <path d="M 0 0 Q 25 5 55 8 Q 30 0 0 0 Z" />
          <path d="M 0 0 Q 35 -22 75 -38 Q 40 -22 0 0 Z" />
          <path d="M 0 0 Q -20 -15 -40 -38 Q -18 -18 0 0 Z" opacity="0.85" />
          <path d="M 0 0 Q 15 18 38 38 Q 18 22 0 0 Z" opacity="0.92" />
        </g>
        {/* middle cluster */}
        <g transform="translate(105 380)">
          <path d="M 0 0 Q 28 -8 58 -22 Q 32 -10 0 0 Z" />
          <path d="M 0 0 Q -22 -10 -48 -25 Q -22 -10 0 0 Z" opacity="0.85" />
          <path d="M 0 0 Q 32 8 70 18 Q 36 8 0 0 Z" />
          <path d="M 0 0 Q -28 12 -56 28 Q -30 12 0 0 Z" opacity="0.85" />
        </g>
        {/* lower cluster */}
        <g transform="translate(102 510)">
          <path d="M 0 0 Q 32 -8 70 -22 Q 36 -10 0 0 Z" />
          <path d="M 0 0 Q -25 -8 -52 -20 Q -26 -8 0 0 Z" opacity="0.85" />
          <path d="M 0 0 Q 22 12 48 26 Q 24 12 0 0 Z" opacity="0.92" />
        </g>

        {/* small leaves on the back stalk */}
        <g transform="translate(55 320)" opacity="0.5">
          <path d="M 0 0 Q -18 -8 -38 -18 Q -18 -8 0 0 Z" />
          <path d="M 0 0 Q 16 -10 34 -22 Q 18 -10 0 0 Z" />
        </g>
      </g>
    </svg>
  );
}

function BambooRight({scroll}) {
  return (
    <svg
      className="v3-bamboo v3-bamboo--right"
      viewBox="0 0 280 240"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden
      style={{transform: `translate3d(0, ${scroll * -0.06}px, 0)`}}
    >
      {/* hanging branch with leaves, like the right side of the bamboo reference */}
      <g fill="#1a1614">
        {/* main thin branch arching down from upper right */}
        <path
          d="M 280 0 Q 240 30 200 70 Q 160 110 110 130 Q 70 145 30 160"
          stroke="#1a1614"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />
        {/* leaf clusters along the branch */}
        <g transform="translate(220 60)">
          <path d="M 0 0 Q -15 -18 -32 -32 Q -16 -16 0 0 Z" />
          <path d="M 0 0 Q 10 -20 18 -42 Q 8 -20 0 0 Z" />
          <path d="M 0 0 Q 22 -10 44 -18 Q 24 -10 0 0 Z" opacity="0.9" />
        </g>
        <g transform="translate(170 100)">
          <path d="M 0 0 Q -18 -15 -38 -30 Q -18 -16 0 0 Z" />
          <path d="M 0 0 Q -8 -22 -10 -45 Q -6 -24 0 0 Z" />
          <path d="M 0 0 Q 14 -18 28 -36 Q 14 -20 0 0 Z" opacity="0.9" />
          <path d="M 0 0 Q 24 -8 48 -14 Q 26 -8 0 0 Z" opacity="0.85" />
        </g>
        <g transform="translate(110 130)">
          <path d="M 0 0 Q -22 -10 -46 -22 Q -22 -10 0 0 Z" />
          <path d="M 0 0 Q -10 -22 -14 -46 Q -8 -22 0 0 Z" />
          <path d="M 0 0 Q 16 -14 32 -32 Q 16 -16 0 0 Z" opacity="0.9" />
        </g>
        <g transform="translate(60 152)" opacity="0.85">
          <path d="M 0 0 Q -20 -8 -42 -16 Q -20 -8 0 0 Z" />
          <path d="M 0 0 Q -8 -20 -10 -42 Q -6 -22 0 0 Z" />
        </g>
      </g>
    </svg>
  );
}

export default V3Home;
