import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authSubscribe, signOut } from "@junobuild/core";
import actor from "../utils/actor";
import farmImage from "../utils/images";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newFarm, setNewFarm] = useState({
    type: "farm", // or "greenhouse"
    name: "",
    location: "",
    crop: "",
    sensors: [],
    image: null,
  });
  // State for farms/greenhouses
  const [farms, setFarms] = useState([]);
  const [showAddFarmPage, setShowAddFarmPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFarmerDetails = async (id) => {
    if (!id) {
      alert("Please login to continue");
      return;
    }
    try {
      setLoading(true);
      const farmer = await actor.getFarmerById(id);
      setFarms(farmer.greenhouses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    authSubscribe((user) => {
      setUser(user);
    });
  });

  useEffect(() => {
    if (user) {
      fetchFarmerDetails(user.key);
    }
  }, [user]);

  // Available parameters
  const availableParameters = [
    "Temperature",
    "Humidity",
    "Soil Moisture",
    "Soil pH",
  ];

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };

  // Function to handle form submission
  const handleAddFarm = () => {
    try {
      setLoading(true);
      if (newFarm.name && newFarm.location && newFarm.crop) {
        actor.createGreenHouse(
          generateRandomNumber(),
          newFarm.name,
          newFarm.location,
          user.key,
          [],
          50.64
        );
        setLoading(false);
        setShowAddFarmPage(false);
      } else {
        alert(
          "Please fill out all required fields and select at least one parameter."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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

  const NoUserOverLay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <h1 className="text-white ml-4 text-lg">Not logged in.</h1>
      <button
        className="bg-green-500 rounded-md font-bold text-lg py-2 px-8"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <span className="loading loading-dots loading-lg bg-green-500"></span>
      <h1 className="text-white ml-4 text-lg">Loading...</h1>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen relative bg-gray-50 flex items-center justify-center">
        <NoUserOverLay />
      </div>
    );
  }

  // Render "Add Farm/Greenhouse" page
  if (showAddFarmPage) {
    return (
      <div className="bg-gray-50 min-h-screen py-6 px-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            Add Farm or Greenhouse
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFarm();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Type
                </label>
                <select
                  value={newFarm.type}
                  onChange={(e) =>
                    setNewFarm({ ...newFarm, type: e.target.value })
                  }
                  className="border rounded-lg w-full px-4 py-2"
                >
                  <option value="farm">Farm</option>
                  <option value="greenhouse">Greenhouse</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={newFarm.name}
                  onChange={(e) =>
                    setNewFarm({ ...newFarm, name: e.target.value })
                  }
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={newFarm.location}
                  onChange={(e) =>
                    setNewFarm({ ...newFarm, location: e.target.value })
                  }
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Crop
                </label>
                <input
                  type="text"
                  placeholder="Enter crop"
                  value={newFarm.crop}
                  onChange={(e) =>
                    setNewFarm({ ...newFarm, crop: e.target.value })
                  }
                  className="border rounded-lg w-full px-4 py-2"
                />
              </div>

              {/* Parameter selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Select Sensors/Parameters
                </label>
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
                      <label htmlFor={param} className="text-gray-700">
                        {param}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image upload field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Image
                </label>
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
                  <label className="block text-gray-700 font-bold mb-2">
                    Image Preview
                  </label>
                  <img
                    src={newFarm.image}
                    alt="Farm Image"
                    className="w-full rounded-lg"
                  />
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
      <div className="bg-gray-50 relative min-h-screen py-6 px-6">
        {loading && <LoadingOverlay />}
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
    <div className="bg-gray-50 relative min-h-screen py-6 px-6">
      {!user && <LoadingOverlay />}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          My Greenhouses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm, index) => (
            <div
              key={index}
              onClick={() => navigate(`/farm/${farm.id}`)} // Navigate to farm details
              className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
            >
              {/* Image at the top of the card */}

              <img
                src={farmImage}
                alt="Farm Preview"
                className="w-full mb-4 rounded-lg"
              />

              <h3 className="text-xl font-semibold text-gray-700">
                {farm.name}
              </h3>
              <p className="text-gray-600">GreenHouse🚜</p>
              <p className="text-gray-600">Any</p>
              <p className="text-gray-600">{farm.location}</p>
              <p className="text-gray-600">Sensors</p>
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
