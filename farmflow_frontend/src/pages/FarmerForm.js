import React from "react";

const FarmerForm = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Farmer Details
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Farm Location:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Farm Size:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerForm;
