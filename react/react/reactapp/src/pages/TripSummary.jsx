// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Button from "../components/Button";
// import Card from "../components/Card";
// import { useNavigate } from "react-router-dom";

// export default function TripSummary() {
//   const navigate = useNavigate();

//   const [tripData, setTripData] = useState(null);
//   const [itinerary, setItinerary] = useState([]);

//   useEffect(() => {
//     try {
//       const preferences = JSON.parse(localStorage.getItem("tripPreferences"));
//       const voted = JSON.parse(localStorage.getItem("votedItinerary"));

//       setTripData(preferences || {});
//       setItinerary(voted || []);
//     } catch (err) {
//       console.error("Error loading summary:", err);
//     }
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Final Trip Summary</h2>

//         <Card title="Trip Information">
//           <p><strong>Destination:</strong> {tripData?.destination}</p>
//           <p><strong>Dates:</strong> {tripData?.startDate} → {tripData?.endDate}</p>
//           <p><strong>People:</strong> {tripData?.peopleCount}</p>
//           <p><strong>Budget:</strong> ₹{tripData?.budget}</p>
//         </Card>

//         <Card title="Day-wise Itinerary (After Voting)">
//           {itinerary.map((day, index) => (
//             <div key={index} className="summary-day-card">

//               <h3>Day {day.day}</h3>

//               {day.activities.length === 0 ? (
//                 <p>No activities added.</p>
//               ) : (
//                 day.activities.map((act, i) => {

//                   const accepted = act.votes.yes >= act.votes.no;

//                   return (
//                     <div key={i} className="summary-activity">

//                       <span>{act.name}</span>

//                       <span
//                         className="status-badge"
//                         style={{
//                           backgroundColor: accepted ? "#4CAF50" : "#E53935"
//                         }}
//                       >
//                         {accepted ? "Accepted" : "Rejected"}
//                       </span>

//                       <p>
//                         👍 {act.votes.yes} | 👎 {act.votes.no}
//                       </p>

//                     </div>
//                   );
//                 })
//               )}

//             </div>
//           ))}
//         </Card>

//         <Button
//           text="Finalize Trip"
//           onClick={() => navigate("/dashboard")}
//           style={{ background: "green", marginTop: 20 }}
//         />
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function TripSummary() {

const navigate = useNavigate();

const [tripData, setTripData] = useState({
destination: "",
startDate: "",
endDate: "",
peopleCount: "",
budget: ""
});

const [itinerary, setItinerary] = useState([]);

useEffect(() => {


try {

  const preferences = JSON.parse(localStorage.getItem("tripPreferences"));
  const voted = JSON.parse(localStorage.getItem("votedItinerary"));

  if (preferences) {
    setTripData({
      destination: preferences.destination || "",
      startDate: preferences.startDate || "",
      endDate: preferences.endDate || "",
      peopleCount: preferences.peopleCount || "",
      budget: preferences.budget || ""
    });
  }

  if (voted) {
    setItinerary(voted);
  }

} catch (err) {
  console.error("Error loading summary:", err);
}


}, []);

return (
<> <Navbar />


  <div className="page-container">

    <h2>Final Trip Summary</h2>

    <Card title="Trip Information">

      <p><strong>Destination:</strong> {tripData.destination || "Not selected"}</p>

      <p>
        <strong>Dates:</strong> 
        {tripData.startDate && tripData.endDate
          ? `${tripData.startDate} → ${tripData.endDate}`
          : "Not selected"}
      </p>

      <p><strong>People:</strong> {tripData.peopleCount || "Not selected"}</p>

      <p><strong>Budget:</strong> ₹{tripData.budget || "Not selected"}</p>

    </Card>


    <Card title="Day-wise Itinerary (After Voting)">

      {itinerary.length === 0 ? (
        <p>No itinerary created.</p>
      ) : (

        itinerary.map((day, index) => (

          <div key={index} className="summary-day-card">

            <h3>Day {day.day}</h3>

            {day.activities.length === 0 ? (
              <p>No activities added.</p>
            ) : (

              day.activities.map((act, i) => {

                const accepted = act.votes.yes >= act.votes.no;

                return (

                  <div key={i} className="summary-activity">

                    <span>{act.name}</span>

                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: accepted ? "#4CAF50" : "#E53935",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        marginLeft: "10px"
                      }}
                    >
                      {accepted ? "Accepted" : "Rejected"}
                    </span>

                    <p>
                      👍 {act.votes.yes} | 👎 {act.votes.no}
                    </p>

                  </div>

                );

              })

            )}

          </div>

        ))

      )}

    </Card>


    <Button
      text="Finalize Trip"
      onClick={() => navigate("/dashboard")}
      style={{ background: "green", marginTop: 20 }}
    />

  </div>

</>

);

}
