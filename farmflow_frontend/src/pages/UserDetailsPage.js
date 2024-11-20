import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import actor from "../utils/actor";
import { authSubscribe } from "@junobuild/core";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authSubscribe((user) => {
      console.log("User:", user);
      setUser(user);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      alert("Please login to continue");
      return;
    }
    try {
      setLoading(true);
      await actor.createFarmer(
        user.key,
        userDetails.name,
        userDetails.name,
        userDetails.email,
        userDetails.phoneNumber,
        userDetails.location,
        "basic",
        []
      );
      if (role === "Farmer") {
        navigate("/farmer-form");
      } else if (role === "Consumer") {
        navigate("/consumer-form");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <span className="loading loading-dots loading-lg bg-green-500"></span>
      <h1 className="text-white ml-4 text-lg">Loading...</h1>
    </div>
  );

  return (
    <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
      {loading && <LoadingOverlay />}
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
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number: </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            required
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                location: e.target.value,
              })
            }
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
