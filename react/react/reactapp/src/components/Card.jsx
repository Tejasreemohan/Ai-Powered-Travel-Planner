export default function Card({ title, children }) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
