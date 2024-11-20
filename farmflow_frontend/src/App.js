import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import NotificationPage from "./pages/NotificationPage";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage"; // Import the Profile page
import MarketplacePage from "./pages/MarketplacePage"; // Import the Marketplace page
import Navbar from "./components/Navbar";

import UserDetailsPage from "./pages/UserDetailsPage";
import FarmerForm from "./pages/FarmerForm";
import ConsumerForm from "./pages/ConsumerForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-4 md:py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
            <Route path="/marketplace" element={<MarketplacePage />} /> {/* Marketplace Page */}
            <Route path="/user-details" element={<UserDetailsPage />} />
            <Route path="/farmer-form" element={<FarmerForm />} />
            <Route path="/consumer-form" element={<ConsumerForm />} />
          </Routes>
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            <p>© 2024 FarmFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
