import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import actor from "../utils/actor";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SensorDashboard = ({ farmId }) => {
  console.log(farmId);
  // State for sensor readings and historical data
  const [temperature, setTemperature] = useState({
    data: 0,
    timestamp: "",
  });
  const [humidity, setHumidity] = useState({
    data: 0,
    timestamp: "",
  });
  const [soilMoisture, setSoilMoisture] = useState({
    data: 0,
    timestamp: "",
  });
  const [soilPH, setSoilPH] = useState({
    data: 0,
    timestamp: "",
  });

  const [sensorReadings, setSensorReadings] = useState({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    soilPH: 0,
  });

  const [pumpStatus, setPumpStatus] = useState(false); // Whether the pump is on or off
  const [historicalData, setHistoricalData] = useState({
    temperature: [],
    humidity: [],
    soilMoisture: [],
    soilPH: [],
  });

  const fetchSensorReadings = async (typeOfSensor) => {
    const sensorExistsInGreenHouse = await actor.checkIfSensorTypeExists(
      typeOfSensor,
      Number(farmId)
    );
    if (!sensorExistsInGreenHouse) {
      return;
    }
    try {
      const response = await actor.getSensorReadings(
        typeOfSensor,
        Number(farmId)
      );
      if (response) {
        switch (typeOfSensor.toLowerCase()) {
          case "temperature":
            setTemperature(response);
            break;
          case "humidity":
            setHumidity(response);
            break;
          case "soil moisture":
            setSoilMoisture(response);
            break;
          case "soil ph":
            setSoilPH(response);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistoricalSensorData = async (typeOfSensor) => {
    const sensorExistsInGreenHouse = await actor.checkIfSensorTypeExists(
      typeOfSensor,
      Number(farmId)
    );
    if (!sensorExistsInGreenHouse) {
      return;
    }
    try {
      const response = await actor.getHistoricalData(
        typeOfSensor,
        Number(farmId)
      );
      if (response) {
        switch (typeOfSensor.toLowerCase()) {
          case "temperature":
            setHistoricalData({
              ...historicalData,
              temperature: response,
            });
            break;
          case "humidity":
            setHistoricalData({
              ...historicalData,
              humidity: response,
            });
            break;
          case "soil moisture":
            setHistoricalData({
              ...historicalData,
              soilMoisture: response,
            });
            break;
          case "soil ph":
            setHistoricalData({
              ...historicalData,
              soilPH: response,
            });
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Simulate fetching sensor readings and historical data (replace with API call in real-world use)
  useEffect(() => {
    fetchSensorReadings("Temperature");
    fetchSensorReadings("Humidity");
    fetchSensorReadings("Soil Moisture");
    fetchSensorReadings("Soil pH");

    fetchHistoricalSensorData("Temperature");
    fetchHistoricalSensorData("Humidity");
    fetchHistoricalSensorData("Soil Moisture");
    fetchHistoricalSensorData("Soil pH");
  }, []);

  console.log(temperature);
  console.log(humidity);
  console.log(soilMoisture);
  console.log(soilPH);

  // Handle turning the pump on/off
  const togglePump = () => {
    setPumpStatus(!pumpStatus);
    // You would send a command to turn the pump on/off here (e.g., through API or IoT device)
    console.log("Pump is now", pumpStatus ? "off" : "on");
  };

  // Chart data for historical data
  const getChartData = (label, data) => ({
    labels: Array.from({ length: data.length }, (_, i) => `Time ${i + 1}`),
    datasets: [
      {
        label: label,
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  });

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl text-black font-semibold text-center mb-6">
        Sensor Dashboard
      </h1>

      {/* Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-black">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Temperature</h3>
          <p className="text-2xl">{Number(temperature.data)} °C</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Humidity</h3>
          <p className="text-2xl">{Number(humidity.data)} %</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil Moisture</h3>
          <p className="text-2xl">{Number(soilMoisture.data)} %</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil pH</h3>
          <p className="text-2xl">{Number(soilPH.data)}</p>
        </div>
      </div>

      {/* Historical Data - Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-black">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Temperature History</h3>
          <Line
            data={getChartData("Temperature", historicalData.temperature)}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Humidity History</h3>
          <Line data={getChartData("Humidity", historicalData.humidity)} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil Moisture History</h3>
          <Line
            data={getChartData("Soil Moisture", historicalData.soilMoisture)}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil pH History</h3>
          <Line data={getChartData("Soil pH", historicalData.soilPH)} />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Pump Control</h3>
        <button
          onClick={togglePump}
          className={`w-full py-2 rounded-lg text-white ${
            pumpStatus ? "bg-red-600" : "bg-green-600"
          } hover:bg-opacity-80`}
        >
          {pumpStatus ? "Turn Pump Off" : "Turn Pump On"}
        </button>
      </div>
    </div>
  );
};

export default SensorDashboard;
