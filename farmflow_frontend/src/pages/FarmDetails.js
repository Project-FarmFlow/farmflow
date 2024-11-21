import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import actor from "../utils/actor";
import farmImage from "../utils/images";
import SensorDashboard from "./SensorDashboard";

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
  if (farm === null) {
    return (
      <div className="h-screen bg-gray-50">
        <div>
          <p className="text-black">Farm not found</p>
        </div>
      </div>
    );
  }
  console.log(farm);

  return (
    <div className="">
      <div>
        {/* Let us use a default image for the farm for now */}
        <img
          src={farmImage}
          alt="farm"
          className="w-full md:h-[38rem] h-96 object-cover rounded-md"
        />
        <p className="text-black my-4">Farm Name: {farm.name}</p>
        <p className="text-black my-4">Farm Location: {farm.location}</p>
        <p className="text-black my-4">Sensors: {farm.sensors.length}</p>
        <SensorDashboard />
      </div>
    </div>
  );
}

export default FarmDetails;
