// import { useEffect, useState } from "react";
// import Button from "../components/Button";

// export default function MatchedUsers() {
//   const [users, setUsers] = useState([]);
//   const tripId = localStorage.getItem("tripId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/trips/${tripId}/matches/`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setUsers(data));
//   }, []);

//   const sendInvite = (receiverId) => {
//     fetch("http://127.0.0.1:8000/api/invite/send/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         receiver_id: receiverId,
//         trip_id: tripId,
//       }),
//     }).then(() => alert("Invite sent"));
//   };

//   return (
//     <div className="page-container">
//       <h2>Matched Travelers</h2>

//       {users.map((u) => (
//         <div key={u.user_id} className="card">
//           <p>{u.email}</p>
//           <Button text="Invite" onClick={() => sendInvite(u.user_id)} />
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function MatchedUsers() {
  const [users, setUsers] = useState([]);
  const tripId = localStorage.getItem("tripId");
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/trips/${tripId}/ai/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data.people || []));
  }, [tripId, token]);

  const sendInvite = (email) => {
    fetch(`http://127.0.0.1:8000/api/trips/${tripId}/invite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(() => alert("Invite sent"));
  };

  return (
    <div className="page-container">
      <h2>Matched Travelers</h2>

      {users.map((u, i) => (
        <div key={i} className="card">
          <p>{u.name}</p>
          <Button text="Invite" onClick={() => sendInvite(u.email)} />
        </div>
      ))}
    </div>
  );
}