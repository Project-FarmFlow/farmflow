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

  console.log(temperature);

  // Simulate fetching sensor readings and historical data (replace with API call in real-world use)
  useEffect(() => {
    const fetchSensorData = () => {
      // Simulate sensor readings
      setSensorReadings({
        temperature: Math.random() * 30 + 15, // Random temperature between 15 and 45 °C
        humidity: Math.random() * 50 + 30, // Random humidity between 30% and 80%
        soilMoisture: Math.random() * 50 + 10, // Random soil moisture between 10% and 60%
        soilPH: Math.random() * 2 + 5, // Random pH between 5 and 7
      });

      // Simulate historical data (replace with actual historical data)
      setHistoricalData({
        temperature: [...historicalData.temperature, Math.random() * 30 + 15],
        humidity: [...historicalData.humidity, Math.random() * 50 + 30],
        soilMoisture: [...historicalData.soilMoisture, Math.random() * 50 + 10],
        soilPH: [...historicalData.soilPH, Math.random() * 2 + 5],
      });
    };

    fetchSensorReadings("Temperature");

    const interval = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [historicalData]);

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
      <h1 className="text-3xl font-semibold text-center mb-6">
        Sensor Dashboard
      </h1>

      {/* Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Temperature</h3>
          <p className="text-2xl">{sensorReadings.temperature.toFixed(2)} °C</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Humidity</h3>
          <p className="text-2xl">{sensorReadings.humidity.toFixed(2)} %</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil Moisture</h3>
          <p className="text-2xl">{sensorReadings.soilMoisture.toFixed(2)} %</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Soil pH</h3>
          <p className="text-2xl">{sensorReadings.soilPH.toFixed(2)}</p>
        </div>
      </div>

      {/* Historical Data - Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
