import React from "react";
import {Link} from "react-router-dom";

/**
 * V2Wordmark — reusable brand wordmark for the top nav.
 */
function V2Wordmark({to = "/"}) {
  return (
    <Link className="v2-wordmark" to={to}>
      <span className="v2-wordmark-seal" aria-hidden="true">中</span>
      <span className="v2-wordmark-text">
        <span className="v2-wordmark-en">China Delight</span>
        <span className="v2-wordmark-zh">Forest Hill · Since 2004</span>
      </span>
    </Link>
  );
}

export default V2Wordmark;
