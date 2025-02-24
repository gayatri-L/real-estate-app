
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const YourPreferences = ({ data }) => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(data);

  // Update state when new props arrive
  useEffect(() => {
    setPreferences(data);
    console.log("Updated preferences:", data);
  }, [data]);

  const allPreferencesProvided = preferences.bedrooms && preferences.budget && preferences.location;

  return (
    <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-extrabold text-yellow-400 mb-5 text-center">
        🏡 Your Preferences
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Bedrooms:</span>
          <span>{preferences.bedrooms || <span className="text-red-400">Not Provided</span>}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Budget:</span>
          <span>{preferences.budget || <span className="text-red-400">Not Provided</span>}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Location:</span>
          <span>{preferences.location || <span className="text-red-400">Not Provided</span>}</span>
        </div>
      </div>

      {!allPreferencesProvided && (
        <p className="text-red-500 mt-4 text-center font-medium animate-pulse">
          ⚠️ Please fill in all details.
        </p>
      )}

      {allPreferencesProvided && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate("/properties", { state: preferences })}
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
          >
            🔍 Check Now
          </button>
          

        </div>
       
      )}
      
    </section>
    
  );
};

export default YourPreferences;
