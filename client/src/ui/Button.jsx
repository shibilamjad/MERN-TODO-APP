import "./Button.css";

export function Button({ children, type, onClick }) {
  if (type) return <button className="addbtn">{children}</button>;
  if (onClick) {
    return (
      <button className="cancelbtn" onClick={onClick}>
        {children}
      </button>
    );
  }
}
