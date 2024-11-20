import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    // Mock notifications data
    { id: 1, message: "High temperature detected!", type: "warning" },
    { id: 2, message: "Soil moisture is low!", type: "alert" },
  ]);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
