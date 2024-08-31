import "./NotAuthorized.css";
import LockIcon from "../../assets/icons/LockIcon";

export default function NotAuthorized() {
  return (
    <>
      <div className="not-authorized">
        <div className="not-authorized__icon">
          <LockIcon fillColor="white" size="20" />
        </div>
        <div className="not-authorized__text">YOU AREN'T AUTHORIZED!!!</div>
      </div>
    </>
  );
}
