import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, authSubscribe } from "@junobuild/core";
import actor from "../utils/actor";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleNavigation = async () => {
    try {
      setLoading(true);
      await signIn();
      if (user?.key) {
        const checkFarmer = await actor.checkIfFarmerIsRegistered(user.key);
        if (checkFarmer) {
          setLoading(false);
          navigate("/dashboard");
        } else {
          setLoading(false);
          navigate("/user-details");
        }
      } else {
        setLoading(false);
        console.error("User key is undefined");
      }
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

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <span className="loading loading-dots loading-lg bg-green-500"></span>
      <h1 className="text-white ml-4 text-lg">Loading...</h1>
    </div>
  );

  return (
    <div className="bg-gray-50 relative min-h-screen">
      {loading && <LoadingOverlay />}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to FarmFlow
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Revolutionizing farm management through IoT and Blockchain for
          real-time monitoring and automated control.
        </p>
        <button
          className="px-8 py-3 bg-white text-green-600 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 transition ease-in-out duration-300"
          onClick={handleNavigation}
        >
          Get Started
        </button>
      </section>

      {/* About FarmFlow Section */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-4xl font-semibold text-green-600">
          What is FarmFlow?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          FarmFlow empowers farmers with real-time monitoring of their farm's
          environment. With IoT sensors and blockchain, farmers can manage farm
          operations efficiently, track environmental data, and ensure
          transparency in their practices.
        </p>
        <div className="mt-12 max-w-4xl mx-auto">
          <img
            src="https://media.istockphoto.com/id/1424529698/photo/agriculture-technology-farmer-woman-holding-tablet-or-tablet-technology-to-research-about.jpg?s=612x612&w=0&k=20&c=VGVlUp76BAGqL1wRfjfD3RlxR-wE8KCWpberWjkzUxE=" // Replace with a real image URL
            alt="FarmFlow Concept"
            className="w-full rounded-lg shadow-lg mt-6"
          />
        </div>
      </section>

      {/* Real-time Monitoring Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold text-green-600 text-center">
          Real-Time Farm Monitoring
        </h2>
        <p className="mt-4 text-lg text-center text-gray-700 max-w-2xl mx-auto">
          Stay connected to your farm, anytime, anywhere. Monitor key parameters
          in real time for efficient and sustainable farming:
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">
              Soil Moisture
            </h3>
            <p className="mt-4 text-gray-600">
              Track moisture levels to ensure optimal irrigation and crop
              health.
            </p>
            <img
              src="https://media.istockphoto.com/id/1463452333/photo/smart-farming-holding-young-plant-smart-farming-and-precision-agriculture-4-0-agriculture.jpg?s=612x612&w=0&k=20&c=0ZDWbEGUdURDlF7yZx6gM2EKiGPRbumuKnIG7vsrTTQ=" // Replace with real image
              alt="Soil Moisture"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">pH Level</h3>
            <p className="mt-4 text-gray-600">
              Monitor soil pH to maintain nutrient balance and maximize crop
              yield.
            </p>
            <img
              src="https://media.istockphoto.com/id/1429073633/photo/maize-seedling-in-cultivated-agricultural-field-with-graphic-concepts-modern-agricultural.jpg?s=612x612&w=0&k=20&c=eOykLrmibVP-GPQo5Mf4BgTt90Sf5U5m7O7hLxB5Rww=" // Replace with real image
              alt="pH Level"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">
              Temperature
            </h3>
            <p className="mt-4 text-gray-600">
              Keep track of temperature fluctuations that can affect crop
              growth.
            </p>
            <img
              src="https://media.istockphoto.com/id/1320570592/photo/maize-seedling-in-cultivated-agricultural-field-with-graphic-concepts-modern-agricultural.jpg?s=612x612&w=0&k=20&c=hNCJUuhPnVSCyK0se9abAsaBJiW2GwSXKLEJKwoZ9UU=" // Replace with real image
              alt="Temperature"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">Humidity</h3>
            <p className="mt-4 text-gray-600">
              Monitor humidity levels to avoid crop diseases and optimize growth
              conditions.
            </p>
            <img
              src="https://media.istockphoto.com/id/1255871842/photo/smart-farming-with-iot-futuristic-agriculture-concept.jpg?s=612x612&w=0&k=20&c=Hp35B5ct8z1dzv3onOTZ_WTrJu1t9FcvQRnyAdWUpoA=" // Replace with real image
              alt="Humidity"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Irrigation Controls Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-semibold text-green-600 text-center">
          Irrigation Control
        </h2>
        <p className="mt-4 text-lg text-center text-gray-700 max-w-2xl mx-auto">
          Manage irrigation systems easily with automated and manual controls,
          designed to optimize water usage and improve farm productivity.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">
              Automatic Irrigation
            </h3>
            <p className="mt-4 text-gray-600">
              Automatically adjust watering schedules based on real-time soil
              data.
            </p>
            <img
              src="https://media.istockphoto.com/id/1266559179/photo/smart-robotic-farmers-in-agriculture-futuristic-robot-automation-work-water-the-plants.jpg?s=612x612&w=0&k=20&c=SQI2VPzphDqGIUdnThnoxoj0QjxFUGs4QS2VMX4vOUo=" // Replace with real image
              alt="Automatic Irrigation"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-green-600">
              Manual Control
            </h3>
            <p className="mt-4 text-gray-600">
              Manually control your irrigation system from the dashboard,
              offering full flexibility.
            </p>
            <img
              src="https://media.istockphoto.com/id/1468849156/photo/robot-hand-touch-automatic-lawn-sprinkler-and-icon-of-smart-farming-concept-smart-agriculture.jpg?s=612x612&w=0&k=20&c=aIoISoHW5-HsTEPrHqpwarGGzah5ytioQl6KdNZq46Q=" // Replace with real image
              alt="Manual Control"
              className="w-full h-32 object-cover mt-4 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Blockchain Integration Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-semibold text-green-600 text-center">
          Blockchain Integration
        </h2>
        <p className="mt-4 text-lg text-center text-gray-700 max-w-3xl mx-auto">
          All farm data is securely stored on the blockchain, ensuring
          transparency, traceability, and immutability. Trust and security are
          the core principles of FarmFlow.
        </p>
        <div className="mt-12 max-w-4xl mx-auto">
          <img
            src="https://media.istockphoto.com/id/1356566540/photo/technology-in-the-field-digital-tablet.jpg?s=612x612&w=0&k=20&c=qBBMxJrCHGvOJ2PAFhOOqPXfet4IKuZM5u0pKxuHHXU=" // Replace with real image
            alt="Blockchain Concept"
            className="w-full rounded-lg shadow-lg mt-6"
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold text-green-600">
          Start Using FarmFlow Today!
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Sign up now and take full control over your farm's environment and
          operations. Leverage IoT and blockchain for smarter, more efficient
          farming.
        </p>
        <button
          className="mt-8 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition ease-in-out duration-300"
          onClick={() => navigate("/user-details")}
        >
          Get Started
        </button>
      </section>

      {/* Footer
      <footer className="bg-white border-t mt-16 py-6 text-center text-gray-600">
        <p>© 2024 FarmFlow. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomePage;
