import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";

export default function Home() {
  const [paragraphContent, setParagraphContent] = useState("Text on the p");

  function handleClick(type) {
    setParagraphContent(type);
  }

  return (
    <>
      <Header />

      <main>
        <h3>Text</h3>

        <Button
          onClick={() => handleClick("log")}
          isActive={paragraphContent === "log"}
        >
          Log
        </Button>

        <Button
          onClick={() => handleClick("info")}
          isActive={paragraphContent === "info"}
        >
          Info
        </Button>

        <Button
          onClick={() => handleClick("reload a page")}
          isActive={paragraphContent === "reload a page"}
        >
          Reload
        </Button>

        <p>{paragraphContent}</p>
      </main>
    </>
  );
}
