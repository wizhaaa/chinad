import React from "react";
import {Helmet} from "react-helmet";
import V2Wordmark from "./V2Wordmark";
import {Link, useHistory} from "react-router-dom";
import {useCartContext} from "../CartContext";
import "./V2Home.css";
import "./V2Menu.css";

const TAX_RATE = 0.06;

function V2Cart() {
  const {cart, setCart} = useCartContext();
  const history = useHistory();

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.cartUnitPrice * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const updateQty = (idx, next) => {
    setCart(
      cart.map((it, i) =>
        i === idx ? {...it, quantity: Math.max(1, next)} : it
      )
    );
  };

  const removeAt = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const clear = () => setCart([]);

  return (
    <div className="v2-root v2-menu-root">
      <Helmet>
        <title>Cart — China Delight (v2)</title>
      </Helmet>

      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <Link to="/menu">Menu</Link>
          </div>
        </nav>
      </div>

      <main className="v2-container v2-cart-main">
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          Your order
        </div>
        <h1 className="v2-hero-title">
          <em>Cart</em>
        </h1>

        {cart.length === 0 ? (
          <div className="v2-cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              width="48" height="48">
              <path d="M3 3h2l2.5 12.5a2 2 0 0 0 2 1.5h9a2 2 0 0 0 2-1.5L23 7H6" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <h2>Your cart is empty</h2>
            <p>Pick a dish to get started.</p>
            <Link className="v2-cta-primary" to="/menu/dinner">
              Browse Dinner
            </Link>
          </div>
        ) : (
          <div className="v2-cart-grid">
            <div className="v2-cart-items">
              {cart.map((item, i) => {
                const lineTotal = item.cartUnitPrice * item.quantity;
                const optionEntries = Object.entries(item.options || {})
                  .filter(([k]) => k !== "type");
                return (
                  <article className="v2-cart-row" key={`${item.title}-${i}`}>
                    <div className="v2-cart-row-body">
                      <div className="v2-cart-row-head">
                        <h3>{item.title}</h3>
                        <span className="v2-cart-row-line">{fmt.format(lineTotal)}</span>
                      </div>

                      {optionEntries.length > 0 && (
                        <ul className="v2-cart-row-opts">
                          {optionEntries.map(([k, v]) => (
                            <li key={k}>
                              <span>{labelize(k)}</span>
                              <span>{v}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.requestContent && (
                        <div className="v2-cart-row-note">
                          <em>Note:</em> {item.requestContent}
                        </div>
                      )}

                      <div className="v2-cart-row-foot">
                        <div className="v2-qty v2-qty--sm">
                          <button
                            aria-label="Decrease"
                            onClick={() => updateQty(i, item.quantity - 1)}
                          >−</button>
                          <span>{item.quantity}</span>
                          <button
                            aria-label="Increase"
                            onClick={() => updateQty(i, item.quantity + 1)}
                          >+</button>
                        </div>
                        <button
                          className="v2-cart-row-remove"
                          onClick={() => removeAt(i)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              <button className="v2-cart-clear" onClick={clear}>
                Clear cart
              </button>
            </div>

            <aside className="v2-cart-summary">
              <h3>Order summary</h3>
              <div className="v2-cart-summary-row">
                <span>Subtotal</span>
                <span>{fmt.format(subtotal)}</span>
              </div>
              <div className="v2-cart-summary-row">
                <span>Tax (6%)</span>
                <span>{fmt.format(tax)}</span>
              </div>
              <div className="v2-cart-summary-rule" />
              <div className="v2-cart-summary-row v2-cart-summary-total">
                <span>Total</span>
                <span>{fmt.format(total)}</span>
              </div>

              <button
                className="v2-cta-primary v2-cart-checkout"
                onClick={() => history.push("/checkout")}
              >
                Checkout →
              </button>

              <Link className="v2-cta-text v2-cart-back" to="/menu/dinner">
                ← Add more items
              </Link>

              <p className="v2-cart-note">
                Carryout & dine-in only. We don't deliver.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function labelize(key) {
  return ({
    riceValue: "Rice",
    sideValue: "Side",
    meatValue: "Protein",
  })[key] || key;
}

export default V2Cart;
