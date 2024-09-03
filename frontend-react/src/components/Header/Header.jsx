import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import TextgramIcon from "../../assets/icons/TextgramIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import FeedIcon from "../../assets/icons/FeedIcon";
import RegisterIcon from "../../assets/icons/RegisterIcon";
import LoginIcon from "../../assets/icons/LoginIcon";
import QuestionIcon from "../../assets/icons/QuestionIcon";

export default function Header() {
  const logoAlt = "Textgram logo";
  const [isOpen, setOpen] = useState();

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuth(token !== null && token !== "undefined" && token !== "");
  }, [isAuth]);

  return (
    <header>
      <div className="header__left">
        <Link id="text-logo" to="/about">
          <div className="left__icon-box">
            <TextgramIcon
              className="icon-box__icon"
              fillColor="white"
              size="20"
            />
          </div>
          <div className="left__text">textgram</div>
        </Link>
      </div>

      <div className="header__right">
        <nav className={`header__nav ${isOpen ? "active" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link className="nav-item__link" to="/home">
                <div className="nav-item__icon">
                  <HomeIcon fillColor="white" size="20" />
                </div>

                <div className="nav-item__text">Home</div>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="nav-item__link" to="/feed">
                <div className="nav-item__icon">
                  <FeedIcon
                    className="nav-item__icon"
                    fillColor="white"
                    size="20"
                  />
                </div>

                <div className="nav-item__text">Feed</div>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="nav-item__link" to="/about">
                <div className="nav-item__icon">
                  <QuestionIcon
                    className="nav-item__icon"
                    fillColor="white"
                    size="20"
                  />
                </div>

                <div className="nav-item__text">About</div>
              </Link>
            </li>
            <li
              className="header__nav-item"
              id="nav-item__signup"
              style={{ display: isAuth ? "none" : "block" }}
            >
              <Link className="nav-item__link" to="/signup">
                <div className="nav-item__icon">
                  <RegisterIcon
                    className="nav-item__icon"
                    fillColor="white"
                    size="20"
                  />
                </div>

                <div className="nav-item__text">Sign Up</div>
              </Link>
            </li>
            <li
              className="header__nav-item"
              id="nav-item__signin"
              style={{ display: isAuth ? "none" : "block" }}
            >
              <Link className="nav-item__link" to="/signin">
                <div className="nav-item__icon">
                  <LoginIcon
                    className="nav-item__icon"
                    fillColor="white"
                    size="20"
                  />
                </div>

                <div className="nav-item__text">Sign In</div>
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="header__menu-button"
          onClick={() => setOpen(!isOpen)}
        >
          <div className="menu-button__icon">
            <MenuIcon fillColor="white" size="32" />
          </div>
        </button>
      </div>
    </header>
  );
}
