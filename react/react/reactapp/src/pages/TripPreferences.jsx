// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// // import FormInput from "../components/FormInput";
// // import Button from "../components/Button";
// // import { useAuth } from "../context/AuthContext";

// // export default function TripPreferences() {
// //   const navigate = useNavigate();
// //   const { user, loading } = useAuth();

// //   const [budget, setBudget] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [startLocation, setStartLocation] = useState("");
// //   const [destination, setDestination] = useState("");
// //   const [otherDestination, setOtherDestination] = useState("");
// //   const [peopleCount, setPeopleCount] = useState("");
// //   const [submitting, setSubmitting] = useState(false);

// //   const locations = [
// //     "Goa","Kerala","Mumbai","Hyderabad","Bengaluru",
// //     "Manali","Ooty","Delhi","Pondicherry","Jaipur",
// //   ];

// //   // 🔐 Protect route
// //   useEffect(() => {
// //     if (!loading && !user) {
// //       navigate("/login");
// //     }
// //   }, [user, loading, navigate]);

// //   // 🔹 Create Trip
// //   const createTripInBackend = async () => {
// //     if (!budget || !startDate || !endDate || !startLocation || !destination || !peopleCount) {
// //       alert("Please fill all fields");
// //       return false;
// //     }

// //     const finalDestination =
// //       destination === "other" ? otherDestination : destination;

// //     const tripData = {
// //       budget: Number(budget),
// //       startDate,
// //       endDate,
// //       startLocation,
// //       destination: finalDestination,
// //       peopleCount: Number(peopleCount),
// //     };

// //     try {
// //       setSubmitting(true);

// //       const res = await fetch("http://127.0.0.1:8000/api/trips/create/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${localStorage.getItem("access")}`,
// //         },
// //         body: JSON.stringify(tripData),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         console.error("Trip error:", data);
// //         alert(data.error || "Trip creation failed");
// //         return false;
// //       }

// //       localStorage.setItem("tripId", data.tripId);
// //       return true;

// //     } catch (err) {
// //       console.error(err);
// //       alert("Server error");
// //       return false;
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // 👉 JOIN GROUP → AI Suggestions
// //   const handleJoinGroup = async () => {
// //     const ok = await createTripInBackend();
// //     if (ok) {
// //       const tripId = localStorage.getItem("tripId");
// //       navigate(`/trip/${tripId}/ai`);
// //     }
// //   };

// //   // 👉 INDIVIDUAL → Itinerary Builder ✅ FIXED
// //   const handleIndividualTrip = async () => {
// //     const ok = await createTripInBackend();
// //     if (ok) {
// //       const tripId = localStorage.getItem("tripId");
// //       navigate(`/trip/${tripId}/editor`);
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <>
// //       <Navbar />

// //       <div className="page-container">
// //         <h2>Trip Preferences</h2>

// //         <FormInput label="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
// //         <FormInput label="Starting Location" value={startLocation} onChange={e => setStartLocation(e.target.value)} />

// //         <label>Destination</label>
// //         <select value={destination} onChange={e => setDestination(e.target.value)}>
// //           <option value="">Select destination</option>
// //           {locations.map(loc => (
// //             <option key={loc} value={loc}>{loc}</option>
// //           ))}
// //           <option value="other">Other</option>
// //         </select>

// //         {destination === "other" && (
// //           <FormInput
// //             label="Enter Destination"
// //             value={otherDestination}
// //             onChange={e => setOtherDestination(e.target.value)}
// //           />
// //         )}

// //         <label>Start Date</label>
// //         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />

// //         <label>End Date</label>
// //         <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />

// //         <label>Number of People Going</label>
// //         <select value={peopleCount} onChange={e => setPeopleCount(e.target.value)}>
// //           <option value="">Select</option>
// //           {[1,2,3,4,5].map(n => (
// //             <option key={n} value={n}>{n} people</option>
// //           ))}
// //         </select>

// //         <Button
// //           text={submitting ? "Creating..." : "Join Group (AI Suggestions)"}
// //           onClick={handleJoinGroup}
// //           disabled={submitting}
// //         />

// //         <Button
// //           text={submitting ? "Creating..." : "Create Individual Trip"}
// //           onClick={handleIndividualTrip}
// //           disabled={submitting}
// //         />
// //       </div>
// //     </>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import FormInput from "../components/FormInput";
// import Button from "../components/Button";
// import { useAuth } from "../context/AuthContext";

// export default function TripPreferences() {

// const navigate = useNavigate();
// const { user, loading } = useAuth();

// const [budget, setBudget] = useState("");
// const [startDate, setStartDate] = useState("");
// const [endDate, setEndDate] = useState("");
// const [startLocation, setStartLocation] = useState("");
// const [destination, setDestination] = useState("");
// const [otherDestination, setOtherDestination] = useState("");
// const [peopleCount, setPeopleCount] = useState("");
// const [submitting, setSubmitting] = useState(false);

// const locations = [
// "Goa","Kerala","Mumbai","Hyderabad","Bengaluru",
// "Manali","Ooty","Delhi","Pondicherry","Jaipur",
// ];

// // protect route
// useEffect(() => {
// if (!loading && !user) {
// navigate("/login");
// }
// }, [user, loading, navigate]);

// // CREATE TRIP
// const createTripInBackend = async () => {


// if (!budget || !startDate || !endDate || !startLocation || !destination || !peopleCount) {
//   alert("Please fill all fields");
//   return false;
// }

// const finalDestination =
//   destination === "other" ? otherDestination : destination;

// const tripData = {
//   budget: Number(budget),
//   startDate,
//   endDate,
//   startLocation,
//   destination: finalDestination,
//   peopleCount: Number(peopleCount),
// };

// try {

//   setSubmitting(true);

//   const res = await fetch("http://127.0.0.1:8000/api/trips/create/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     },
//     body: JSON.stringify(tripData),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     console.error("Trip error:", data);
//     alert(data.error || "Trip creation failed");
//     return false;
//   }

//   // ⭐ SAVE TRIP ID
//   localStorage.setItem("tripId", data.tripId);

//   // ⭐ SAVE TRIP DETAILS FOR SUMMARY PAGE
//   localStorage.setItem(
//     "tripPreferences",
//     JSON.stringify({
//       destination: finalDestination,
//       startDate,
//       endDate,
//       peopleCount,
//       budget
//     })
//   );

//   return true;

// } catch (err) {

//   console.error(err);
//   alert("Server error");
//   return false;

// } finally {

//   setSubmitting(false);

// }


// };

// // JOIN GROUP (AI SUGGESTIONS)
// const handleJoinGroup = async () => {


// const ok = await createTripInBackend();

// if (ok) {
//   const tripId = localStorage.getItem("tripId");
//   navigate(`/trip/${tripId}/ai`);
// }


// };

// // INDIVIDUAL TRIP → ITINERARY BUILDER
// const handleIndividualTrip = async () => {

// const ok = await createTripInBackend();

// if (ok) {
//   const tripId = localStorage.getItem("tripId");
//   navigate(`/trip/${tripId}/editor`);
// }


// };

// if (loading) return <p>Loading...</p>;

// return (
// <> <Navbar />


//   <div className="page-container">

//     <h2>Trip Preferences</h2>

//     <FormInput
//       label="Budget"
//       value={budget}
//       onChange={e => setBudget(e.target.value)}
//     />

//     <FormInput
//       label="Starting Location"
//       value={startLocation}
//       onChange={e => setStartLocation(e.target.value)}
//     />


//     <label>Destination</label>

//     <select
//       value={destination}
//       onChange={e => setDestination(e.target.value)}
//     >

//       <option value="">Select destination</option>

//       {locations.map(loc => (
//         <option key={loc} value={loc}>{loc}</option>
//       ))}

//       <option value="other">Other</option>

//     </select>


//     {destination === "other" && (

//       <FormInput
//         label="Enter Destination"
//         value={otherDestination}
//         onChange={e => setOtherDestination(e.target.value)}
//       />

//     )}


//     <label>Start Date</label>

//     <input
//       type="date"
//       value={startDate}
//       onChange={e => setStartDate(e.target.value)}
//     />


//     <label>End Date</label>

//     <input
//       type="date"
//       value={endDate}
//       onChange={e => setEndDate(e.target.value)}
//     />


//     <label>Number of People Going</label>

//     <select
//       value={peopleCount}
//       onChange={e => setPeopleCount(e.target.value)}
//     >

//       <option value="">Select</option>

//       {[1,2,3,4,5].map(n => (
//         <option key={n} value={n}>{n} people</option>
//       ))}

//     </select>


//     <Button
//       text={submitting ? "Creating..." : "Join Group (AI Suggestions)"}
//       onClick={handleJoinGroup}
//       disabled={submitting}
//     />


//     <Button
//       text={submitting ? "Creating..." : "Create Individual Trip"}
//       onClick={handleIndividualTrip}
//       disabled={submitting}
//     />

//   </div>
// </>
// );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function TripPreferences() {

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [otherDestination, setOtherDestination] = useState("");

  // 🔥 DEFAULT = 1 PERSON
  const [peopleCount, setPeopleCount] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  const locations = [
    "Goa","Kerala","Mumbai","Hyderabad","Bengaluru",
    "Manali","Ooty","Delhi","Pondicherry","Jaipur",
  ];

  // 🔐 protect route
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // 🚀 CREATE TRIP
  const createTripInBackend = async () => {

    if (!budget || !startDate || !endDate || !startLocation || !destination || !peopleCount) {
      alert("Please fill all fields");
      return false;
    }

    const finalDestination =
      destination === "other" ? otherDestination : destination;

    const tripData = {
      budget: Number(budget),
      startDate,
      endDate,
      startLocation,
      destination: finalDestination,
      peopleCount: Number(peopleCount),
    };

    try {

      setSubmitting(true);

      const res = await fetch("http://127.0.0.1:8000/api/trips/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(tripData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Trip creation failed");
        return false;
      }

      // ⭐ SAVE TRIP ID
      localStorage.setItem("tripId", data.tripId);

      // ⭐ SAVE TRIP DETAILS
      localStorage.setItem(
        "tripPreferences",
        JSON.stringify({
          destination: finalDestination,
          startDate,
          endDate,
          peopleCount,
          budget
        })
      );

      return true;

    } catch {
      alert("Server error");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // 🤝 GROUP TRIP
  const handleJoinGroup = async () => {

    const ok = await createTripInBackend();

    if (ok) {
      const tripId = localStorage.getItem("tripId");
      navigate(`/trip/${tripId}/ai`);
    }
  };

  // 👤 PERSONAL TRIP (renamed button meaning)
  const handleIndividualTrip = async () => {

    const ok = await createTripInBackend();

    if (ok) {
      const tripId = localStorage.getItem("tripId");
      navigate(`/trip/${tripId}/editor`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="page-container">

        <h2>Trip Preferences</h2>

        <FormInput
          label="Budget"
          value={budget}
          onChange={e => setBudget(e.target.value)}
        />

        <FormInput
          label="Starting Location"
          value={startLocation}
          onChange={e => setStartLocation(e.target.value)}
        />

        <label>Destination</label>
        <select
          value={destination}
          onChange={e => setDestination(e.target.value)}
        >
          <option value="">Select destination</option>

          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}

          <option value="other">Other</option>
        </select>

        {destination === "other" && (
          <FormInput
            label="Enter Destination"
            value={otherDestination}
            onChange={e => setOtherDestination(e.target.value)}
          />
        )}

        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />

        {/* 🔥 DEFAULT VALUE = 1 */}
        <label>Number of Travelers</label>
        <select
          value={peopleCount}
          onChange={e => setPeopleCount(e.target.value)}
        >
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <option key={n} value={n}>
              {n} {n === 1 ? "person" : "people"}
            </option>
          ))}
        </select>

        {/* 🤝 GROUP */}
        <Button
          text={submitting ? "Creating..." : "Smart Traveller"}
          onClick={handleJoinGroup}
          disabled={submitting}
        />

        {/* 👤 SOLO */}
        <Button
          text={submitting ? "Creating..." : "Plan with Friends"}
          onClick={handleIndividualTrip}
          disabled={submitting}
        />

      </div>
    </>
  );
}
