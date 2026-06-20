// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// // Public Pages
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";

// // User Pages
// import Dashboard from "./pages/Dashboard";
// import TripHistory from "./pages/TripHistory";
// import Profile from "./pages/Profile";

// // Trip Flow
// import TripPreferences from "./pages/TripPreferences";
// import AISuggestions from "./pages/AISuggestions";
// import ItineraryBuilder from "./pages/ItineraryBuilder";
// import InviteCollaborators from "./pages/InviteCollaborators";
// import GroupVoting from "./pages/GroupVoting";
// import TripSummary from "./pages/TripSummary";
// import EditTrip from "./pages/EditTrip";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* Public */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//         {/* Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Trip Flow */}
//         <Route path="/trip/create/preferences" element={<TripPreferences />} />

//         {/* ✅ FIXED ROUTES */}
//         <Route path="/trip/:tripId/ai" element={<AISuggestions />} />
//         <Route path="/trip/:tripId/editor" element={<ItineraryBuilder />} />
//         <Route path="/trip/:tripId/invite" element={<InviteCollaborators />} />
//         <Route path="/trip/:tripId/vote" element={<GroupVoting />} />
//         <Route path="/trip/:tripId/summary" element={<TripSummary />} />
//         <Route path="/trip/:id/edit" element={<EditTrip />} />

//         {/* Other Pages */}
//         <Route path="/history" element={<TripHistory />} />
//         <Route path="/profile" element={<Profile />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";

// User Pages
import Dashboard from "./pages/Dashboard";
import TripHistory from "./pages/TripHistory";
import Profile from "./pages/Profile";

// Trip Flow
import TripPreferences from "./pages/TripPreferences";
import AISuggestions from "./pages/AISuggestions";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import InviteCollaborators from "./pages/InviteCollaborators";
import GroupVoting from "./pages/GroupVoting";
import TripSummary from "./pages/TripSummary";
import EditTrip from "./pages/EditTrip";

// ⭐ NEW PAGE
import InviteAccept from "./pages/InviteAccept";

function App() {
return ( <Router> <Routes>


    {/* Public */}
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />

    {/* Dashboard */}
    <Route path="/dashboard" element={<Dashboard />} />

    {/* Trip Flow */}
    <Route path="/trip/create/preferences" element={<TripPreferences />} />

    {/* Trip Routes */}
    <Route path="/trip/:tripId/ai" element={<AISuggestions />} />
    <Route path="/trip/:tripId/editor" element={<ItineraryBuilder />} />
    <Route path="/trip/:tripId/invite" element={<InviteCollaborators />} />
    <Route path="/trip/:tripId/vote" element={<GroupVoting />} />
    <Route path="/trip/:tripId/summary" element={<TripSummary />} />
    <Route path="/trip/:id/edit" element={<EditTrip />} />

    {/* ⭐ INVITE ACCEPT PAGE */}
    <Route path="/trip/:tripId/accept-invite" element={<InviteAccept />} />

    {/* Other Pages */}
    <Route path="/history" element={<TripHistory />} />
    <Route path="/profile" element={<Profile />} />

  </Routes>
</Router>


);
}

export default App;
