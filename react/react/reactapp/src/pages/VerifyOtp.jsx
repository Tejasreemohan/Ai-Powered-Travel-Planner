// // // import { useState } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import Button from "../components/Button";
// // // import FormInput from "../components/FormInput";
// // // import { verifyOtp } from "../utils/api";

// // // export default function VerifyOtp() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   // 🔐 SAFE email access
// // //   const email = location.state?.email;

// // //   const [otp, setOtp] = useState("");
// // //   const [error, setError] = useState("");

// // //   // 🚨 If user opens page directly
// // //   if (!email) {
// // //     return (
// // //       <div className="page-container">
// // //         <h2>Session Expired</h2>
// // //         <p>Please signup again.</p>
// // //         <Button text="Go to Signup" onClick={() => navigate("/signup")} />
// // //       </div>
// // //     );
// // //   }

// // //   const handleVerify = async () => {
// // //     setError("");

// // //     if (!otp) {
// // //       setError("Please enter OTP");
// // //       return;
// // //     }

// // //     try {
// // //       const res = await verifyOtp({ email, otp });

// // //       if (res.success) {
// // //         navigate("/login");
// // //       } else {
// // //         setError(res.message || "Invalid OTP");
// // //       }
// // //     } catch (err) {
// // //       setError("Server error");
// // //     }
// // //   };

// // //   return (
// // //     <div className="page-container">
// // //       <h2>Verify OTP</h2>

// // //       <p>OTP sent to: <b>{email}</b></p>

// // //       {error && <p style={{ color: "red" }}>{error}</p>}

// // //       <FormInput
// // //         label="Enter OTP"
// // //         value={otp}
// // //         onChange={(e) => setOtp(e.target.value)}
// // //       />

// // //       <Button text="Verify OTP" onClick={handleVerify} />
// // //     </div>
// // //   );
// // // }


// // import { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import Button from "../components/Button";
// // import FormInput from "../components/FormInput";
// // import { verifyOtp } from "../utils/api";

// // export default function VerifyOtp() {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const email = location.state?.email;

// //   const [otp, setOtp] = useState("");
// //   const [error, setError] = useState("");

// //   if (!email) {
// //     return (
// //       <div className="page-container">
// //         <h2>Session Expired</h2>
// //         <p>Please signup again.</p>

// //         <Button
// //           text="Go to Signup"
// //           onClick={() => navigate("/signup")}
// //         />
// //       </div>
// //     );
// //   }

// //   const handleVerify = async () => {
// //     setError("");

// //     if (!otp) {
// //       setError("Please enter OTP");
// //       return;
// //     }

// //     try {
// //       const res = await verifyOtp({ email, otp });

// //       if (res.success) {
// //         navigate("/login");
// //       } else {
// //         setError(res.message || "Invalid OTP");
// //       }

// //     } catch {
// //       setError("Server error");
// //     }
// //   };

// //   return (
// //     <div className="page-container">

// //       <h2>Verify OTP</h2>

// //       <p>OTP sent to: <b>{email}</b></p>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <FormInput
// //         label="Enter OTP"
// //         value={otp}
// //         onChange={(e) => setOtp(e.target.value)}
// //       />

// //       <Button
// //         text="Verify OTP"
// //         onClick={handleVerify}
// //       />

// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import FormInput from "../components/FormInput";
// import { verifyOtp } from "../utils/api";

// export default function VerifyOtp() {

// const location = useLocation();
// const navigate = useNavigate();

// const email = location.state?.email;

// const [otp, setOtp] = useState("");
// const [error, setError] = useState("");
// const [loading, setLoading] = useState(false);

// // if email not present
// if (!email) {
// return ( <div className="page-container"> <h2>Session Expired</h2> <p>Please signup again.</p>


//     <Button
//       text="Go to Signup"
//       onClick={() => navigate("/signup")}
//     />
//   </div>
// );


// }

// const handleVerify = async () => {


// setError("");

// if (!otp) {
//   setError("Please enter OTP");
//   return;
// }

// setLoading(true);

// try {

//   const res = await verifyOtp({ email, otp });

//   if (res.success) {

//     // 🔥 CHECK IF USER CAME FROM INVITE
//     const pendingTrip = localStorage.getItem("pendingInviteTrip");

//     if (pendingTrip) {
//       localStorage.removeItem("pendingInviteTrip");

//       alert("Signup successful! Please accept your invite.");

//       navigate(`/trip/${pendingTrip}/accept-invite`);
//     } else {
//       navigate("/login");
//     }

//   } else {
//     setError(res.message || "Invalid OTP");
//   }

// } catch (err) {
//   console.error(err);
//   setError("Server error. Try again.");
// } finally {
//   setLoading(false);
// }


// };

// return ( <div className="page-container">

//   <h2>Verify OTP</h2>

//   <p>
//     OTP sent to: <b>{email}</b>
//   </p>

//   {error && <p style={{ color: "red" }}>{error}</p>}

//   <FormInput
//     label="Enter OTP"
//     value={otp}
//     onChange={(e) => setOtp(e.target.value)}
//   />

//   <Button
//     text={loading ? "Verifying..." : "Verify OTP"}
//     onClick={handleVerify}
//     disabled={loading}
//   />

// </div>


// );
// }

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { verifyOtp } from "../utils/api";

export default function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="page-container">
        <h2>Session Expired</h2>
        <p>Please signup again.</p>

        <Button text="Go to Signup" onClick={() => navigate("/signup")} />
      </div>
    );
  }

  const handleVerify = async () => {

    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);

    try {

      const res = await verifyOtp({ email, otp });

      if (res.success) {

        // 🔥 store user email
        localStorage.setItem("userEmail", email);

        const pendingTrip = localStorage.getItem("pendingInviteTrip");

        if (pendingTrip) {

          // 🔥 FIX LOOP ISSUE
          localStorage.removeItem("pendingInviteTrip");

          navigate(`/trip/${pendingTrip}/accept-invite`);

        } else {
          navigate("/login");
        }

      } else {
        setError(res.message || "Invalid OTP");
      }

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <h2>Verify OTP</h2>

      <p>OTP sent to: <b>{email}</b></p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormInput
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button
        text={loading ? "Verifying..." : "Verify OTP"}
        onClick={handleVerify}
        disabled={loading}
      />

    </div>
  );
}