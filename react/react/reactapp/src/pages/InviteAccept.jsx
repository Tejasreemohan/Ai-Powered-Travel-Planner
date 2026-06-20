import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function InviteAccept() {

  const { tripId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email =
    searchParams.get("email") ||
    localStorage.getItem("inviteEmail");

  useEffect(() => {

    const urlEmail = searchParams.get("email");

    if (urlEmail) {
      localStorage.setItem("inviteEmail", urlEmail);
    }

    const finalEmail =
      urlEmail || localStorage.getItem("inviteEmail");

    if (!finalEmail) {
      alert("Invalid invite link");
      navigate("/dashboard");
      return;
    }

    const token = localStorage.getItem("access");
    const loggedUserEmail = localStorage.getItem("userEmail");

    if (!token || loggedUserEmail !== finalEmail) {

      localStorage.setItem("pendingInviteTrip", tripId);
      localStorage.setItem("inviteEmail", finalEmail);

      navigate("/login");
    }

  }, [tripId, navigate, searchParams]);

  const acceptInvite = async () => {

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/trips/${tripId}/accept/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Invite Accepted ✅");

      // 🔥 CLEANUP
      localStorage.removeItem("inviteEmail");

      navigate(`/trip/${tripId}/vote`);

    } catch {
      alert("Server error");
    }
  };

  const rejectInvite = async () => {

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/trips/${tripId}/reject/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      alert(data.message || data.error);

      // 🔥 CLEANUP
      localStorage.removeItem("inviteEmail");

      navigate("/dashboard");

    } catch {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2>Trip Invitation</h2>

        <p>You have been invited to collaborate on this trip.</p>

        <Button text="Accept Invite" onClick={acceptInvite} />
        <Button text="Reject Invite" onClick={rejectInvite} />
      </div>
    </>
  );
}