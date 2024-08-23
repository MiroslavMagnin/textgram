import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import MenuIcon from "../../assets/icons/MenuIcon";

export default function Header() {
  const logoAlt = "Textgram logo";
  const [isOpen, setOpen] = useState();

  return (
    <header>
      <div className="header-left-div">
        <Link id="text-logo" to="/home">
          Textgram
        </Link>
        {/* <img src={logo} alt={logoAlt} className="logo"></img> */}
      </div>

      <div className="header-right-div">
        <nav className={`header__nav ${isOpen ? "active" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
        <button
          className="header__menu-button"
          onClick={() => setOpen(!isOpen)}
        >
          <MenuIcon fillColor={`rgba(255, 255, 255, 0.87)`} />
        </button>
        {/* <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link> */}
      </div>
    </header>
  );
}
