import React from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import "./V3.css";

const SECTIONS = [
  {num: "壹", title: "Meals", zh: "餐", items: [
    {label: "Lunch",          zh: "午餐", desc: "Specials served 11–3 daily"},
    {label: "Dinner",         zh: "晚餐", desc: "Served with rice + soup option"},
    {label: "Chef's Specials", zh: "招牌", desc: "House dishes from our kitchen"},
  ]},
  {num: "貳", title: "Starters", zh: "前菜", items: [
    {label: "Appetizers", zh: "前菜", desc: "Spring rolls, dumplings, wings"},
    {label: "Soups",      zh: "湯",   desc: "Wonton, hot & sour, egg drop"},
  ]},
  {num: "叁", title: "Mains", zh: "主菜", items: [
    {label: "Sweet & Sour", zh: "糖醋", desc: "Crispy, sweet-chili lacquer"},
    {label: "Poultry",      zh: "禽",   desc: "Chicken — eight ways"},
    {label: "Beef",         zh: "牛肉", desc: "Mongolian, pepper, broccoli"},
    {label: "Pork",         zh: "豬肉", desc: "Sweet & sour, garlic, twice-cooked"},
    {label: "Seafood",      zh: "海鮮", desc: "Shrimp, scallops, fish"},
    {label: "Vegetable",    zh: "蔬菜", desc: "Buddha's delight, garlic greens"},
  ]},
  {num: "肆", title: "Noodles & Rice", zh: "麵 飯", items: [
    {label: "Lo Mein",       zh: "撈麵",  desc: "Soft hand-pulled noodles"},
    {label: "Chow Mein",     zh: "炒麵",  desc: "Crispy stir-fried noodles"},
    {label: "Fried Rice",    zh: "炒飯",  desc: "Wok-tossed with egg & scallion"},
    {label: "Egg Foo Young", zh: "芙蓉蛋", desc: "Egg pancakes in light gravy"},
  ]},
  {num: "伍", title: "Sides", zh: "小菜", items: [
    {label: "Sides", zh: "小菜", desc: "Egg rolls, crab rangoon, rice"},
  ]},
];

function V3Menu() {
  return (
    <div className="v3-root">
      <Helmet>
        <title>Menu — China Delight (v3)</title>
      </Helmet>

      <div className="v3-paper" aria-hidden />

      <header className="v3-nav-wrap">
        <nav className="v3-nav">
          <Link className="v3-wordmark" to="/v3">
            <span className="v3-wordmark-zh" aria-hidden>中國之逸</span>
            <span className="v3-wordmark-en">China Delight</span>
          </Link>
          <div className="v3-nav-links">
            <Link to="/v3">Home</Link>
            <Link className="v3-nav-cta" to="/v2/menu/dinner">Order</Link>
          </div>
        </nav>
      </header>

      <header className="v3-menu-header">
        {/* small red sun behind the title */}
        <div className="v3-menu-sun" aria-hidden>
          <span className="v3-sun-disc" />
        </div>
        <div className="v3-hero-eyebrow v3-eyebrow-center">
          <span className="v3-rule" /> The Menu
        </div>
        <h1 className="v3-menu-title">
          The full <em>menu,</em>
          <br />
          by section.
        </h1>
        <p className="v3-hero-zh v3-hero-zh--center">菜 單 · 用 心 烹 製</p>
      </header>

      <main className="v3-menu-main">
        {SECTIONS.map((section) => (
          <section className="v3-menu-section" key={section.title}>
            <header className="v3-section-head">
              <span className="v3-section-num">{section.num}</span>
              <h2 className="v3-section-title">{section.title}</h2>
              <span className="v3-section-zh" aria-hidden>{section.zh}</span>
              <span className="v3-section-rule" />
            </header>
            <ul className="v3-dish-list">
              {section.items.map((it) => (
                <li className="v3-dish" key={it.label}>
                  <Link to="/v2/menu/dinner" className="v3-dish-link">
                    <div className="v3-dish-main">
                      <span className="v3-dish-zh" aria-hidden>{it.zh}</span>
                      <h3 className="v3-dish-name">{it.label}</h3>
                    </div>
                    <span className="v3-dish-leader" aria-hidden />
                    <p className="v3-dish-note">{it.desc}</p>
                    <span className="v3-dish-go" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

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

export default V3Menu;
