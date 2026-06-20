// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import FormInput from "../components/FormInput";
// // import Button from "../components/Button";

// // export default function Login() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async () => {
// //     setError("");

// //     if (!email || !password) {
// //       setError("Please enter email and password");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await login(email, password);

// //       if (res.success) {
// //         navigate("/dashboard");
// //       } else {
// //         setError(res.message || "Login failed");
// //       }
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       setError("Server not reachable");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="page-container">
// //       <h2>Login</h2>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <FormInput
// //         label="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />

// //       <FormInput
// //         label="Password"
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />

// //       <Button
// //         text={loading ? "Logging in..." : "Login"}
// //         onClick={handleLogin}
// //         disabled={loading}
// //       />

// //       <p style={{ marginTop: 20 }}>
// //         Don&apos;t have an account? <a href="/signup">Create Account</a>
// //       </p>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import FormInput from "../components/FormInput";
// import Button from "../components/Button";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setError("");

//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await login(email, password);

//       if (res.success) {

//         // 🔥 INVITE FLOW REDIRECT
//         const pendingTrip = localStorage.getItem("pendingInviteTrip");

//         if (pendingTrip) {
//           localStorage.removeItem("pendingInviteTrip");
//           navigate(`/trip/${pendingTrip}/accept-invite`);
//         } else {
//           navigate("/dashboard");
//         }

//       } else {
//         setError(res.message || "Login failed");
//       }

//     } catch (err) {
//       console.error(err);
//       setError("Server not reachable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Login</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <FormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

//       <Button text={loading ? "Logging in..." : "Login"} onClick={handleLogin} disabled={loading} />

//       <p style={{ marginTop: 20 }}>
//         Don't have an account? <a href="/signup">Create Account</a>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {

      const res = await login(email, password);

      if (res.success) {

        // 🔥 store logged user email
        localStorage.setItem("userEmail", email);

        const pendingTrip = localStorage.getItem("pendingInviteTrip");

        if (pendingTrip) {

          // 🔥 FIX LOOP ISSUE
          localStorage.removeItem("pendingInviteTrip");

          navigate(`/trip/${pendingTrip}/accept-invite`);

        } else {
          navigate("/dashboard");
        }

      } else {
        setError(res.message || "Login failed");
      }

    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        text={loading ? "Logging in..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />

      <p style={{ marginTop: 20 }}>
        Don't have an account? <a href="/signup">Create Account</a>
      </p>

    </div>
  );
}