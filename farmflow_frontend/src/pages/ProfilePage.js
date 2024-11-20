import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const farmerDetails = {
    profilePic: "https://townsquare.media/site/366/files/2022/02/attachment-oli_sykes_bmth_2022_red_carpet_photo.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89", // Replace with actual profile pic URL
    username: "JohnDoe",
    email: "john.doe@example.com",
    phone: "+123456789",
    location: "Springfield, USA",
    bio: "Passionate farmer with a focus on sustainable and smart farming practices.",
    greenhouses: ["Greenhouse A", "Greenhouse B", "Farm 1"],
  };

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(farmerDetails.profilePic);
  const [newUsername, setNewUsername] = useState(farmerDetails.username);
  const [newEmail, setNewEmail] = useState(farmerDetails.email);
  const [newPhone, setNewPhone] = useState(farmerDetails.phone);
  const [newLocation, setNewLocation] = useState(farmerDetails.location);
  const [newBio, setNewBio] = useState(farmerDetails.bio);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    // Here you would typically handle the form submission (e.g., API request) to save changes

    // Simulate saving and show success message
    setSuccessMessage("Your profile has been successfully updated!");

    // After showing success message, redirect to the profile page
    setTimeout(() => {
      setSuccessMessage(null); // Hide the success message after 2 seconds
      setIsEditing(false); // Close the edit form
      navigate("/profile"); // Redirect to profile page
    }, 2000); // 2 seconds for the success message to show
  };

  const handleCancel = () => {
    // Close the edit form without saving any changes
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={newProfilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{newUsername}</h1>
            <p className="text-gray-600">{newBio}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg">Contact Information</h2>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong> {newEmail}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Phone:</strong> {newPhone}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Location:</strong> {newLocation}
            </p>
          </div>

          {/* Greenhouses/Farms */}
          <div>
            <h2 className="font-semibold text-lg">Greenhouses / Farms</h2>
            <ul className="mt-2 space-y-1 text-gray-600">
              {farmerDetails.greenhouses.map((farm, index) => (
                <li key={index} className="list-disc list-inside">
                  {farm}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProfilePic(URL.createObjectURL(e.target.files[0]))}
                  className="mt-2"
                />
                <img
                  src={newProfilePic}
                  alt="New Profile"
                  className="w-24 h-24 mt-2 rounded-full object-cover"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bio</label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="mt-2 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
