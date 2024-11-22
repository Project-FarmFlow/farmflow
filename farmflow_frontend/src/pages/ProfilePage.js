import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authSubscribe, signOut } from "@junobuild/core";
import actor from "../utils/actor";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [farmer, setFarmer] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    greenhouses: [],
    notifications: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFarmer = async (farmerId) => {
    if (farmerId === null) {
      toast.error("Please login to continue");
      return;
    }
    try {
      setLoading(true);
      const farmer = await actor.getFarmerById(farmerId);
      setFarmer(farmer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    authSubscribe((user) => {
      setUser(user);
    });
  });

  useEffect(() => {
    if (user) {
      fetchFarmer(user.key);
    }
  }, [user]);

  if (user === null) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <h1 className="text-white ml-4 text-lg">Not logged in.</h1>
        <button
          className="bg-green-500 rounded-md font-bold text-lg py-2 px-8 text-white my-4"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </div>
    );
  }

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50">
        <span className="loading loading-dots loading-lg bg-green-500"></span>
        <h1 className="text-white ml-4 text-lg">Please wait...</h1>
      </div>
    );
  }

  console.log(farmer);

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrbDY4WchJxm38MkjaCOIrSFO9l1XkWECZA&s"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{farmer.username}</h1>
            <p className="text-gray-600">Subscription: {farmer.subscription}</p>
            <button
              onClick={handleSignOut}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg">Contact Information</h2>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong> {farmer.email}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Phone:</strong> {farmer.phone}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Location:</strong> {farmer.location.toUpperCase()}
            </p>
          </div>

          {/* Greenhouses/Farms */}
          <div>
            <h2 className="font-semibold text-lg">Greenhouses / Farms</h2>
            <ul className="mt-2 space-y-1 text-gray-600">
              {farmer.greenhouses.length > 0 &&
                farmer.greenhouses.map((greenhouse, index) => (
                  <li key={index} className="list-disc list-inside">
                    {greenhouse.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
