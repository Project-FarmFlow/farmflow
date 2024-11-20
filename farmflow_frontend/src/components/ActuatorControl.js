import React from "react";

const ActuatorControl = () => {
  const handleToggle = (actuator) => {
    // API call to toggle actuator state
    console.log(`Toggling ${actuator}`);
    // Add axios call to toggle actuator (e.g., `/api/toggle?actuator=${actuator}`)
  };

  return (
    <div>
      <h3>Control Panel</h3>
      <button onClick={() => handleToggle("pump")}>Toggle Pump</button>
      <button onClick={() => handleToggle("light")}>Toggle Light</button>
    </div>
  );
};

export default ActuatorControl;
