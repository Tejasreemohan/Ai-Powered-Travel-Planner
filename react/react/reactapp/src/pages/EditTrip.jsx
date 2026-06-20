// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import FormInput from "../components/FormInput";
// import Button from "../components/Button";

// export default function EditTrip() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [budget, setBudget] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [destination, setDestination] = useState("");
//   const [peopleCount, setPeopleCount] = useState("");
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   // 🔹 FETCH EXISTING TRIP
//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/trips/${id}/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setBudget(data.budget);
//         setStartDate(data.start_date);
//         setEndDate(data.end_date);
//         setDestination(data.destination);
//         setPeopleCount(data.people_count);
//         setLoading(false);
//       });
//   }, [id, token]);


//   const updateTrip = async () => {
//     const res = await fetch(
//       `http://127.0.0.1:8000/api/trips/${id}/update/`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           budget,
//           start_date: startDate,
//           end_date: endDate,
//           destination,
//           people_count: peopleCount,
//         }),
//       }
//     );

//     if (res.ok) {
//       alert("Trip updated successfully");
//       navigate("/history");
//     } else {
//       alert("Update failed");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Edit Trip</h2>

//         <FormInput
//           label="Budget"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />

//         <FormInput
//           label="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />

//         <label>Start Date</label>
//         <input
//           type="date"
//           className="date-input"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />

//         <label>End Date</label>
//         <input
//           type="date"
//           className="date-input"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />

//         <FormInput
//           label="People Count"
//           value={peopleCount}
//           onChange={(e) => setPeopleCount(e.target.value)}
//         />

//         <Button
//           text="Save Changes"
//           onClick={updateTrip}
//           style={{ backgroundColor: "green", marginTop: 20 }}
//         />
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destination, setDestination] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/trips/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBudget(data.budget);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setDestination(data.destination);
        setPeopleCount(data.people_count);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Trip Error:", err);
      });
  }, [id, token]);

  const updateTrip = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/trips/${id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            budget,
            start_date: startDate,
            end_date: endDate,
            destination,
            people_count: peopleCount,
          }),
        }
      );

      if (res.ok) {
        alert("Trip updated successfully");
        navigate("/history");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2>Edit Trip</h2>

        <FormInput
          label="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <FormInput
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <label>Start Date</label>
        <input
          type="date"
          className="date-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          className="date-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <FormInput
          label="People Count"
          value={peopleCount}
          onChange={(e) => setPeopleCount(e.target.value)}
        />

        <Button
          text="Save Changes"
          onClick={updateTrip}
          style={{ backgroundColor: "green", marginTop: 20 }}
        />
      </div>
    </>
  );
}
