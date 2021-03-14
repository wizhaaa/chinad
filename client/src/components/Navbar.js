import React, { useState } from "react";
import { Link } from "react-router-dom";

//navbar object add new links by adding new <li> elements
function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <Link to="/" className="navbar-brand">
        China Delight
      </Link>
      <div className="collapse navbar-collapse" id="navbarToggler">
        <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              {" "}
              Home{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              {" "}
              About{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              {" "}
              Cart{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
