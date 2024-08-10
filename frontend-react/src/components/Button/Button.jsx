import "./Button.css";

export default function Button({ children, isActive, ...props }) {
  return (
    <button {...props} className={isActive ? "button active" : "button"}>
      {children}
    </button>
  );
}
