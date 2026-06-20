// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Button from "../components/Button";
// import Card from "../components/Card";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     fetch("http://127.0.0.1:8000/api/trips/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setTrips(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [navigate]);

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Dashboard</h2>

//         <Button
//           text="Create New Trip"
//           onClick={() => navigate("/trip/create/preferences")}
//         />

//         <h3 style={{ marginTop: "20px" }}>Your Trips</h3>

//         {loading && <p>Loading trips...</p>}

//         {!loading && trips.length === 0 && <p>No trips found.</p>}

//         {trips.map((trip) => (
//           <Card key={trip.id} title={trip.destination}>
//             <p>Budget: ₹{trip.budget}</p>
//             <p>
//               Dates: {trip.start_date} → {trip.end_date}
//             </p>
//             <p>People: {trip.people_count}</p>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// }


import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2>Dashboard</h2>

        <p>Welcome to your travel planning dashboard.</p>

        <Button
          text="Create New Trip"
          onClick={() => navigate("/trip/create/preferences")}
          style={{ width: "100%", marginTop: 20 }}
        />

        
      </div>
    </>
  );
}
