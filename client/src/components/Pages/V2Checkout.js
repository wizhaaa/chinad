import React, {useState} from "react";
import {Helmet} from "react-helmet";
import V2Wordmark from "./V2Wordmark";
import {Link, useHistory} from "react-router-dom";
import {useCartContext} from "../CartContext";
import {renderEmail} from "react-html-email";
import api from "../api";
import MyEmail from "./MyEmail";
import Paypal from "./Paypal";
import "./V2Home.css";
import "./V2Menu.css";

const TAX_RATE = 0.06;

function V2Checkout() {
  const {cart, setCart, setPrevOrder, orderPaid} = useCartContext();
  const history = useHistory();

  const [step, setStep] = useState(1); // 1 = info, 2 = payment
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("ASAP");
  const [customTime, setCustomTime] = useState("18:00");
  const [notes, setNotes] = useState("");
  const [showPaypal, setShowPaypal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const subtotal = cart.reduce(
    (sum, it) => sum + it.cartUnitPrice * it.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const buildOrder = (paymentMethod) => ({
    name,
    email,
    phone,
    pickUpOption: pickup,
    pickUpTime: pickup === "custom time" ? customTime : undefined,
    cart,
    orderReqs: notes,
    total,
    timePlaced: new Date().toString(),
    estimatedTime: estimatePickup(pickup, customTime),
    paymentMethod,
    amountPaid: paymentMethod === "Paid Online" ? total + 1.15 : 0,
    deviceType: detectDevice(),
  });

  const sendEmail = async (order) => {
    const messageHtml = renderEmail(<MyEmail order={order} />);
    const response = await api.post("/api/send", {
      name: order.name,
      email: order.email,
      messageHtml,
    });
    return response.data?.msg === "success";
  };

  const submitInPerson = async () => {
    if (!name || !email || !phone) {
      setErrMsg("Please fill out all required fields.");
      return;
    }
    if (cart.length === 0) {
      setErrMsg("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    setErrMsg("");
    const order = buildOrder("In Person");
    try {
      await api.post("/api/order/add", order).catch(() => {});
      window.localStorage.setItem("order", JSON.stringify(order));
      const ok = await sendEmail(order);
      setPrevOrder(order);
      setCart([]);
      if (ok) {
        history.push("/confirmation");
      } else {
        setErrMsg("Order submitted but the confirmation email failed. Please call us to confirm.");
      }
    } catch (e) {
      setErrMsg("Something went wrong. Please call us at 410-877-9490.");
    } finally {
      setSubmitting(false);
    }
  };

  const goToPayment = (e) => {
    e?.preventDefault();
    if (!name || !email || !phone) {
      setErrMsg("Please fill out all required fields.");
      return;
    }
    if (emailError || phoneError) {
      setErrMsg("Please fix the errors above before continuing.");
      return;
    }
    if (cart.length === 0) {
      setErrMsg("Your cart is empty.");
      return;
    }
    setErrMsg("");
    setStep(2);
  };

  return (
    <div className="v2-root v2-menu-root">
      <Helmet>
        <title>Checkout — China Delight (v2)</title>
      </Helmet>

      <div className="v2-container v2-stickybar">
        <nav className="v2-nav">
          <V2Wordmark to="/" />
          <div className="v2-nav-links v2-nav-links--desktop">
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </nav>
      </div>

      <main className="v2-container v2-cart-main">
        <div className="v2-eyebrow">
          <span className="v2-eyebrow-rule" />
          {step === 1 ? "Step 1 of 2 · Your details" : "Step 2 of 2 · Payment"}
        </div>
        <h1 className="v2-hero-title">
          <em>Checkout</em>
        </h1>

        <div className="v2-cart-grid">
          <div className="v2-cart-items">
            {step === 1 ? (
              <form className="v2-form" onSubmit={goToPayment}>
                <div className="v2-form-section">
                  <h3>Contact</h3>
                  <Field label="Name" required>
                    <input
                      type="text"
                      autoComplete="name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      placeholder="Sun Tzu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <div className="v2-form-row">
                    <Field label="Email" required error={emailError}>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        enterKeyHint="next"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        onBlur={() => {
                          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                            setEmailError("Please enter a valid email address.");
                          }
                        }}
                        required
                      />
                    </Field>
                    <Field label="Phone" required error={phoneError}>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        enterKeyHint="next"
                        placeholder="410-877-9490"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        onBlur={() => {
                          const digits = phone.replace(/\D/g, "");
                          if (phone && digits.length < 10) {
                            setPhoneError("Please enter a 10-digit phone number.");
                          }
                        }}
                        required
                      />
                    </Field>
                  </div>
                </div>

                <div className="v2-form-section">
                  <h3>Pickup time</h3>
                  <div className="v2-chip-row">
                    <Chip
                      active={pickup === "ASAP"}
                      onClick={() => setPickup("ASAP")}
                      label="ASAP"
                      hint="≈ 30–40 min"
                    />
                    <Chip
                      active={pickup === "custom time"}
                      onClick={() => setPickup("custom time")}
                      label="Schedule"
                    />
                  </div>
                  {pickup === "custom time" && (
                    <Field label="Pick up at">
                      <input
                        type="time"
                        step={300}
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                      />
                    </Field>
                  )}
                </div>

                <div className="v2-form-section">
                  <h3>Special requests</h3>
                  <textarea
                    className="v2-modal-textarea"
                    rows={3}
                    maxLength={250}
                    placeholder="Allergies, dietary needs, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p className="v2-form-hint">
                    Extra meat / sauce / etc. may incur a small in-store charge.
                  </p>
                </div>

                {errMsg && <div className="v2-form-error">{errMsg}</div>}

                <button type="submit" className="v2-cta-primary v2-form-next">
                  Continue to payment →
                </button>
              </form>
            ) : (
              <div className="v2-form">
                <button
                  className="v2-form-back"
                  onClick={() => setStep(1)}
                  type="button"
                >
                  <span className="v2-form-back-arrow" aria-hidden>←</span>
                  Back to details
                </button>

                <div className="v2-form-section">
                  <h3>Pay in person</h3>
                  <p className="v2-form-hint">
                    Place the order now and pay when you pick up.
                  </p>
                  <button
                    className="v2-cta-primary"
                    onClick={submitInPerson}
                    disabled={submitting}
                    type="button"
                  >
                    {submitting ? "Submitting…" : `Place order · ${fmt.format(total)}`}
                  </button>
                </div>

                <div className="v2-form-divider"><span>or</span></div>

                <div className="v2-form-section">
                  <h3>Pay online with PayPal</h3>
                  <p className="v2-form-hint">
                    A small <strong>$1.15</strong> service fee applies. We don't
                    deliver — PayPal may collect a shipping address but we'll
                    ignore it.
                  </p>

                  {orderPaid ? (
                    <div className="v2-form-success">
                      ✓ Paid {fmt.format(amountPaid)} (includes $1.15 fee)
                    </div>
                  ) : !showPaypal ? (
                    <button
                      type="button"
                      className="v2-paypal-show"
                      onClick={() => setShowPaypal(true)}
                    >
                      <span className="v2-paypal-show-icon" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                          width="18" height="18">
                          <rect x="3" y="6" width="18" height="13" rx="2" />
                          <path d="M3 10h18" />
                          <path d="M7 15h2" />
                        </svg>
                      </span>
                      <span className="v2-paypal-show-body">
                        <span className="v2-paypal-show-label">Pay online with PayPal</span>
                        <span className="v2-paypal-show-sub">Credit, debit, or PayPal balance</span>
                      </span>
                      <span className="v2-paypal-show-arrow" aria-hidden>→</span>
                    </button>
                  ) : (
                    <div className="v2-paypal-wrap">
                      <Paypal
                        orderTotal={total}
                        cart={cart}
                        order={buildOrder("Paid Online")}
                        setAmountPaid={setAmountPaid}
                        sendEmail={async () => {
                          const order = buildOrder("Paid Online");
                          await sendEmail(order);
                          setTimeout(() => history.push("/confirmation"), 200);
                        }}
                        setPrevOrder={setPrevOrder}
                        setCart={setCart}
                        setBackdrop={() => {}}
                        handleClose={() => {}}
                        setPaymentMethod={() => {}}
                        setFinalPage={() => {}}
                        setPaymentPage={() => {}}
                      />
                    </div>
                  )}
                </div>

                {errMsg && <div className="v2-form-error">{errMsg}</div>}
              </div>
            )}
          </div>

          <aside className="v2-cart-summary">
            <h3>Order summary</h3>
            {cart.map((it, i) => (
              <div className="v2-cart-summary-row" key={i}>
                <span>{it.quantity}× {it.title}</span>
                <span>{fmt.format(it.cartUnitPrice * it.quantity)}</span>
              </div>
            ))}
            <div className="v2-cart-summary-rule" />
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
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({label, required, error, children}) {
  return (
    <label className={`v2-field ${error ? "has-error" : ""}`}>
      <span>
        {label}
        {required && <em>*</em>}
      </span>
      {children}
      {error && <span className="v2-field-error" role="alert">{error}</span>}
    </label>
  );
}

function Chip({active, onClick, label, hint}) {
  return (
    <button
      type="button"
      className={`v2-chip ${active ? "is-active" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {hint && <span className="v2-chip-hint">{hint}</span>}
    </button>
  );
}

function detectDevice() {
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    ? "mobile" : "desktop";
}

function estimatePickup(option, customTime) {
  if (option === "custom time") return customTime;
  const now = new Date();
  const busy =
    now.getDay() >= 4 && now.getDay() <= 6 &&
    now.getHours() >= 16 && now.getHours() < 20;
  const ms = busy ? 60 * 60 * 1000 : 40 * 60 * 1000;
  const t = new Date(now.getTime() + ms);
  let h = t.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")} ${ap}`;
}

export default V2Checkout;
