import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "Farmer") {
      navigate("/farmer-form");
    } else if (role === "Consumer") {
      navigate("/consumer-form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Enter Your Details
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contact Info:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select your role</option>
            <option value="Farmer">Farmer</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UserDetailsPage;
