import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";

export default function Home() {
  const [paragraphContent, setParagraphContent] = useState(
    "Whereas recognition of the inherent dignity"
  );

  function handleClick(type) {
    setParagraphContent(type);
  }

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Text</h1>

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

          <p>
            Врываемся с показом Лиги Конференций! Присоединяйтесь к просмотру!
            Трансляция, как и всегда, пройдет в нашей группе ВКонтакте и на пл
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            атформе Sportcast.online Disney хочет стереть из памяти «Аколит»
            Компания убрала весь мерч с полок своего магазина сразу после того,
            как стало известно о закрытии сериала. Ожидается, что самый убогий п
            ро fg ект по франшизе Звёздных Войн в
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            скоре удалят из онлайн-кинотеатра Disney+. Больше никаких
            *гей-роботов из открытого космоса... *ЛГБТ запреще но в РФ Врываемся
            с показом Лиги Конференций! Присоединяйтесь к просмотру! Трансляция,
            как и всегда, пройдет в нашей группе ВКонтакте и на пл
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            атформе Sportcast.online Disney хочет стереть из памяти «Аколит»
            Компания убрала весь мерч с полок своего магазина сразу после того,
            как стало известно о закрытии сериала. Ожидается, что самый убогий п
            ро fg ект по франшизе Звёздных Войн в
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            скоре удалят из онлайн-кинотеатра Disney+. Больше никаких
            *гей-роботов из открытого космоса... *ЛГБТ запреще но в РФВрываемся
            с показом Лиги Конференций! Присоединяйтесь к просмотру! Трансляция,
            как и всегда, пройдет в нашей группе ВКонтакте и на пл
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            атформе Sportcast.online Disney хочет стереть из памяти «Аколит»
            Компания убрала весь мерч с полок своего магазина сразу после того,
            как стало известно о закрытии сериала. Ожидается, что самый убогий п
            ро fg ект по франшизе Звёздных Войн в
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            скоре удалят из онлайн-кинотеатра Disney+. Больше никаких
            *гей-роботов из открытого космоса... *ЛГБТ запреще но в РФ
          </p>
        </main>
      </div>
    </>
  );
}
