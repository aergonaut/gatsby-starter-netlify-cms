import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/coupa-logo.svg";

const Navbar = () => (
  <div className="container">
    <div className="columns is-centered">
      <div className="column is-two-thirds">
        <nav className="navbar is-transparent">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <h1>Coupa Engineering</h1>
              </Link>
            </div>
            <div className="navbar-start" />
            <div className="navbar-end">
              <Link className="navbar-item" to="/tags/brewing">
                Brewing
              </Link>
              <Link className="navbar-item" to="/tags/tasting">
                Tasting
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

export default Navbar;
