// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";
// import Button from "../components/Button";

// export default function TripHistory() {
//   const navigate = useNavigate();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ FIX: use ACCESS token
//   const token = localStorage.getItem("access");

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetch("http://127.0.0.1:8000/api/trips/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized");
//         return res.json();
//       })
//       .then((data) => {
//         setTrips(Array.isArray(data) ? data : []);
//         setLoading(false);
//       })
//       .catch(() => {
//         setTrips([]);
//         setLoading(false);
//       });
//   }, [navigate, token]);

//   // 🔴 CANCEL TRIP
//   const cancelTrip = async (tripId) => {
//     if (!window.confirm("Are you sure you want to cancel this trip?")) return;

//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/api/trips/${tripId}/delete/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.ok) {
//         setTrips(trips.filter((trip) => trip.id !== tripId));
//       } else {
//         alert("Failed to cancel trip");
//       }
//     } catch {
//       alert("Server error while cancelling trip");
//     }
//   };

//   const editTrip = (tripId) => {
//     navigate(`/trip/${tripId}/edit`);
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Trip History</h2>

//         {loading && <p>Loading trips...</p>}
//         {!loading && trips.length === 0 && <p>No trips found.</p>}

//         {trips.map((trip) => (
//           <Card key={trip.id} title={trip.destination}>
//             <p>Budget: ₹{trip.budget}</p>
//             <p>
//               Dates: {trip.start_date} → {trip.end_date}
//             </p>
//             <p>People: {trip.people_count}</p>

//             <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//               <Button
//                 text="Edit"
//                 onClick={() => editTrip(trip.id)}
//                 style={{ backgroundColor: "#4A90E2" }}
//               />
//               <Button
//                 text="Cancel"
//                 onClick={() => cancelTrip(trip.id)}
//                 style={{ backgroundColor: "#E74C3C" }}
//               />
//             </div>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function TripHistory() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/trips/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setTrips(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setTrips([]);
        setLoading(false);
      });
  }, [navigate, token]);

  const cancelTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to cancel this trip?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/trips/${tripId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setTrips(trips.filter((trip) => trip.id !== tripId));
      } else {
        alert("Failed to cancel trip");
      }
    } catch {
      alert("Server error while cancelling trip");
    }
  };

  const editTrip = (tripId) => {
    navigate(`/trip/${tripId}/edit`);
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2>Trip History</h2>

        {loading && <p>Loading trips...</p>}
        {!loading && trips.length === 0 && <p>No trips found.</p>}

        {trips.map((trip) => (
          <Card key={trip.id} title={trip.destination}>
            <p>Budget: ₹{trip.budget}</p>
            <p>Dates: {trip.start_date} → {trip.end_date}</p>
            <p>People: {trip.people_count}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button
                text="Edit"
                onClick={() => editTrip(trip.id)}
                style={{ backgroundColor: "#4A90E2" }}
              />

              <Button
                text="Cancel"
                onClick={() => cancelTrip(trip.id)}
                style={{ backgroundColor: "#E74C3C" }}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}