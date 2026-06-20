// // // import { useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import Navbar from "../components/Navbar";

// // // export default function InviteCollaborators() {
// // //   const { tripId } = useParams(); 
// // //   const [email, setEmail] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const sendInvite = async () => {
// // //     const token = localStorage.getItem("access");

// // //     console.log("TripId:", tripId);
// // //     console.log("Token:", token);
// // //     console.log("Email:", email);

// // //     if (!email) {
// // //       alert("Enter email");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);

// // //       const res = await fetch(
// // //         `http://127.0.0.1:8000/api/trips/${tripId}/invite/`,
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //           body: JSON.stringify({ email }),
// // //         }
// // //       );

// // //       console.log("🔥 API CALLED");

// // //       const data = await res.json();
// // //       console.log("Response:", data);

// // //       if (!res.ok) {
// // //         alert(data.error || "Invite failed");
// // //         return;
// // //       }

// // //       alert("Invite sent successfully ");
// // //       setEmail("");

// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Server error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Navbar />
// // //       <div className="page-container">
// // //         <h2>Invite Collaborators</h2>

// // //         <input
// // //           type="email"
// // //           placeholder="Enter friend's email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //         />

// // //         <br /><br />

// // //         <button onClick={sendInvite} disabled={loading}>
// // //           {loading ? "Sending..." : "Send Invite"}
// // //         </button>
// // //       </div>
// // //     </>
// // //   );
// // // }


// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function InviteCollaborators() {
//   const { tripId } = useParams();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendInvite = async () => {
//     const token = localStorage.getItem("access");

//     if (!email) {
//       alert("Enter email");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         `http://127.0.0.1:8000/api/trips/${tripId}/invite/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Invite failed");
//         return;
//       }

//       alert("Invite sent successfully");
//       setEmail("");

//     } catch (err) {
//       console.error("Invite error:", err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="page-container">
//         <h2>Invite Collaborators</h2>

//         <input
//           type="email"
//           placeholder="Enter friend's email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <br /><br />

//         <button onClick={sendInvite} disabled={loading}>
//           {loading ? "Sending..." : "Send Invite"}
//         </button>
//       </div>
//     </>
//   );
// }

