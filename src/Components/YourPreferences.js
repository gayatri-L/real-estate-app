
import React from "react";
import { useNavigate } from "react-router-dom";


const YourPreferences = ({ data }) => {
  const navigate = useNavigate();

  // Ensure each field has a distinct valid input
  const isComplete = 
    typeof data.bedrooms === "string" && data.bedrooms.trim() !== "" &&
    typeof data.budget === "string" && data.budget.trim() !== "" &&
    typeof data.location === "string" && data.location.trim() !== "" &&
    !["value", "Not Provided"].includes(data.bedrooms) &&
    !["value", "Not Provided"].includes(data.budget) &&
    !["value", "Not Provided"].includes(data.location) &&
    !/\s/.test(data.budget); // Ensure budget is a proper number

  const handleCheckNow = () => {
    console.log("Navigating with data:", data);
    navigate("/Display_D", { state: data });
  };

  return (
    <aside className="w-1/4 p-4 bg-gray-800 text-white">
      <h2 className="text-yellow-500 text-lg font-bold">Your Preferences</h2>
      <ul className="mt-4 space-y-2">
        <li><strong>Bedrooms:</strong> {data.bedrooms && data.bedrooms !== "value" ? data.bedrooms : "Not Provided"}</li>
        <li><strong>Budget:</strong> {data.budget && data.budget !== "value" ? data.budget : "Not Provided"}</li>
        <li><strong>Location:</strong> {data.location && data.location !== "value" ? data.location : "Not Provided"}</li>
      </ul>

      {/* Button appears only if ALL fields are correctly filled */}
      {isComplete ? (
        <button 
          onClick={handleCheckNow} 
          className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
          Check Now
        </button>
      ) : (
        <p className="text-red-500 mt-2">Please fill in all details.</p>
      )}
    </aside>
       
  );
};

export default YourPreferences;

