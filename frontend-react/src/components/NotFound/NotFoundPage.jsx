import Header from "../Header/Header";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <>
      <Header />

      <div className="page-layout">
        <main>
          <h1>This page is not found</h1>
          <div className="not-found">
            <label>404</label>
          </div>
        </main>
      </div>
    </>
  );
};
