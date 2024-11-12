import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import RoomsPage from "./pages/RoomsPage";
import Booking from "./components/Booking";
import Facilities from "./pages/Facilities";
import AuthPage from "./pages/AuthPage";
import Navbar2 from "./components/Navbar2";
import "./index.css"; // Tailwind's CSS file
import AdminPage from "./components/AdminPage";
import { AuthProvider } from "./context/Authcontext";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <>
      {/* Render Navbar on all pages */}
    

      {/* Define Routes */}l
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Facilities" element={<Facilities />} />
        <Route path="/RoomsPage" element={<RoomsPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        


      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
