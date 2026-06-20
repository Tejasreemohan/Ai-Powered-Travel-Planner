// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Button from "../components/Button";

// export default function Profile() {
//   const { user, logout, loading, setUser } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [favPlaces, setFavPlaces] = useState("");
//   const [stats, setStats] = useState({ trips_created: 0 });
//   const [invites, setInvites] = useState([]);

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login");
//       return;
//     }

//     if (user) {
//       setName(user.name || "");
//       setFavPlaces(user.favPlaces || "");
//       loadStats();
//       loadInvites();
//     }
//   }, [user, loading, navigate]);

//   const loadStats = async () => {
//     const token = localStorage.getItem("access");
//     const res = await fetch("http://127.0.0.1:8000/api/profile/stats/", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setStats(await res.json());
//   };

//   const loadInvites = async () => {
//     const token = localStorage.getItem("access");
//     const res = await fetch("http://127.0.0.1:8000/api/profile/invites/", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setInvites(Array.isArray(data) ? data : []);
//   };

//   const handleSave = () => {
//     const updatedUser = { ...user, name, favPlaces };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setIsEditing(false);
//     alert("Profile updated successfully");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="profile-page" style={{ maxWidth: "700px", margin: "auto" }}>
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <div
//             style={{
//               width: 80,
//               height: 80,
//               borderRadius: "50%",
//               backgroundColor: "#4A90E2",
//               color: "#fff",
//               fontSize: 30,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               margin: "auto",
//             }}
//           >
//             {name ? name.charAt(0).toUpperCase() : "U"}
//           </div>

//           {isEditing ? (
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               style={{ marginTop: 10, padding: 5 }}
//             />
//           ) : (
//             <h2>{name}</h2>
//           )}

//           <p style={{ color: "gray" }}>{user?.email}</p>
//         </div>

//         <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
//           <h3>Travel Stats</h3>
//           <p><b>Trips Created:</b> {stats.trips_created}</p>
//         </div>

//         <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
//           <h3>Favourite Destinations</h3>
//           {isEditing ? (
//             <input
//               value={favPlaces}
//               onChange={(e) => setFavPlaces(e.target.value)}
//               placeholder="e.g., Goa, Manali, Kerala"
//               style={{ width: "100%", padding: 5 }}
//             />
//           ) : (
//             <p>{favPlaces || "No favourite places added"}</p>
//           )}
//         </div>

//         <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
//           <h3>Invited Collaborators</h3>
//           {invites.length === 0 ? (
//             <p>No invites sent yet</p>
//           ) : (
//             invites.map((i, idx) => (
//               <p key={idx}>
//                 {i.email} — {i.accepted ? "Accepted" : "Pending"}
//               </p>
//             ))
//           )}
//         </div>

//         <div style={{ marginTop: 20 }}>
//           {!isEditing ? (
//             <>
//               <Button text="Edit Profile" onClick={() => setIsEditing(true)} />
//               <Button
//                 text="Logout"
//                 onClick={() => {
//                   logout();
//                   navigate("/login");
//                 }}
//                 style={{ backgroundColor: "red", marginLeft: 10 }}
//               />
//             </>
//           ) : (
//             <>
//               <Button text="Save" onClick={handleSave} />
//               <Button
//                 text="Cancel"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setName(user.name);
//                 }}
//                 style={{ marginLeft: 10 }}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [favPlaces, setFavPlaces] = useState("");
  const [stats, setStats] = useState({ trips_created: 0 });
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      setName(user.name || "");
      setFavPlaces(user.favPlaces || "");
      loadStats();
      loadInvites();
    }
  }, [user, loading, navigate]);

  const loadStats = async () => {
    const token = localStorage.getItem("access");

    const res = await fetch("http://127.0.0.1:8000/api/profile/stats/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setStats(data);
  };

  const loadInvites = async () => {
    const token = localStorage.getItem("access");

    const res = await fetch("http://127.0.0.1:8000/api/profile/invites/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setInvites(Array.isArray(data) ? data : []);
  };

  const handleSave = () => {
    const updatedUser = { ...user, name, favPlaces };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);

    alert("Profile updated successfully");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="profile-page" style={{ maxWidth: "700px", margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#4A90E2",
              color: "#fff",
              fontSize: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: 10, padding: 5 }}
            />
          ) : (
            <h2>{name}</h2>
          )}

          <p style={{ color: "gray" }}>{user?.email}</p>
        </div>

        <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
          <h3>Travel Stats</h3>
          <p><b>Trips Created:</b> {stats.trips_created}</p>
        </div>

        <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
          <h3>Favourite Destinations</h3>

          {isEditing ? (
            <input
              value={favPlaces}
              onChange={(e) => setFavPlaces(e.target.value)}
              placeholder="e.g., Goa, Manali, Kerala"
              style={{ width: "100%", padding: 5 }}
            />
          ) : (
            <p>{favPlaces || "No favourite places added"}</p>
          )}
        </div>

        <div className="profile-card" style={{ padding: 15, marginBottom: 15 }}>
          <h3>Invited Collaborators</h3>

          {invites.length === 0 ? (
            <p>No invites sent yet</p>
          ) : (
            invites.map((i, idx) => (
              <p key={idx}>
                {i.email} — {i.accepted ? "Accepted" : "Pending"}
              </p>
            ))
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          {!isEditing ? (
            <>
              <Button text="Edit Profile" onClick={() => setIsEditing(true)} />

              <Button
                text="Logout"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                style={{ backgroundColor: "red", marginLeft: 10 }}
              />
            </>
          ) : (
            <>
              <Button text="Save" onClick={handleSave} />

              <Button
                text="Cancel"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.name);
                }}
                style={{ marginLeft: 10 }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}