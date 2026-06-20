// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Button from "../components/Button";
// import FormInput from "../components/FormInput";
// import { useNavigate, useParams } from "react-router-dom";

// export default function ItineraryBuilder() {
//   const navigate = useNavigate();
//   const { tripId } = useParams();

//   const [step, setStep] = useState(1);
//   const [tripData, setTripData] = useState(null);

//   const [itinerary, setItinerary] = useState([
//     { day: 1, activities: [] }
//   ]);

//   const [newActivity, setNewActivity] = useState("");
//   const [selectedDay, setSelectedDay] = useState(1);

//   const [inviteEmail, setInviteEmail] = useState("");
//   const [inviteLoading, setInviteLoading] = useState(false);

//   // ✅ AI states
//   const [aiPlaces, setAiPlaces] = useState([]);
//   const [loadingPlaces, setLoadingPlaces] = useState(false);

//   // ---------------- LOAD TRIP DATA ----------------
//   useEffect(() => {
//   const data = localStorage.getItem("tripPreferences");

//   if (data) {
//     const parsed = JSON.parse(data);
//     setTripData(parsed);

//     // ✅ convert dates properly
//     const start = new Date(parsed.startDate);
//     const end = new Date(parsed.endDate);

//     // ✅ calculate days correctly
//     const diffTime = end.getTime() - start.getTime();
//     const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

//     console.log("TOTAL DAYS:", totalDays); // 🔥 debug

//     // ✅ generate itinerary days
//     const daysArray = Array.from({ length: totalDays }, (_, i) => ({
//       day: i + 1,
//       activities: []
//     }));

//     setItinerary(daysArray);
//     setSelectedDay(1); // reset dropdown
//   }
// }, []);

//   // ---------------- FETCH AI PLACES ----------------
//   useEffect(() => {
//     const fetchPlaces = async () => {
//       const token = localStorage.getItem("access");

//       try {
//         setLoadingPlaces(true);

//         const res = await fetch(
//           `http://127.0.0.1:8000/api/trips/${tripId}/places/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json(); // ✅ FIXED

//         console.log("AI DATA:", data); // ✅ correct usage

//         if (res.ok) {
//           setAiPlaces(data.places || []);
//         } else {
//           console.error("API ERROR:", data);
//         }

//       } catch (err) {
//         console.error("FETCH ERROR:", err);
//       } finally {
//         setLoadingPlaces(false);
//       }
//     };

//     if (tripId) fetchPlaces();
//   }, [tripId]);

//   // ---------------- INVITE ----------------
//   const sendInvite = async () => {
//     const token = localStorage.getItem("access");

//     if (!inviteEmail) {
//       alert("Enter email");
//       return;
//     }

//     try {
//       setInviteLoading(true);

//       const res = await fetch(
//         `http://127.0.0.1:8000/api/trips/${tripId}/invite/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ email: inviteEmail }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Invite failed");
//         return;
//       }

//       alert("Invite sent successfully");
//       setInviteEmail("");

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setInviteLoading(false);
//     }
//   };

//   // ---------------- ADD ACTIVITY ----------------
//   const addActivity = () => {
//     if (!newActivity) return;

//     const updated = itinerary.map((d) => {
//       if (d.day === parseInt(selectedDay)) {
//         return {
//           ...d,
//           activities: [
//             ...d.activities,
//             { name: newActivity, votes: { yes: 0, no: 0 } }
//           ]
//         };
//       }
//       return d;
//     });

//     setItinerary(updated);
//     setNewActivity("");
//   };

//   // ---------------- ADD FROM AI ----------------
//   const addFromAI = (place) => {
//     const updated = itinerary.map((d) => {
//       if (d.day === parseInt(selectedDay)) {
//         return {
//           ...d,
//           activities: [
//             ...d.activities,
//             { name: place, votes: { yes: 0, no: 0 } }
//           ]
//         };
//       }
//       return d;
//     });

//     setItinerary(updated);
//   };

//   // ---------------- VOTING ----------------
//   const voteActivity = (day, index, type) => {
//   const updated = itinerary.map((d) => {
//     if (d.day === day) {
//       const updatedActivities = [...d.activities];
//       const activity = updatedActivities[index];

//       // ❌ if same vote again → do nothing
//       if (activity.userVote === type) return d;

//       // 🔁 remove previous vote
//       if (activity.userVote === "yes") activity.votes.yes -= 1;
//       if (activity.userVote === "no") activity.votes.no -= 1;

//       // ✅ add new vote
//       activity.votes[type] += 1;
//       activity.userVote = type;

//       return { ...d, activities: updatedActivities };
//     }
//     return d;
//   });

//   setItinerary(updated);
// };

//   // ---------------- ADD DAY ----------------
//   const addNewDay = () => {
//     setItinerary([
//       ...itinerary,
//       { day: itinerary.length + 1, activities: [] }
//     ]);
//   };

//   // ---------------- SUMMARY ----------------
//   const goToSummary = () => {
//     localStorage.setItem("votedItinerary", JSON.stringify(itinerary));
//     navigate("/trip/new/summary");
//   };

//   // ---------------- STEP 1 ----------------
//   if (step === 1) {
//     return (
//       <>
//         <Navbar />
//         <div className="page-container">
//           <h2>Who is going on this trip?</h2>

//           <Button
//             text="Only Me"
//             onClick={() => setStep(3)}
//             style={{ width: "100%", background: "#34A853" }}
//           />

//           <Button
//             text="Invite People"
//             onClick={() => setStep(2)}
//             style={{ width: "100%", marginTop: 10, background: "#4A90E2" }}
//           />
//         </div>
//       </>
//     );
//   }

//   // ---------------- STEP 2 ----------------
//   if (step === 2) {
//     return (
//       <>
//         <Navbar />
//         <div className="page-container">
//           <h2>Invite Collaborators</h2>

//           <FormInput
//             label="Friend Email"
//             placeholder="Enter email"
//             value={inviteEmail}
//             onChange={(e) => setInviteEmail(e.target.value)}
//           />

//           <Button
//             text={inviteLoading ? "Sending..." : "Send Invite"}
//             onClick={sendInvite}
//             disabled={inviteLoading}
//           />

//           <Button
//             text="Continue to Itinerary Builder"
//             onClick={() => setStep(3)}
//             style={{ marginTop: 15 }}
//           />
//         </div>
//       </>
//     );
//   }

//   // ---------------- MAIN UI ----------------
//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Itinerary Builder & Voting</h2>

//         {tripData && (
//           <div style={{ marginBottom: 20 }}>
//             <p><b>Destination:</b> {tripData.destination}</p>
//             <p><b>Dates:</b> {tripData.startDate} → {tripData.endDate}</p>
//             <p><b>People:</b> {tripData.peopleCount}</p>
//           </div>
//         )}

//         {/* 🔥 AI SUGGESTIONS */}
//         <div className="card">
//           <h3>🤖 AI Suggested Places</h3>

//           {loadingPlaces ? (
//             <p>Loading AI suggestions...</p>
//           ) : aiPlaces.length === 0 ? (
//             <p>No AI suggestions found 😢</p>
//           ) : (
//             aiPlaces.map((place, index) => (
//               <div key={index} className="activity-vote-box">
//                 <p>{place}</p>

//                 <button onClick={() => addFromAI(place)}>
//                   ➕ Add
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ADD ACTIVITY */}
//         <div className="card">
//           <h3>Add Activity</h3>

//           <label>Select Day</label>

//           <select
//             className="dropdown"
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//           >
//             {itinerary.map((d) => (
//               <option value={d.day} key={d.day}>
//                 Day {d.day}
//               </option>
//             ))}
//           </select>

//           <input
//             className="date-input"
//             placeholder="Activity name"
//             value={newActivity}
//             onChange={(e) => setNewActivity(e.target.value)}
//           />

//           <Button text="Add Activity" onClick={addActivity} />
//         </div>

//         <Button
//           text="Add New Day"
//           onClick={addNewDay}
//           style={{ background: "#4A90E2", marginTop: 20 }}
//         />

//         {/* ITINERARY */}
//         <div style={{ marginTop: 30 }}>
//           {itinerary.map((day) => (
//             <div className="card" key={day.day}>
//               <h3>Day {day.day}</h3>

//               {day.activities.map((activity, index) => (
//                 <div key={index} className="activity-vote-box">
//                   <p>{activity.name}</p>

//                   <button onClick={() => voteActivity(day.day, index, "yes")}>
//                     👍 {activity.votes.yes}
//                   </button>

//                   <button onClick={() => voteActivity(day.day, index, "no")}>
//                     👎 {activity.votes.no}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <Button
//           text="Proceed to Trip Summary"
//           onClick={goToSummary}
//           style={{ background: "green", marginTop: 20 }}
//         />
//       </div>
//     </>
//   );
// }





import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useNavigate, useParams } from "react-router-dom";

export default function ItineraryBuilder() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState(null);

  const [itinerary, setItinerary] = useState([
    { day: 1, activities: [] }
  ]);

  const [newActivity, setNewActivity] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  // ✅ AI states
  const [aiPlaces, setAiPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // ---------------- LOAD TRIP DATA ----------------
  useEffect(() => {
    const data = localStorage.getItem("tripPreferences");

    if (data) {
      const parsed = JSON.parse(data);
      setTripData(parsed);

      // ✅ convert dates properly
      const start = new Date(parsed.startDate);
      const end = new Date(parsed.endDate);

      // ✅ calculate total days
      const diffTime = end.getTime() - start.getTime();
      const totalDays =
        Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

      console.log("TOTAL DAYS:", totalDays);

      // ✅ generate days
      const daysArray = Array.from(
        { length: totalDays },
        (_, i) => ({
          day: i + 1,
          activities: []
        })
      );

      setItinerary(daysArray);
      setSelectedDay(1);
    }
  }, []);

  // ---------------- FETCH AI PLACES ----------------
  useEffect(() => {
    const fetchPlaces = async () => {
      const token = localStorage.getItem("access");

      try {
        setLoadingPlaces(true);

        const res = await fetch(
          `http://127.0.0.1:8000/api/trips/${tripId}/places/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log("AI DATA:", data);

        if (res.ok) {
          setAiPlaces(data.places || []);
        } else {
          console.error("API ERROR:", data);
        }

      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoadingPlaces(false);
      }
    };

    if (tripId) fetchPlaces();
  }, [tripId]);

  // ---------------- INVITE ----------------
  const sendInvite = async () => {
    const token = localStorage.getItem("access");

    if (!inviteEmail) {
      alert("Enter email");
      return;
    }

    try {
      setInviteLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/api/trips/${tripId}/invite/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: inviteEmail }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invite failed");
        return;
      }

      alert("Invite sent successfully");
      setInviteEmail("");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setInviteLoading(false);
    }
  };

  // ---------------- ADD ACTIVITY ----------------
  const addActivity = () => {

    if (!newActivity) return;

    // ✅ check duplicate in ALL days
    const alreadyExists = itinerary.some((day) =>
      day.activities.some(
        (activity) =>
          activity.name.toLowerCase() ===
          newActivity.toLowerCase()
      )
    );

    // ❌ duplicate found
    if (alreadyExists) {
      alert("Activity already added!");
      return;
    }

    // ✅ add activity
    const updated = itinerary.map((d) => {
      if (d.day === parseInt(selectedDay)) {
        return {
          ...d,
          activities: [
            ...d.activities,
            {
              name: newActivity,
              votes: { yes: 0, no: 0 }
            }
          ]
        };
      }
      return d;
    });

    setItinerary(updated);
    setNewActivity("");
  };

  // ---------------- ADD FROM AI ----------------
  const addFromAI = (place) => {

    // ✅ check duplicate in ALL days
    const alreadyExists = itinerary.some((day) =>
      day.activities.some(
        (activity) =>
          activity.name.toLowerCase() ===
          place.toLowerCase()
      )
    );

    // ❌ duplicate found
    if (alreadyExists) {
      alert("This place is already added!");
      return;
    }

    // ✅ add AI place
    const updated = itinerary.map((d) => {
      if (d.day === parseInt(selectedDay)) {
        return {
          ...d,
          activities: [
            ...d.activities,
            {
              name: place,
              votes: { yes: 0, no: 0 }
            }
          ]
        };
      }
      return d;
    });

    setItinerary(updated);
  };

  // ---------------- VOTING ----------------
  const voteActivity = (day, index, type) => {

    const updated = itinerary.map((d) => {

      if (d.day === day) {

        const updatedActivities = [...d.activities];
        const activity = updatedActivities[index];

        // ❌ same vote again
        if (activity.userVote === type) return d;

        // 🔁 remove previous vote
        if (activity.userVote === "yes")
          activity.votes.yes -= 1;

        if (activity.userVote === "no")
          activity.votes.no -= 1;

        // ✅ add new vote
        activity.votes[type] += 1;
        activity.userVote = type;

        return {
          ...d,
          activities: updatedActivities
        };
      }

      return d;
    });

    setItinerary(updated);
  };

  // ---------------- ADD NEW DAY ----------------
  const addNewDay = () => {
    setItinerary([
      ...itinerary,
      {
        day: itinerary.length + 1,
        activities: []
      }
    ]);
  };

  // ---------------- SUMMARY ----------------
  const goToSummary = () => {
    localStorage.setItem(
      "votedItinerary",
      JSON.stringify(itinerary)
    );

    navigate("/trip/new/summary");
  };

  // ---------------- STEP 1 ----------------
  if (step === 1) {
    return (
      <>
        <Navbar />

        <div className="page-container">
          <h2>Who is going on this trip?</h2>

          <Button
            text="Only Me"
            onClick={() => setStep(3)}
            style={{
              width: "100%",
              background: "#34A853"
            }}
          />

          <Button
            text="Invite People"
            onClick={() => setStep(2)}
            style={{
              width: "100%",
              marginTop: 10,
              background: "#4A90E2"
            }}
          />
        </div>
      </>
    );
  }

  // ---------------- STEP 2 ----------------
  if (step === 2) {
    return (
      <>
        <Navbar />

        <div className="page-container">
          <h2>Invite Collaborators</h2>

          <FormInput
            label="Friend Email"
            placeholder="Enter email"
            value={inviteEmail}
            onChange={(e) =>
              setInviteEmail(e.target.value)
            }
          />

          <Button
            text={
              inviteLoading
                ? "Sending..."
                : "Send Invite"
            }
            onClick={sendInvite}
            disabled={inviteLoading}
          />

          <Button
            text="Continue to Itinerary Builder"
            onClick={() => setStep(3)}
            style={{ marginTop: 15 }}
          />
        </div>
      </>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <>
      <Navbar />

      <div className="page-container">

        <h2>Itinerary Builder & Voting</h2>

        {tripData && (
          <div style={{ marginBottom: 20 }}>
            <p>
              <b>Destination:</b>{" "}
              {tripData.destination}
            </p>

            <p>
              <b>Dates:</b>{" "}
              {tripData.startDate} →
              {tripData.endDate}
            </p>

            <p>
              <b>People:</b>{" "}
              {tripData.peopleCount}
            </p>
          </div>
        )}

        {/* AI PLACES */}
        <div className="card">

          <h3>🤖 AI Suggested Places</h3>

          {loadingPlaces ? (
            <p>Loading AI suggestions...</p>
          ) : aiPlaces.length === 0 ? (
            <p>No AI suggestions found 😢</p>
          ) : (
            aiPlaces.map((place, index) => (

              <div
                key={index}
                className="activity-vote-box"
              >
                <p>{place}</p>

                <button
                  onClick={() => addFromAI(place)}
                >
                  ➕ Add
                </button>
              </div>

            ))
          )}
        </div>

        {/* ADD ACTIVITY */}
        <div className="card">

          <h3>Add Activity</h3>

          <label>Select Day</label>

          <select
            className="dropdown"
            value={selectedDay}
            onChange={(e) =>
              setSelectedDay(e.target.value)
            }
          >
            {itinerary.map((d) => (
              <option
                value={d.day}
                key={d.day}
              >
                Day {d.day}
              </option>
            ))}
          </select>

          <input
            className="date-input"
            placeholder="Activity name"
            value={newActivity}
            onChange={(e) =>
              setNewActivity(e.target.value)
            }
          />

          <Button
            text="Add Activity"
            onClick={addActivity}
          />
        </div>

        {/* ADD DAY */}
        <Button
          text="Add New Day"
          onClick={addNewDay}
          style={{
            background: "#4A90E2",
            marginTop: 20
          }}
        />

        {/* ITINERARY */}
        <div style={{ marginTop: 30 }}>

          {itinerary.map((day) => (

            <div
              className="card"
              key={day.day}
            >
              <h3>Day {day.day}</h3>

              {day.activities.map(
                (activity, index) => (

                  <div
                    key={index}
                    className="activity-vote-box"
                  >
                    <p>{activity.name}</p>

                    <button
                      onClick={() =>
                        voteActivity(
                          day.day,
                          index,
                          "yes"
                        )
                      }
                    >
                      👍 {activity.votes.yes}
                    </button>

                    <button
                      onClick={() =>
                        voteActivity(
                          day.day,
                          index,
                          "no"
                        )
                      }
                    >
                      👎 {activity.votes.no}
                    </button>
                  </div>

                )
              )}
            </div>

          ))}
        </div>

        {/* SUMMARY */}
        <Button
          text="Proceed to Trip Summary"
          onClick={goToSummary}
          style={{
            background: "green",
            marginTop: 20
          }}
        />
      </div>
    </>
  );
}