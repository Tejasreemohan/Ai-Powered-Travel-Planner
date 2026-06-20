// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";
// import Button from "../components/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AISuggestions() {
//   const navigate = useNavigate();
//   const { tripId } = useParams();
//   const { user, loading } = useAuth();

//   const [people, setPeople] = useState([]);
//   const [destination, setDestination] = useState("");
//   const [loadingData, setLoadingData] = useState(true);

//   useEffect(() => {
//     if (loading) return;

//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const token = localStorage.getItem("access");

//     if (!tripId || !token) {
//       navigate("/dashboard");
//       return;
//     }

//     const fetchSuggestions = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/api/trips/${tripId}/ai/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           console.error("AI API failed");
//           setPeople([]);
//           setDestination("");
//           return;
//         }

//         const data = await res.json();

//         setPeople(data.people || []);
//         setDestination(data.destination || "");
//       } catch (err) {
//         console.error("AI Suggestions Error:", err);
//       } finally {
//         setLoadingData(false);
//       }
//     };

//     fetchSuggestions();
//   }, [tripId, user, loading, navigate]);

//   const goToItineraryBuilder = () => {
//     localStorage.setItem("matchedPeople", JSON.stringify(people));
//     navigate(`/trip/${tripId}/editor`);
//   };

//   if (loading || loadingData) {
//     return (
//       <>
//         <Navbar />
//         <div className="page-container">Loading AI suggestions...</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Travel Mates for {destination || "your trip"}</h2>

//         {people.length === 0 ? (
//           <p>No matching travelers yet 😔</p>
//         ) : (
//           people.map((p, i) => (
//             <Card key={i} title={p.name}>
//               <p><b>Destination:</b> {p.destination}</p>
//               <p><b>Budget:</b> ₹{p.budget}</p>
//               <p><b>People:</b> {p.people_count}</p>
//             </Card>
//           ))
//         )}

//         <Button
//           text="Proceed to Itinerary Builder"
//           onClick={goToItineraryBuilder}
//           style={{ backgroundColor: "green", marginTop: "20px" }}
//         />
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AISuggestions() {

  const navigate = useNavigate();
  const { tripId } = useParams();
  const { user, loading } = useAuth();

  const [people, setPeople] = useState([]);
  const [destination, setDestination] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {

    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("access");

    if (!tripId || !token) {
      navigate("/dashboard");
      return;
    }

    const fetchSuggestions = async () => {

      try {

        const res = await fetch(
          `http://127.0.0.1:8000/api/trips/${tripId}/ai/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("AI API failed");
          setPeople([]);
          setDestination("");
          return;
        }

        const data = await res.json();

        setPeople(data.people || []);
        setDestination(data.destination || "");

      } catch (err) {

        console.error("AI Suggestions Error:", err);

      } finally {

        setLoadingData(false);

      }
    };

    fetchSuggestions();

  }, [tripId, user, loading, navigate]);

  const goToItineraryBuilder = () => {

    localStorage.setItem(
      "matchedPeople",
      JSON.stringify(people)
    );

    navigate(`/trip/${tripId}/editor`);
  };

  if (loading || loadingData) {

    return (
      <>
        <Navbar />

        <div className="page-container">
          Loading AI suggestions...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-container">

        <h2>
          Travel Mates for {destination || "your trip"}
        </h2>

        {people.length === 0 ? (

          <p>No matching travelers yet 😔</p>

        ) : (

          people.map((p, i) => (

            <Card key={i} title={p.name}>

              <p>
                <b>Email:</b> {p.email}
              </p>

              <p>
                <b>Destination:</b> {p.destination}
              </p>

              <p>
                <b>Dates:</b> {p.start_date} → {p.end_date}
              </p>

              <p>
                <b>Budget:</b> ₹{p.budget}
              </p>

              <p>
                <b>People:</b> {p.people_count}
              </p>

            </Card>
          ))
        )}

        <Button
          text="Proceed to Itinerary Builder"
          onClick={goToItineraryBuilder}
          style={{
            backgroundColor: "green",
            marginTop: "20px"
          }}
        />

      </div>
    </>
  );
}