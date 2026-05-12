import React, {useState} from "react";

/**
 * V2FooterWordmark — interactive "China Delight" footer wordmark.
 * Click it: confetti burst of fortune hanzi + a brief shimmer across
 * the wordmark itself. Honors prefers-reduced-motion via CSS.
 */
const HANZI = ["福", "喜", "壽", "财", "吉", "和", "美", "运"];

function V2FooterWordmark() {
  const [active, setActive] = useState(false);
  const [burstId, setBurstId] = useState(0);

  const fire = () => {
    if (active) return;
    setBurstId((n) => n + 1);
    setActive(true);
    setTimeout(() => setActive(false), 1100);
  };

  return (
    <button
      type="button"
      className={`v2-footer-wordmark v2-footer-wordmark--interactive ${active ? "is-active" : ""}`}
      onClick={fire}
      aria-label="China Delight — click for a little luck"
    >
      <span className="v2-footer-wordmark-text">China Delight</span>
      {active && (
        <span className="v2-footer-wordmark-confetti" key={burstId} aria-hidden>
          {HANZI.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </span>
      )}
    </button>
  );
}

export default V2FooterWordmark;
