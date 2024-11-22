import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import actor from "../utils/actor";
import farmImage from "../utils/images";
import SensorDashboard from "./SensorDashboard";
import { authSubscribe, signOut } from "@junobuild/core";
import generateRandomNumber from "../utils/random";
import toast from "react-hot-toast";

function FarmDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [farm, setFarm] = useState(null);

  const fetchFarm = async (id) => {
    setLoading(true);
    // Fetch farm details
    const farm = await actor.getGreenHouseById(Number(id));
    setFarm(farm);
    setLoading(false);
  };

  useEffect(() => {
    fetchFarm(id);
  }, []);

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <span className="loading loading-dots loading-lg bg-green-500"></span>
      <h1 className="text-white ml-4 text-lg">Loading...</h1>
    </div>
  );
  if (loading) {
    return <LoadingOverlay />;
  }
  if (farm === null || id === undefined) {
    return (
      <div className="h-screen bg-gray-50">
        <div>
          <p className="text-black">Farm not found</p>
        </div>
      </div>
    );
  }

  const AddSensorModal = () => {
    const [sensorDetails, setSensorDetails] = useState({
      name: "",
      type: "",
      condition: "",
    });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      authSubscribe((user) => {
        setUser(user);
      });
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        sensorDetails.name === "" ||
        sensorDetails.type === "" ||
        sensorDetails.condition === ""
      ) {
        alert("Please fill all fields");
        return;
      }
      if (user === null) {
        alert("Please login to continue");
        return;
      }
      try {
        setLoading(true);
        await actor.createSensor(
          user.key,
          generateRandomNumber(),
          sensorDetails.name,
          sensorDetails.type,
          id,
          sensorDetails.condition,
          []
        );
        document.getElementById("my_modal_1").close();
        toast.success("Sensor added successfully", {
          className: "z-50",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    return (
      <dialog id="my_modal_1" className="modal backdrop-blur-sm">
        {loading ? (
          <span className="loading loading-dots loading-lg bg-green-500"></span>
        ) : (
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Add Sensor</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full"
              >
                <h2 className="text-2xl font-bold text-green-600 text-center">
                  Choose sensor details
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    required
                    onChange={(e) =>
                      setSensorDetails({
                        ...sensorDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Type:</label>
                  <select
                    value={sensorDetails.type}
                    onChange={(e) =>
                      setSensorDetails({
                        ...sensorDetails,
                        type: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select sensor type:</option>
                    <option value="Temperature">Temperature</option>
                    <option value="Humidity">Humidity</option>
                    <option value="Soil Moisture">Soil Moisture</option>
                    <option value="Soil pH">Soil pH</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Condition:</label>
                  <select
                    value={sensorDetails.condition}
                    onChange={(e) =>
                      setSensorDetails({
                        ...sensorDetails,
                        condition: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select sensor condition</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
                >
                  Add Sensor
                </button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    );
  };

  return (
    <div className="">
      <div>
        {/* Let us use a default image for the farm for now */}
        <img
          src={farmImage}
          alt="farm"
          className="w-full md:h-[38rem] h-96 object-cover rounded-md"
        />
        <p className="text-black my-4 font-bold text-3xl">
          {farm.name} GreenHouse
        </p>
        <p className="text-black my-4 font-semibold text-2xl">
          {farm.location}
        </p>
        <p className="text-lg my-4 text-gray-500 ">
          {farm.sensors.length} active sensors
        </p>
        {farm.sensors.length > 0 ? <SensorDashboard farmId={id} /> : null}
        <button
          className="btn bg-green-500 text-white border-none"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Sensor
        </button>
        <AddSensorModal />
      </div>
    </div>
  );
}

export default FarmDetails;
