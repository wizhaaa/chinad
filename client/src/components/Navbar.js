import React, { useState } from "react";
import { Link } from "react-router-dom";

//navbar object add new links by adding new <li> elements
function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        China Delight
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav mr-auto">
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
