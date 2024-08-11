import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "/vite.svg";

export default function Header() {
  const [timer, setTimer] = useState(new Date());
  const logoAlt = "Textgram logo";

  return (
    <header>
      <div className="header-left-div">
        <Link id="text-logo" to="/home">Textgram</Link>
        {/* <img src={logo} alt={logoAlt} className="logo"></img> */}
      </div>

      <div className="header-right-div">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </header>
  );
}
