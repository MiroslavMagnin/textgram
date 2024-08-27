import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import SideBar from "../SideBar/SideBar.jsx";

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>About</h1>

          <h2>Textgram - is the social network with only text information.</h2>

          <p>
            This project is being developed by Miroslav Magnin (Samusenko
            Maxim).
            <br />
            His social media:
          </p>
          <ul>
            <li>
              VK -{" "}
              <a href="https://vk.com/mixsamus" target="_blank">
                mixsamus
              </a>
            </li>
            <li>
              TG -{" "}
              <a href="https://t.me/maxon_sam" target="_blank">
                maxon_sam
              </a>
            </li>
            <li>
              IG -{" "}
              <a href="https://www.instagram.com/max.samusen" target="_blank">
                max.samusen
              </a>
            </li>
            <li>
              GitHub -
              <a href="https://github.com/MiroslavMagnin" target="_blank">
                MiroslavMagnin
              </a>
            </li>
          </ul>

          <p>Key Features:</p>
          <ul>
            <li>Microservices architecture</li>
            <li>RESTful API</li>
            <li>Security: user authentication with JWT</li>
            <li>Kafka and Redis</li>
            <li>Frontend with React</li>
          </ul>
        </main>
      </div>

      <Footer />
    </>
  );
}
