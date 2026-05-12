import React from "react";
import {Helmet} from "react-helmet";
import V2Wordmark from "./V2Wordmark";
import {Link} from "react-router-dom";
import {useCartContext} from "../CartContext";
import "./V2Home.css";
import "./V2Menu.css";

const SECTIONS = [
  {
    title: "Meals",
    zh: "餐",
    items: [
      {key: "lunch",      label: "Lunch",          zh: "午餐",  desc: "Specials served 11–3 daily"},
      {key: "dinner",     label: "Dinner",         zh: "晚餐",  desc: "Served with rice + soup option"},
      {key: "chef",       label: "Chef's Specials",zh: "招牌",  desc: "House dishes from our kitchen"},
    ],
  },
  {
    title: "Starters",
    zh: "前菜",
    items: [
      {key: "appetizers", label: "Appetizers",     zh: "前菜",  desc: "Spring rolls, dumplings, wings"},
      {key: "soups",      label: "Soups",          zh: "湯",    desc: "Wonton, hot & sour, egg drop"},
    ],
  },
  {
    title: "Mains",
    zh: "主菜",
    items: [
      {key: "sweet-sour", label: "Sweet & Sour",   zh: "糖醋",  desc: "Crispy, sweet-chili lacquer"},
      {key: "poultry",    label: "Poultry",        zh: "禽",    desc: "Chicken — eight ways"},
      {key: "beef",       label: "Beef",           zh: "牛肉",  desc: "Mongolian, pepper, broccoli"},
      {key: "pork",       label: "Pork",           zh: "豬肉",  desc: "Sweet & sour, garlic, twice-cooked"},
      {key: "seafood",    label: "Seafood",        zh: "海鮮",  desc: "Shrimp, scallops, fish"},
      {key: "vegetable",  label: "Vegetable",      zh: "蔬菜",  desc: "Buddha's delight, garlic greens"},
    ],
  },
  {
    title: "Noodles & Rice",
    zh: "麵 飯",
    items: [
      {key: "lo-mein",    label: "Lo Mein",        zh: "撈麵",  desc: "Soft hand-pulled noodles"},
      {key: "chow-mein",  label: "Chow Mein",      zh: "炒麵",  desc: "Crispy stir-fried noodles"},
      {key: "fried-rice", label: "Fried Rice",     zh: "炒飯",  desc: "Wok-tossed with egg and scallion"},
      {key: "egg-foo",    label: "Egg Foo Young",  zh: "芙蓉蛋", desc: "Egg pancakes in light gravy"},
    ],
  },
  {
    title: "Sides",
    zh: "小菜",
    items: [
      {key: "sides",      label: "Sides",          zh: "小菜",  desc: "Egg rolls, crab rangoon, rice"},
    ],
  },
];

function V2MenuIndex() {
  const {userCartCount} = useCartContext();

  return (
    <div className="v2-root v2-menu-root">
      <Helmet>
        <title>Menu — China Delight (v2)</title>
      </Helmet>

      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <Link className="v2-nav-cta v2-cart-pill" to="/cart">
              Cart
              {userCartCount > 0 && (
                <span className="v2-cart-badge">{userCartCount}</span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      <header className="v2-container v2-menu-header">
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          The Menu
        </div>
        <h1 className="v2-hero-title">
          <em>Pick</em> your section
        </h1>
        <p className="v2-hero-zh">菜 單 · 用 心 烹 製</p>
        <p className="v2-menu-lede">
          Browse the full menu by category. Tap any section to see dishes,
          prices, and customization options.
        </p>
      </header>

      <main className="v2-container v2-toc">
        {SECTIONS.map((section, si) => (
          <section className="v2-toc-section" key={section.title}>
            <header className="v2-toc-section-head">
              <span className="v2-toc-section-num">
                № {String(si + 1).padStart(2, "0")}
              </span>
              <span className="v2-toc-section-title">{section.title}</span>
              <span className="v2-toc-section-zh" aria-hidden>{section.zh}</span>
              <span className="v2-toc-section-rule" />
            </header>
            <ul className="v2-toc-list">
              {section.items.map((item) => (
                <li key={item.key}>
                  <Link
                    to={`/menu/${item.key}`}
                    className="v2-toc-item"
                  >
                    <span className="v2-toc-item-zh" aria-hidden>{item.zh}</span>
                    <span className="v2-toc-item-body">
                      <span className="v2-toc-item-label">{item.label}</span>
                      <span className="v2-toc-item-desc">{item.desc}</span>
                    </span>
                    <span className="v2-toc-item-arrow" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
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

export default V2MenuIndex;
