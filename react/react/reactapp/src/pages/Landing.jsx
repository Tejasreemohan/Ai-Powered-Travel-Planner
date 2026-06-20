// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-container">
//       <div className="overlay">
//         <div className="landing-content">
//           <h1>AI Travel Planner</h1>

//           <p className="tagline">
//             Plan smarter. Travel better. Enjoy stress-free group planning powered by AI.
//           </p>

//           <p className="description">
//             Create trips, get AI recommendations, collaborate with your friends,
//             build itineraries, track budgets, and enjoy seamless travel planning —
//             all in one place.
//           </p>

//           <Button
//             text="Get Started"
//             onClick={() => navigate("/login")}
//             style={{ width: "200px", marginTop: "20px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <div className="overlay">

        <div className="landing-content">

          <h1>IntelliTrip</h1>

          <p className="description">
           IntelliTrip is an AI-driven travel planning platform designed to help users collaboratively organize trips through intelligent traveller matching and personalized itinerary creation. It streamlines group travel coordination by minimizing conflicts and delivering smart, AI-powered travel recommendations.
          </p>

          <Button
            text="Get Started"
            onClick={() => navigate("/login")}
            style={{ width: "200px", marginTop: "20px" }}
          />

        </div>

      </div>

    </div>
  );
}