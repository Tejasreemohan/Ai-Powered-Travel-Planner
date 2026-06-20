// // // import { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import FormInput from "../components/FormInput";
// // // import Button from "../components/Button";
// // // import { signupUser } from "../utils/api";

// // // export default function Signup() {
// // //   const navigate = useNavigate();

// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const passwordRegex =
// // //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

// // //   const handleSignup = async () => {
// // //     setError("");

// // //     if (!name || !email || !password) {
// // //       setError("Please fill all fields");
// // //       return;
// // //     }

// // //     if (!passwordRegex.test(password)) {
// // //       setError(
// // //         "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
// // //       );
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       const res = await signupUser({ name, email, password });

// // //       if (res.success) {
// // //         navigate("/verify-otp", { state: { email } });
// // //       } else {
// // //         setError(res.message);
// // //       }
// // //     } catch (err) {
// // //       setError("Server error. Try again later");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="page-container">
// // //       <h2>Create Account</h2>

// // //       {error && <p style={{ color: "red" }}>{error}</p>}

// // //       <FormInput
// // //         label="Name"
// // //         value={name}
// // //         onChange={(e) => setName(e.target.value)}
// // //       />

// // //       <FormInput
// // //         label="Email"
// // //         value={email}
// // //         onChange={(e) => setEmail(e.target.value)}
// // //       />

// // //       <FormInput
// // //         label="Password"
// // //         type="password"
// // //         value={password}
// // //         onChange={(e) => setPassword(e.target.value)}
// // //       />

// // //       <small style={{ color: "#555" }}>
// // //         Password must contain 8+ chars, uppercase, lowercase, number & special
// // //         character
// // //       </small>

// // //       <Button
// // //         text={loading ? "Creating..." : "Create Account"}
// // //         onClick={handleSignup}
// // //         disabled={loading}
// // //       />

// // //       <p style={{ marginTop: 20 }}>
// // //         Already have an account? <a href="/login">Login</a>
// // //       </p>
// // //     </div>
// // //   );
// // // }



// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import FormInput from "../components/FormInput";
// // import Button from "../components/Button";
// // import { signupUser } from "../utils/api";

// // export default function Signup() {
// //   const navigate = useNavigate();

// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const passwordRegex =
// //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

// //   const handleSignup = async () => {
// //     setError("");

// //     if (!name || !email || !password) {
// //       setError("Please fill all fields");
// //       return;
// //     }

// //     if (!passwordRegex.test(password)) {
// //       setError(
// //         "Password must contain 8+ chars, uppercase, lowercase, number & special character"
// //       );
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await signupUser({ name, email, password });

// //       if (res.success) {
// //         navigate("/verify-otp", { state: { email } });
// //       } else {
// //         setError(res.message || "Signup failed");
// //       }
// //     } catch {
// //       setError("Server error. Try again later");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="page-container">
// //       <h2>Create Account</h2>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <FormInput
// //         label="Name"
// //         value={name}
// //         onChange={(e) => setName(e.target.value)}
// //       />

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

// //       <small style={{ color: "#555" }}>
// //         Password must contain 8+ characters, uppercase, lowercase, number and special character
// //       </small>

// //       <Button
// //         text={loading ? "Creating..." : "Create Account"}
// //         onClick={handleSignup}
// //         disabled={loading}
// //       />

// //       <p style={{ marginTop: 20 }}>
// //         Already have an account? <a href="/login">Login</a>
// //       </p>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FormInput from "../components/FormInput";
// import Button from "../components/Button";
// import { signupUser } from "../utils/api";

// export default function Signup() {

//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {

//     setError("");

//     if (!name || !email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     try {

//       const res = await signupUser({ name, email, password });

//       if (res.success) {

//         // 🔥 redirect to OTP
//         navigate("/verify-otp", { state: { email } });

//       } else {
//         setError(res.message || "Signup failed");
//       }

//     } catch {
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Create Account</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <FormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

//       <Button text={loading ? "Creating..." : "Create Account"} onClick={handleSignup} />

//       <p style={{ marginTop: 20 }}>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { signupUser } from "../utils/api";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await signupUser({ name, email, password });

      if (res.success) {
        navigate("/verify-otp", { state: { email } });
      } else {
        setError(res.message);
      }

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <h2>Create Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <FormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button text={loading ? "Creating..." : "Create Account"} onClick={handleSignup} />

      <p style={{ marginTop: 20 }}>
        Already have an account? <a href="/login">Login</a>
      </p>

    </div>
  );
}