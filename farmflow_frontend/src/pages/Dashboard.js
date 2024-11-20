import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // State for farms/greenhouses
  const [farms, setFarms] = useState([]);
  const [showAddFarmPage, setShowAddFarmPage] = useState(false);

  // Temporary form state for adding farm/greenhouse
  const [newFarm, setNewFarm] = useState({
    type: "farm", // or "greenhouse"
    name: "",
    location: "",
    crop: "",
    sensors: [],
    image: null,
  });

  // Available parameters
  const availableParameters = [
    "Temperature",
    "Humidity",
    "Soil Moisture",
    "Soil pH",
  ];

  // Function to handle form submission
  const handleAddFarm = () => {
    if (newFarm.name && newFarm.location && newFarm.crop && newFarm.sensors.length > 0) {
      setFarms([...farms, newFarm]);
      setShowAddFarmPage(false);
    } else {
      alert("Please fill out all required fields and select at least one parameter.");
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFarm({ ...newFarm, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Handle parameter selection
  const handleSensorChange = (event) => {
    const { value, checked } = event.target;
    setNewFarm((prevFarm) => {
      let updatedSensors = [...prevFarm.sensors];
      if (checked) {
        updatedSensors.push(value);
      } else {
        updatedSensors = updatedSensors.filter((sensor) => sensor !== value);
      }
      return { ...prevFarm, sensors: updatedSensors };
    });
  };

  // Render "Add Farm/Greenhouse" page
  if (showAddFarmPage) {
    return (
      <div className="bg-gray-50 min-h-screen py-6 px-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">Add Farm or Greenhouse</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFarm();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Type</label>
                <select
                  value={newFarm.type}
                  onChange={(e) => setNewFarm({ ...newFarm, type: e.target.value })}
                  className="border rounded-lg w-full px-4 py-2"
                >
                  <option value="farm">Farm</option>
                  <option value="greenhouse">Greenhouse</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={newFarm.location}
                  onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Crop</label>
                <input
                  type="text"
                  placeholder="Enter crop"
                  value={newFarm.crop}
                  onChange={(e) => setNewFarm({ ...newFarm, crop: e.target.value })}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              {/* Parameter selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Select Sensors/Parameters</label>
                <div className="grid grid-cols-2 gap-4">
                  {availableParameters.map((param, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={param}
                        value={param}
                        checked={newFarm.sensors.includes(param)}
                        onChange={handleSensorChange}
                        className="mr-2"
                      />
                      <label htmlFor={param} className="text-gray-700">{param}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image upload field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              {/* Display image preview if available */}
              {newFarm.image && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Image Preview</label>
                  <img src={newFarm.image} alt="Farm Image" className="w-full rounded-lg" />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowAddFarmPage(false)} // Cancel action
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // Render initial "Get Started" page if no farms exist
  if (farms.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-6 px-6">
        <section className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            Welcome to your Dashboard!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Get started by adding your first farm or greenhouse.
          </p>
          <button
            onClick={() => setShowAddFarmPage(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Farm/Greenhouse
          </button>
        </section>
      </div>
    );
  }

  // Render main Dashboard
  return (
    <div className="bg-gray-50 min-h-screen py-6 px-6">
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">My Farms/Greenhouses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm, index) => (
            <div
              key={index}
              onClick={() => navigate(`/farm/${index}`)} // Navigate to farm details
              className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
            >
              {/* Image at the top of the card */}
              {farm.image && <img src={farm.image} alt="Farm Preview" className="w-full mb-4 rounded-lg" />}
              <h3 className="text-xl font-semibold text-gray-700">{farm.name}</h3>
              <p className="text-gray-600">{farm.type === "farm" ? "Farm" : "Greenhouse"}</p>
              <p className="text-gray-600">{farm.crop}</p>
              <p className="text-gray-600">{farm.location}</p>
              <p className="text-gray-600">{farm.sensors.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
      <button
        onClick={() => setShowAddFarmPage(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Add Farm/Greenhouse
      </button>
    </div>
  );
};

export default Dashboard;
