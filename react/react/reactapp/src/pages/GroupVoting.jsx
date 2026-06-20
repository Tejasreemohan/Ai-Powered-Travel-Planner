import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function GroupVoting() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Group Voting</h2>

        <p>Group members vote on itinerary activities.</p>

        <Button
          text="Finalize & View Summary"
          onClick={() => navigate("/trip/new/summary")}
          style={{ background: "green" }}
        />
      </div>
    </>
  );
}
