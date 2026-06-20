import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="nav-title" onClick={() => navigate("/dashboard")}>
        Travel Planner
      </h2>

      <div className="nav-links">
        <span onClick={() => navigate("/dashboard")}>Home</span>
        <span onClick={() => navigate("/history")}>History</span>
        <span onClick={() => navigate("/profile")}>Profile</span>

      </div>
    </nav>
  );
}
