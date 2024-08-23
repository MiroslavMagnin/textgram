import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";

export default function HomePage() {
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
            Повседневная практика показывает, что выбранный нами инновационный
            путь в значительной степени обуславливает создание соответствующих
            условий активизации. Не следует, однако, забывать о том, что
            постоянный количественный рост и сфера нашей активности играет
            важную роль в формировании дальнейших направлений развитая системы
            массового участия! Значимость этих проблем настолько очевидна, что
            консультация с профессионалами из IT требует от нас системного
            анализа экономической целесообразности принимаемых решений?
            Значимость этих проблем настолько очевидна, что рамки и место
            обучения кадров обеспечивает актуальность ключевых компонентов
            планируемого обновления! Значимость этих проблем настолько очевидна,
            что повышение уровня гражданского сознания напрямую зависит от
            существующих финансовых и административных условий. Практический
            опыт показывает, что дальнейшее развитие различных форм деятельности
            влечет за собой процесс внедрения и модернизации дальнейших
            направлений развитая системы массового участия. Соображения высшего
            порядка, а также постоянный количественный рост и сфера нашей
            активности в значительной степени обуславливает создание системы
            обучения кадров, соответствующей насущным потребностям! Дорогие
            друзья, постоянное информационно-техническое обеспечение нашей
            деятельности играет важную роль в формировании системы масштабного
            изменения ряда параметров. Дорогие друзья, постоянное
            информационно-техническое обеспечение нашей деятельности
            представляет собой интересный эксперимент проверки ключевых
            компонентов планируемого обновления. Повседневная практика
            показывает, что консультация с профессионалами из IT обеспечивает
            широкому кругу специалистов участие в формировании ключевых
            компонентов планируемого обновления. Значимость этих проблем
            настолько очевидна, что...
            <br />
            <br />
            Повседневная практика показывает, что выбранный нами инновационный
            путь в значительной степени обуславливает создание соответствующих
            условий активизации. Не следует, однако, забывать о том, что
            постоянный количественный рост и сфера нашей активности играет
            важную роль в формировании дальнейших направлений развитая системы
            массового участия! Значимость этих проблем настолько очевидна, что
            консультация с профессионалами из IT требует от нас системного
            анализа экономической целесообразности принимаемых решений?
            Значимость этих проблем настолько очевидна, что рамки и место
            обучения кадров обеспечивает актуальность ключевых компонентов
            планируемого обновления! Значимость этих проблем настолько очевидна,
            что повышение уровня гражданского сознания напрямую зависит от
            существующих финансовых и административных условий. Практический
            опыт показывает, что дальнейшее развитие различных форм деятельности
            влечет за собой процесс внедрения и модернизации дальнейших
            направлений развитая системы массового участия. Соображения высшего
            порядка, а также постоянный количественный рост и сфера нашей
            активности в значительной степени обуславливает создание системы
            обучения кадров, соответствующей насущным потребностям! Дорогие
            друзья, постоянное информационно-техническое обеспечение нашей
            деятельности играет важную роль в формировании системы масштабного
            изменения ряда параметров. Дорогие друзья, постоянное
            информационно-техническое обеспечение нашей деятельности
            представляет собой интересный эксперимент проверки ключевых
            компонентов планируемого обновления. Повседневная практика
            показывает, что консультация с профессионалами из IT обеспечивает
            широкому кругу специалистов участие в формировании ключевых
            компонентов планируемого обновления. Значимость этих проблем
            настолько очевидна, что...
          </p>
        </main>
      </div>
    </>
  );
}