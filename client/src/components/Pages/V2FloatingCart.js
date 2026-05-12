import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useCartContext} from "../CartContext";

/**
 * V2FloatingCart — fixed bottom-right pill that appears whenever the
 * cart has items. Hidden on /v2/cart, /v2/checkout, /v2/confirmation
 * (where it would be redundant).
 */
function V2FloatingCart() {
  const {cart} = useCartContext();
  const {pathname} = useLocation();
  const [pulse, setPulse] = useState(false);

  const count = cart.reduce((n, it) => n + it.quantity, 0);
  const total = cart.reduce((n, it) => n + it.cartUnitPrice * it.quantity, 0);

  // brief pulse animation whenever count changes upward
  useEffect(() => {
    if (count > 0) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 500);
      return () => clearTimeout(t);
    }
  }, [count]);

  const hidden =
    count === 0 ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/confirmation");

  if (hidden) return null;

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <Link
      to="/cart"
      className={`v2-fab-cart ${pulse ? "is-pulse" : ""}`}
      aria-label={`View cart, ${count} items, ${fmt.format(total)}`}
    >
      <span className="v2-fab-cart-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          width="20" height="20">
          <path d="M3 3h2l2.5 12.5a2 2 0 0 0 2 1.5h9a2 2 0 0 0 2-1.5L23 7H6" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
        <span className="v2-fab-cart-badge">{count}</span>
      </span>
      <span className="v2-fab-cart-body">
        <span className="v2-fab-cart-label">View cart</span>
        <span className="v2-fab-cart-total">{fmt.format(total)}</span>
      </span>
      <span className="v2-fab-cart-arrow" aria-hidden>→</span>
    </Link>
  );
}

export default V2FloatingCart;
