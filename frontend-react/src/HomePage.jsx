import Header from "./components/Header/Header.jsx";
import Button from "./components/Button/Button.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Home</h1>

          <h2>What's new?</h2>
        </main>
      </div>
      <Footer />
    </>
  );
}
