import React from "react";

const YourPreferences = ({ data }) => {
  return (
    <aside className="w-1/4 p-4 bg-gray-800 text-white">
      <h2 className="text-yellow-500 text-lg font-bold">Your Preferences</h2>
      <ul className="mt-4 space-y-2">
        <li><strong>Bedrooms:</strong> {data.bedrooms || "N/A"}</li>
        <li><strong>Budget:</strong> {data.budget || "N/A"}</li>
        <li><strong>Location:</strong> {data.location || "N/A"}</li>
      </ul>
    </aside>
  );
};

export default YourPreferences;
