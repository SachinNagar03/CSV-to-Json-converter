export default function Loader({ message = "Processing… this may take a moment for first time" }) {
  return (
    <div className="loader-overlay">
      <div className="loader-card">
        <span className="loader-ring"></span>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
}