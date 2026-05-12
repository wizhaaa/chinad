import React, {useEffect, useState, useRef} from "react";
import {useCartContext} from "../CartContext";
import api from "../api";

/**
 * V2ItemDialog — modal for customizing a dinner item.
 * Mirrors the v1 DinnerDialog data contract so the resulting cart entry
 * is interchangeable: { title, cartUnitPrice, options, requestContent, quantity }
 */
function V2ItemDialog({item, category, onClose}) {
  const {addNewItem} = useCartContext();
  const dialogRef = useRef(null);

  // category config (falls back to a generic shape if missing)
  const cat = category || {type: "Item", label: "Item", sizing: "fixed"};

  // ---- SIZING ---------------------------------------------------------
  // Determine if this specific item is sized (has priceSm/priceLg) or fixed.
  // "either" means the item itself decides: if `price` is set & non-null
  // it's fixed; otherwise sized.
  const itemHasFixed = item.price !== null && item.price !== undefined && item.price !== "";
  const itemHasSized = item.priceSm !== null && item.priceSm !== undefined;
  let isSized =
    cat.sizing === "sized" ||
    (cat.sizing === "either" && !itemHasFixed && itemHasSized);
  // Yat Gai Mei is the one soup that doesn't get a size picker
  // (the v1 dialog hides it; the meat picker takes its place).
  if (cat.soupYatGaiMei && /yat\s*gai\s*mei/i.test(item.name || "")) {
    isSized = false;
  }

  // ---- WHICH PICKERS TO SHOW -----------------------------------------
  const isDumplings = cat.appetizerDumplings && /dumpling/i.test(item.name || "");
  const isYatGaiMei = cat.soupYatGaiMei && /yat\s*gai\s*mei/i.test(item.name || "");
  // Dinner protein picker only fires for these specific dishes when bought as a dinner/lunch
  const dinnerProteinDishes = ["Egg Foo Young", "Lo Mein", "Fried Rice", "Chow Mein"];
  const showDinnerProtein = cat.dinnerProtein && dinnerProteinDishes.includes(item.name);
  // Yat Gai Mei suppresses the size picker (v1 behavior)
  const isPoultrySauce = cat.poultrySauce && /chicken w\.?\s*mixed vegetables/i.test(item.name || "");
  const isSeafoodSauce = cat.seafoodSauce && /(white|brown)\s*sauce/i.test(item.name || "");

  const showRice = !!cat.rice;
  const showSide = cat.side === "soup";
  const showCmStyle = cat.chowMeinStyle === true;

  // ---- STATE ----------------------------------------------------------
  const [size, setSize] = useState("Pint");
  const [riceValue, setRiceValue] = useState("White Rice");
  const [sideValue, setSideValue] = useState("None");
  const [meatValue, setMeatValue] = useState("Chicken");
  const [cmStyle, setCmStyle] = useState("Chow Mein");
  const [poultrySauce, setPoultrySauce] = useState("Brown Sauce");
  const [seafoodSauce, setSeafoodSauce] = useState("White Sauce");
  // Appetizer dumpling state
  const [dumplingStyle, setDumplingStyle] = useState("Fried");
  const [dumplingFilling, setDumplingFilling] = useState("Pork");
  const [requestContent, setRequestContent] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [imgBroken, setImgBroken] = useState(!item.img);

  // reviews
  const [reviews, setReviews] = useState(item.reviews || []);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // ---- PRICE MATH (mirrors each v1 dialog's logic) -------------------
  // base price: sized items use priceSm/priceLg; fixed items use price
  const basePrice = isSized
    ? Number(size === "Quart" ? item.priceLg : item.priceSm) || 0
    : Number(item.price) || 0;

  // rice upcharge per category type
  let riceUpcharge = 0;
  if (showRice) {
    if (cat.rice === "dinner") {
      // White Rice + Fried Rice: free; Lo Mein / Pork Fried Rice: +$2
      if (riceValue === "Lo Mein" || riceValue === "Pork Fried Rice") riceUpcharge = 2;
    } else if (cat.rice === "fried-only") {
      // Chef / Diet / EFY / Mu Shu: flat +$1.50
      if (riceValue === "Fried Rice") riceUpcharge = 1.5;
    } else if (cat.rice === "fried-cm") {
      // Chow Mein: Fried Rice +$1 pint, +$1.50 quart (always sized)
      if (riceValue === "Fried Rice") riceUpcharge = size === "Quart" ? 1.5 : 1;
    } else if (cat.rice === "fried-sized") {
      // Beef/Pork/Poultry/Seafood/Vegetable:
      //   fixed-price item: +$1.50
      //   sized + Pint:    +$1.00
      //   sized + Quart:   +$1.50
      if (riceValue === "Fried Rice") {
        if (!isSized) riceUpcharge = 1.5;
        else if (size === "Quart") riceUpcharge = 1.5;
        else riceUpcharge = 1;
      }
    }
  }

  // side (soup): None free; any soup +$1.50
  const sideUpcharge = showSide && sideValue !== "None" ? 1.5 : 0;

  // appetizer-dumpling chicken filling: +$2.50
  const dumplingUpcharge =
    isDumplings && dumplingFilling === "Chicken" ? 2.5 : 0;

  const unitPrice = basePrice + riceUpcharge + sideUpcharge + dumplingUpcharge;
  const lineTotal = unitPrice * quantity;

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // close on escape, lock body scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleAdd = () => {
    const options = {type: cat.type};
    if (isSized) options.size = size;
    if (showRice) options.riceValue = riceValue;
    if (showSide) options.sideValue = sideValue;
    if (showCmStyle) options.style = cmStyle;
    if (showDinnerProtein) options.meatValue = meatValue;
    if (isYatGaiMei) options.meatValue = meatValue;
    if (isPoultrySauce) options.sauceValue = poultrySauce;
    if (isSeafoodSauce) options.sauceValue = seafoodSauce;
    if (isDumplings) {
      options.dumplingStyle = dumplingStyle;
      options.dumplingFilling = dumplingFilling;
    }
    addNewItem({
      title: item.name,
      cartUnitPrice: unitPrice,
      options,
      requestContent,
      quantity,
    });
    setAdded(true);
    setTimeout(() => onClose(), 700);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + Number(r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewRating) {
      setReviewError("Please pick a star rating.");
      return;
    }
    if (!reviewName.trim()) {
      setReviewError("Please add your name.");
      return;
    }
    setReviewError("");
    setReviewSubmitting(true);
    const newReview = {
      name: reviewName.trim(),
      rating: reviewRating,
      reviewContent: reviewText.trim(),
    };
    // optimistic update — show the review locally even if the API call fails
    setReviews((rs) => [newReview, ...rs]);
    try {
      // best-effort: post to the same endpoint v1 uses if it exists.
      // if it 404s we still keep the optimistic local state.
      await api.post(`/api/dinners/${item._id}/review`, newReview).catch(() => {});
    } finally {
      setReviewSubmitting(false);
      setShowReviewForm(false);
      setReviewName("");
      setReviewRating(0);
      setReviewText("");
    }
  };

  return (
    <div
      className="v2-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="v2-modal" ref={dialogRef} role="dialog" aria-modal="true">
        <button className="v2-modal-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" width="22" height="22">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="v2-modal-img">
          {!imgBroken ? (
            <img
              src={item.img}
              alt={item.name}
              onError={() => setImgBroken(true)}
            />
          ) : (
            <div className="v2-modal-img-placeholder">
              <span className="v2-modal-img-ph-name">{item.name}</span>
            </div>
          )}
        </div>

        <div className="v2-modal-body">
          <div className="v2-eyebrow">
            <span className="v2-eyebrow-rule" />
            {cat.label}
          </div>
          <h2 className="v2-modal-title">{item.name}</h2>
          {avgRating && (
            <div className="v2-modal-rating" aria-label={`${avgRating} out of 5 stars`}>
              <Stars value={Number(avgRating)} size={14} />
              <span className="v2-modal-rating-num">{avgRating}</span>
              <span className="v2-modal-rating-count">
                ({reviews.length} review{reviews.length === 1 ? "" : "s"})
              </span>
            </div>
          )}
          <p className="v2-modal-desc">{item.description}</p>

          {/* SIZE — for sized items, show Pint/Quart with their actual prices */}
          {isSized && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Size</label>
              <div className="v2-chip-row">
                <Chip
                  active={size === "Pint"}
                  onClick={() => setSize("Pint")}
                  label="Pint"
                  hint={item.priceSm != null ? fmt.format(Number(item.priceSm)) : ""}
                />
                {item.priceLg != null && (
                  <Chip
                    active={size === "Quart"}
                    onClick={() => setSize("Quart")}
                    label="Quart"
                    hint={fmt.format(Number(item.priceLg))}
                  />
                )}
              </div>
            </div>
          )}

          {/* RICE */}
          {showRice && cat.rice === "dinner" && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Rice</label>
              <div className="v2-chip-row">
                <Chip active={riceValue === "White Rice"} onClick={() => setRiceValue("White Rice")} label="White Rice" />
                <Chip active={riceValue === "Fried Rice"} onClick={() => setRiceValue("Fried Rice")} label="Fried Rice" />
                <Chip active={riceValue === "Pork Fried Rice"} onClick={() => setRiceValue("Pork Fried Rice")} label="Pork Fried Rice" hint="+$2.00" />
                <Chip active={riceValue === "Lo Mein"} onClick={() => setRiceValue("Lo Mein")} label="Lo Mein" hint="+$2.00" />
              </div>
            </div>
          )}
          {showRice && cat.rice === "fried-only" && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Rice</label>
              <div className="v2-chip-row">
                <Chip active={riceValue === "White Rice"} onClick={() => setRiceValue("White Rice")} label="White Rice" />
                <Chip active={riceValue === "Fried Rice"} onClick={() => setRiceValue("Fried Rice")} label="Fried Rice" hint="+$1.50" />
              </div>
            </div>
          )}
          {showRice && cat.rice === "fried-cm" && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Rice</label>
              <div className="v2-chip-row">
                <Chip active={riceValue === "White Rice"} onClick={() => setRiceValue("White Rice")} label="White Rice" />
                <Chip
                  active={riceValue === "Fried Rice"}
                  onClick={() => setRiceValue("Fried Rice")}
                  label="Fried Rice"
                  hint={size === "Quart" ? "+$1.50" : "+$1.00"}
                />
              </div>
            </div>
          )}

          {showRice && cat.rice === "fried-sized" && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Rice</label>
              <div className="v2-chip-row">
                <Chip active={riceValue === "White Rice"} onClick={() => setRiceValue("White Rice")} label="White Rice" />
                <Chip
                  active={riceValue === "Fried Rice"}
                  onClick={() => setRiceValue("Fried Rice")}
                  label="Fried Rice"
                  hint={!isSized ? "+$1.50" : (size === "Quart" ? "+$1.50" : "+$1.00")}
                />
              </div>
            </div>
          )}

          {/* SAUCE — Poultry's "Chicken w. Mixed Vegetables" */}
          {isPoultrySauce && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Sauce</label>
              <div className="v2-chip-row">
                <Chip active={poultrySauce === "Brown Sauce"} onClick={() => setPoultrySauce("Brown Sauce")} label="Brown Sauce" />
                <Chip active={poultrySauce === "White Sauce"} onClick={() => setPoultrySauce("White Sauce")} label="White Sauce" />
              </div>
            </div>
          )}

          {/* SAUCE — certain Seafood items */}
          {isSeafoodSauce && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Sauce</label>
              <div className="v2-chip-row">
                <Chip active={seafoodSauce === "White Sauce"} onClick={() => setSeafoodSauce("White Sauce")} label="White Sauce" />
                <Chip active={seafoodSauce === "Brown Sauce"} onClick={() => setSeafoodSauce("Brown Sauce")} label="Brown Sauce" />
              </div>
            </div>
          )}

          {/* SIDE — soup picker for dinners */}
          {showSide && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Add a soup</label>
              <div className="v2-chip-row">
                <Chip active={sideValue === "None"} onClick={() => setSideValue("None")} label="None" />
                <Chip active={sideValue === "Wonton Soup"} onClick={() => setSideValue("Wonton Soup")} label="Wonton" hint="+$1.50" />
                <Chip active={sideValue === "Egg Drop Soup"} onClick={() => setSideValue("Egg Drop Soup")} label="Egg Drop" hint="+$1.50" />
                <Chip active={sideValue === "Hot & Sour Soup"} onClick={() => setSideValue("Hot & Sour Soup")} label="Hot & Sour" hint="+$1.50" />
              </div>
            </div>
          )}

          {/* CHOW MEIN STYLE */}
          {showCmStyle && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Style</label>
              <div className="v2-chip-row">
                <Chip active={cmStyle === "Chow Mein"} onClick={() => setCmStyle("Chow Mein")} label="Chow Mein" />
                <Chip active={cmStyle === "Chop Suey"} onClick={() => setCmStyle("Chop Suey")} label="Chop Suey" />
              </div>
            </div>
          )}

          {/* DINNER PROTEIN — only for EFY/Lo Mein/Fried Rice/Chow Mein dinners */}
          {showDinnerProtein && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Protein</label>
              <div className="v2-chip-row">
                {["Chicken", "Pork", "Shrimp", "Beef", "Combo"].map((opt) => (
                  <Chip key={opt} active={meatValue === opt} onClick={() => setMeatValue(opt)} label={opt} />
                ))}
              </div>
            </div>
          )}

          {/* YAT GAI MEI SOUP — meat picker */}
          {isYatGaiMei && (
            <div className="v2-modal-section">
              <label className="v2-modal-label">Protein</label>
              <div className="v2-chip-row">
                {["Chicken", "Pork", "Shrimp", "Beef"].map((opt) => (
                  <Chip key={opt} active={meatValue === opt} onClick={() => setMeatValue(opt)} label={opt} />
                ))}
              </div>
            </div>
          )}

          {/* DUMPLINGS — style + filling */}
          {isDumplings && (
            <>
              <div className="v2-modal-section">
                <label className="v2-modal-label">Style</label>
                <div className="v2-chip-row">
                  <Chip active={dumplingStyle === "Fried"} onClick={() => setDumplingStyle("Fried")} label="Fried" />
                  <Chip active={dumplingStyle === "Steamed"} onClick={() => setDumplingStyle("Steamed")} label="Steamed" />
                </div>
              </div>
              <div className="v2-modal-section">
                <label className="v2-modal-label">Filling</label>
                <div className="v2-chip-row">
                  <Chip active={dumplingFilling === "Pork"} onClick={() => setDumplingFilling("Pork")} label="Pork" />
                  <Chip active={dumplingFilling === "Vegetable"} onClick={() => setDumplingFilling("Vegetable")} label="Vegetable" />
                  <Chip active={dumplingFilling === "Chicken"} onClick={() => setDumplingFilling("Chicken")} label="Chicken" hint="+$2.50" />
                </div>
              </div>
            </>
          )}

          <div className="v2-modal-section">
            <label className="v2-modal-label" htmlFor="v2-req">
              Special requests
            </label>
            <textarea
              id="v2-req"
              className="v2-modal-textarea"
              maxLength={250}
              rows={3}
              placeholder="Extra sauce, no peanuts, etc."
              value={requestContent}
              onChange={(e) => setRequestContent(e.target.value)}
            />
          </div>

          {/* === REVIEWS === collapsible, closed by default */}
          <div className={`v2-modal-section v2-modal-reviews ${reviewsOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="v2-modal-reviews-toggle"
              onClick={() => setReviewsOpen((o) => !o)}
              aria-expanded={reviewsOpen}
              aria-controls="v2-reviews-content"
            >
              <span className="v2-modal-label">
                Reviews {reviews.length > 0 && `(${reviews.length})`}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                width="16" height="16" className="v2-modal-reviews-chev" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {reviewsOpen && (
            <div id="v2-reviews-content" className="v2-modal-reviews-body">
              {!showReviewForm && (
                <button
                  type="button"
                  className="v2-modal-review-toggle"
                  onClick={() => setShowReviewForm(true)}
                >
                  + Leave a review
                </button>
              )}

            {showReviewForm && (
              <form className="v2-review-form" onSubmit={handleReviewSubmit}>
                <div className="v2-review-stars" role="radiogroup" aria-label="Your rating">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`v2-review-star ${
                        (reviewHover || reviewRating) >= n ? "is-on" : ""
                      }`}
                      onMouseEnter={() => setReviewHover(n)}
                      onMouseLeave={() => setReviewHover(0)}
                      onClick={() => setReviewRating(n)}
                      aria-label={`${n} star${n === 1 ? "" : "s"}`}
                      aria-pressed={reviewRating === n}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  className="v2-review-name"
                  placeholder="Your name"
                  maxLength={60}
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                />
                <textarea
                  className="v2-modal-textarea"
                  rows={2}
                  maxLength={400}
                  placeholder="What did you think? (optional)"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                {reviewError && (
                  <div className="v2-form-error" role="alert">{reviewError}</div>
                )}
                <div className="v2-review-form-actions">
                  <button
                    type="button"
                    className="v2-review-cancel"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewError("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="v2-review-submit"
                    disabled={reviewSubmitting}
                  >
                    {reviewSubmitting ? "Posting…" : "Post review"}
                  </button>
                </div>
              </form>
            )}

            {reviews.length > 0 ? (
              <ul className="v2-review-list">
                {reviews.slice(0, 5).map((r, i) => (
                  <li key={i} className="v2-review">
                    <div className="v2-review-head">
                      <span className="v2-review-name-display">{r.name}</span>
                      <Stars value={Number(r.rating || 0)} size={12} />
                    </div>
                    {r.reviewContent && (
                      <p className="v2-review-text">{r.reviewContent}</p>
                    )}
                  </li>
                ))}
                {reviews.length > 5 && (
                  <li className="v2-review-more">
                    + {reviews.length - 5} more review{reviews.length - 5 === 1 ? "" : "s"}
                  </li>
                )}
              </ul>
            ) : !showReviewForm && (
              <p className="v2-review-empty">No reviews yet — be the first.</p>
            )}
            </div>
            )}
          </div>
        </div>

        <div className="v2-modal-foot">
          <div className="v2-qty">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >−</button>
            <span>{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            >+</button>
          </div>

          <button
            className={`v2-modal-add ${added ? "is-added" : ""}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  width="16" height="16">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Added
              </>
            ) : (
              <>
                Add to cart
                <span className="v2-modal-add-price">{fmt.format(lineTotal)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stars({value, size = 14}) {
  // 5 stars, fill proportional to `value` (e.g. 4.6 -> first 4 full, 5th 60%)
  return (
    <span className="v2-stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span key={n} className="v2-star" style={{width: size, height: size}}>
            <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}
              className="v2-star-bg">
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
            </svg>
            <span className="v2-star-fill" style={{width: `${fill * 100}%`}}>
              <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
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

export default V2ItemDialog;
