import React, { useState, useEffect } from "react";
import { FaWater, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { MdAlarm } from "react-icons/md";
import { authSubscribe } from "@junobuild/core";
import actor from "../utils/actor";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const fetchFarmer = async (farmerId) => {
    if (farmerId === null) {
      toast.error("Please login to continue");
      return;
    }
    try {
      setLoading(true);
      const farmer = await actor.getFarmerById(farmerId);
      setNotifications(farmer.notifications);
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">Notifications</h1>
        <p className="text-xl md:text-2xl mb-6">
          Stay updated with the latest alerts, status changes, and threshold
          notifications from your IoT system.
        </p>
      </section>

      {/* Notifications List Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">
          Recent Notifications
        </h2>
        {loading && (
          <span className="loading loading-dots loading-lg text-center bg-green-500"></span>
        )}
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md ${
                notification.read ? "bg-gray-100" : "bg-white"
              } border-l-4 ${
                notification.title === "Welcome"
                  ? "border-green-600"
                  : notification.title === "GreenHouse Created"
                  ? "border-blue-500"
                  : "border-yellow-600"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <MdAlarm />
                  <h3 className="text-base md:text-xl font-semibold text-gray-800 ml-3">
                    {notification.title}
                  </h3>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(Number(notification.timestamp)), "PPp")}
                </span>
              </div>
              <p className="text-sm text-gray-700">{notification.message}</p>
              {/* <button
                onClick={() => handleMarkAsRead(notification.id)}
                className="mt-4 text-sm text-green-600 hover:text-green-800 transition duration-300"
              >
                {notification.read ? "Marked as Read" : "Mark as Read"}
              </button> */}
            </div>
          ))}
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Notification Preferences
        </h2>
        <div className="max-w-xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">
                Soil Moisture Threshold
              </span>
              <input
                type="number"
                min="0"
                max="100"
                className="w-24 p-2 border border-gray-300 rounded-md"
                placeholder="40%"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">
                Pump Status Notifications
              </span>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>Notify on Pump ON/OFF</option>
                <option>Notify only when Pump ON</option>
                <option>Notify only when Pump OFF</option>
                <option>No Notification</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">
                Produce Purchase Notifications
              </span>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>Notify when Produce is Purchased</option>
                <option>Notify on Status Change</option>
                <option>No Notification</option>
              </select>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300">
            Save Preferences
          </button>
        </div>
      </section>
    </div>
  );
};

export default NotificationsPage;
