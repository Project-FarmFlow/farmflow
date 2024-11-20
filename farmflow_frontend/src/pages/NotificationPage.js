import React, { useState } from "react";
import { FaWater, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { MdAlarm } from "react-icons/md";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Irrigation Activated",
      description: "The irrigation system has been automatically activated. Soil moisture levels are optimal.",
      type: "info",
      date: "2024-11-19 09:30 AM",
      read: false,
      icon: <FaWater className="text-blue-600 text-2xl" />,
    },
    {
      id: 2,
      title: "Soil Moisture Alert",
      description: "Soil moisture level has dropped below the optimal threshold. Irrigation has been triggered.",
      type: "warning",
      date: "2024-11-19 08:15 AM",
      read: false,
      icon: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
    },
    {
      id: 3,
      title: "Pump Status Change",
      description: "The water pump has been turned ON. Please ensure adequate water supply to the system.",
      type: "alert",
      date: "2024-11-18 03:45 PM",
      read: true,
      icon: <MdAlarm className="text-red-600 text-2xl" />,
    },
    {
      id: 4,
      title: "Produce Purchase Confirmation",
      description: "Your produce has been successfully purchased by GreenHarvest Farms.",
      type: "info",
      date: "2024-11-18 03:45 PM",
      read: true,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">Notifications</h1>
        <p className="text-xl md:text-2xl mb-6">
          Stay updated with the latest alerts, status changes, and threshold notifications from your IoT system.
        </p>
      </section>

      {/* Notifications List Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">Recent Notifications</h2>
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md ${
                notification.read ? "bg-gray-100" : "bg-white"
              } border-l-4 ${
                notification.type === "alert"
                  ? "border-red-600"
                  : notification.type === "warning"
                  ? "border-yellow-500"
                  : "border-blue-600"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {notification.icon}
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">{notification.title}</h3>
                </div>
                <span className="text-sm text-gray-500">{notification.date}</span>
              </div>
              <p className="text-lg text-gray-700">{notification.description}</p>
              <button
                onClick={() => handleMarkAsRead(notification.id)}
                className="mt-4 text-sm text-green-600 hover:text-green-800 transition duration-300"
              >
                {notification.read ? "Marked as Read" : "Mark as Read"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Notification Preferences Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">Notification Preferences</h2>
        <div className="max-w-xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">Soil Moisture Threshold</span>
              <input
                type="number"
                min="0"
                max="100"
                className="w-24 p-2 border border-gray-300 rounded-md"
                placeholder="40%"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">Pump Status Notifications</span>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>Notify on Pump ON/OFF</option>
                <option>Notify only when Pump ON</option>
                <option>Notify only when Pump OFF</option>
                <option>No Notification</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-700">Produce Purchase Notifications</span>
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
