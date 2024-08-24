import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import "./FeedPage.css";

export default function FeedPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.sub;

  return (
    <>
      <Header />

      <div className="page-layout">
        <SideBar />

        <main>
          <h1>Feed</h1>

          <h2>Email: {email}</h2>
        </main>
      </div>
    </>
  );
}
