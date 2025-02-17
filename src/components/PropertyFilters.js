import React from "react";

const PropertyFilters = ({ onFilterChange }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-3">Your Preferences</h3>
      
      <label className="block text-sm">City:</label>
      <select className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1">
        <option>Pune</option>
      </select>

      <label className="block text-sm mt-2">Area:</label>
      <select className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1">
        <option>Shivaji Nagar</option>
        <option>Karve Nagar</option>
        <option>Kharadi</option>
        <option>Hadpsar</option>
        <option>Koregaon Park</option>
      </select>

      <label className="block text-sm mt-2">BHK:</label>
      <select className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <label className="block text-sm mt-2">Budget:</label>
      <input type="range" min="9" max="1000" className="w-full mt-2" />

      <label className="block text-sm mt-2">Other Preferences:</label>
      <select className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1" placeholder="Select Other preference">
        <option>School & Hostel</option>
      </select>
    </div>
  );
};

export default PropertyFilters;
