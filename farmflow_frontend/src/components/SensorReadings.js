import React, { useEffect, useState } from "react";
import axios from "axios";

const SensorReadings = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    soilMoisture: null,
  });

  useEffect(() => {
    // Fetch sensor data from the API (replace with your actual endpoint)
    axios.get("/api/sensors")
      .then(response => setSensorData(response.data))
      .catch(error => console.error("Error fetching sensor data:", error));
  }, []);

  return (
    <div>
      <h3>Sensor Readings</h3>
      <p>Temperature: {sensorData.temperature} °C</p>
      <p>Humidity: {sensorData.humidity} %</p>
      <p>Soil Moisture: {sensorData.soilMoisture} %</p>
    </div>
  );
};

export default SensorReadings;
