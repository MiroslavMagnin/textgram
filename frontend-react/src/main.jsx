import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./assets/fonts/Rubik-VariableFont_wght.ttf";
import "./index.css";
import Routes from "./Routes.jsx";
import "../axios.config.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
