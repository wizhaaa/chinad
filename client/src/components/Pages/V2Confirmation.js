import React from "react";
import {Helmet} from "react-helmet";
import V2Wordmark from "./V2Wordmark";
import {Link} from "react-router-dom";
import {useCartContext} from "../CartContext";
import "./V2Home.css";
import "./V2Menu.css";

function V2Confirmation() {
  const {prevOrder} = useCartContext();
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className="v2-root v2-menu-root">
      <Helmet>
        <title>Order confirmed — China Delight (v2)</title>
      </Helmet>

      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
        </nav>
      </div>

      <main className="v2-container v2-confirm">
        <div className="v2-confirm-seal">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
            width="36" height="36">
            <path d="M16 32l12 12 20-26" />
          </svg>
        </div>
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          Order received
        </div>
        <h1 className="v2-hero-title">
          <em>Thank you</em>, friend.
        </h1>
        <p className="v2-hero-zh">多 謝 光 顧</p>
        <p className="v2-hero-lede">
          We're prepping your order. A confirmation has been sent to your
          email. If you scheduled a pickup time, please come by then; otherwise
          give us about 30–40 minutes (an hour during dinner rush).
        </p>

        {/* static order stepper — roadmap of what happens next */}
        <ol className="v2-stepper" aria-label="Order progress">
          <li className="v2-step is-active" aria-current="step">
            <span className="v2-step-dot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                width="14" height="14" aria-hidden>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <span className="v2-step-label">Order received</span>
          </li>
          <li className="v2-step">
            <span className="v2-step-dot" aria-hidden>2</span>
            <span className="v2-step-label">Firing up the wok</span>
          </li>
          <li className="v2-step">
            <span className="v2-step-dot" aria-hidden>3</span>
            <span className="v2-step-label">Ready for pickup</span>
          </li>
          <li className="v2-step">
            <span className="v2-step-dot" aria-hidden>4</span>
            <span className="v2-step-label">Enjoy</span>
          </li>
        </ol>

        {prevOrder?.estimatedTime && (
          <div className="v2-confirm-pickup">
            Estimated pickup{" "}
            <strong>{prevOrder.estimatedTime}</strong>
          </div>
        )}

        {prevOrder && (
          <div className="v2-confirm-summary">
            <h3>What you ordered</h3>
            <ul className="v2-confirm-items">
              {(prevOrder.cart || []).map((it, i) => {
                const opts = Object.entries(it.options || {})
                  .filter(([k]) => k !== "type");
                return (
                  <li className="v2-confirm-item" key={i}>
                    <div className="v2-confirm-item-head">
                      <span className="v2-confirm-item-qty">{it.quantity}×</span>
                      <span className="v2-confirm-item-name">{it.title}</span>
                      <span className="v2-confirm-item-line">
                        {fmt.format(it.cartUnitPrice * it.quantity)}
                      </span>
                    </div>
                    {opts.length > 0 && (
                      <ul className="v2-confirm-item-opts">
                        {opts.map(([k, v]) => (
                          <li key={k}>
                            <span>{labelize(k)}</span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {it.requestContent && (
                      <div className="v2-confirm-item-note">
                        <em>Note:</em> {it.requestContent}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="v2-cart-summary-rule" />
            <div className="v2-cart-summary-row v2-cart-summary-total">
              <span>Total</span>
              <span>{fmt.format(prevOrder.total)}</span>
            </div>
            {prevOrder.estimatedTime && (
              <div className="v2-cart-summary-row">
                <span>Estimated pickup</span>
                <span>{prevOrder.estimatedTime}</span>
              </div>
            )}
            {prevOrder.paymentMethod && (
              <div className="v2-cart-summary-row">
                <span>Payment</span>
                <span>{prevOrder.paymentMethod}</span>
              </div>
            )}
            {prevOrder.orderReqs && (
              <div className="v2-confirm-orderreq">
                <strong>Order note:</strong> {prevOrder.orderReqs}
              </div>
            )}
          </div>
        )}

        <div className="v2-cta-row">
          <Link className="v2-cta-primary" to="/menu/dinner">
            Order again
          </Link>
          <a className="v2-cta-text" href="tel:4108779490">
            Call the kitchen → 410.877.9490
          </a>
        </div>
      </main>
    </div>
  );
}

function labelize(key) {
  return ({
    riceValue: "Rice",
    sideValue: "Side",
    meatValue: "Protein",
    size: "Size",
  })[key] || key;
}

export default V2Confirmation;
