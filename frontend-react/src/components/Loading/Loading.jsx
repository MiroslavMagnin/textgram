import "./Loading.css"

export default function Loading() {
  return (
    <>
      <div className="feed__loading">
        <div className="loader-container">
          <div className="loading-text">
            Loading<span className="dots"></span>
          </div>
        </div>
      </div>
    </>
  );
}
