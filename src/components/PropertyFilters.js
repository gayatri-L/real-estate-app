// import React from "react";

// const PropertyFilters = ({ 
//   onLocationChange, 
//   onAreaChange, 
//   onBHKChange, 
//   onBudgetChange, 
//   uniqueLocations, 
//   uniqueAreas, 
//   uniqueBHKs, 
//   uniqueBudgets, 
//   selectedLocation, 
//   selectedArea, 
//   selectedBHK, 
//   selectedBudget
// }) => {
//   return (
//     <div className="bg-gray-900 p-4 rounded-lg">
//       <h3 className="text-xl font-bold mb-3 text-white">Your Preferences</h3>

//       {/* Location Dropdown */}
//       <label className="block text-sm text-white">City:</label>
//       <select
//         value={selectedLocation}
//         onChange={(e) => onLocationChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="">Select City</option>
//         {uniqueLocations.map((loc) => (
//           <option key={loc} value={loc}>{loc}</option>
//         ))}
//       </select>

//       {/* Area Dropdown */}
//       <label className="block text-sm mt-2 text-white">Area:</label>
//       <select
//         value={selectedArea}
//         onChange={(e) => onAreaChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="">Select Area</option>
//         {uniqueAreas.map((area) => (
//           <option key={area} value={area}>{area}</option>
//         ))}
//       </select>

//       {/* BHK Dropdown */}
//       <label className="block text-sm mt-2 text-white">BHK:</label>
//       <select
//         value={selectedBHK}
//         onChange={(e) => onBHKChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="">Select BHK</option>
//         {uniqueBHKs.map((bhk) => (
//           <option key={bhk} value={bhk}>{bhk}</option>
//         ))}
//       </select>

//       {/* Budget Slider */}
//       <label className="block text-sm mt-2 text-white">Budget:</label>
//       <input
//         type="range"
//         min="0"
//         max="10000000"
//         step="100000"
//         value={selectedBudget}
//         className="w-full mt-2"
//         onChange={(e) => onBudgetChange(Number(e.target.value))}
//       />
//       <span className="text-white">Max Budget: ₹{selectedBudget.toLocaleString()}</span>
//     </div>
//   );
// };

// // export default PropertyFilters;
// ------important=-----
// import React, { useState } from "react";

// const PropertyFilters = ({ onLocationChange, onAreaChange, onBHKChange, onBudgetChange, selectedBudget }) => {
//   // Default values
//   const defaultLocation = "Pune";
//   const defaultAreas = ["Hadapsar", "Karve Nagar", "Kothrud"];
//   const defaultBHKs = [1, 2, 3];

//   // State for selected filters
//   const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
//   const [selectedArea, setSelectedArea] = useState("");
//   const [selectedBHK, setSelectedBHK] = useState("");

//   // Handle changes
//   const handleLocationChange = (value) => {
//     setSelectedLocation(value);
//     onLocationChange(value);
//   };

//   const handleAreaChange = (value) => {
//     setSelectedArea(value);
//     onAreaChange(value);
//   };

//   const handleBHKChange = (value) => {
//     setSelectedBHK(value);
//     onBHKChange(value);
//   };

//   return (
//     <div className="bg-gray-900 p-4 rounded-lg">
//       <h3 className="text-xl font-bold mb-3 text-white">Your Preferences</h3>

//       {/* Location Dropdown (Fixed to Pune) */}
//       <label className="block text-sm text-white">City:</label>
//       <select
//         value={selectedLocation}
//         onChange={(e) => handleLocationChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="Pune">Pune</option>
//       </select>

//       {/* Area Dropdown */}
//       <label className="block text-sm mt-2 text-white">Area:</label>
//       <select
//         value={selectedArea}
//         onChange={(e) => handleAreaChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="">Select Area</option>
//         {defaultAreas.map((area) => (
//           <option key={area} value={area}>{area}</option>
//         ))}
//       </select>

//       {/* BHK Dropdown */}
//       <label className="block text-sm mt-2 text-white">BHK:</label>
//       <select
//         value={selectedBHK}
//         onChange={(e) => handleBHKChange(e.target.value)}
//         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
//       >
//         <option value="">Select BHK</option>
//         {defaultBHKs.map((bhk) => (
//           <option key={bhk} value={bhk}>{bhk}</option>
//         ))}
//       </select>

//       {/* Budget Slider */}
//       <label className="block text-sm mt-2 text-white">Budget:</label>
//       <input
//         type="range"
//         min="0"
//         max="10000000"
//         step="100000"
//         value={selectedBudget}
//         className="w-full mt-2"
//         onChange={(e) => onBudgetChange(Number(e.target.value))}
//       />
//       <span className="text-white">Max Budget: ₹{selectedBudget.toLocaleString()}</span>
//     </div>
//   );
// };

// export default PropertyFilters;

const PropertyFilters = ({ filters, updateFilter }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-3 text-white">Filter Properties</h3>

      {/* Location Dropdown */}
      <label className="block text-sm text-white">Location:</label>
      <select
        value={filters.location}
        onChange={(e) => updateFilter("location", e.target.value)}
        className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
      >
        <option value="">All Locations</option>
        <option value="Pune">Pune</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      {/* BHK Dropdown */}
      <label className="block text-sm mt-2 text-white">BHK:</label>
      <select
        value={filters.bhk}
        onChange={(e) => updateFilter("bhk", e.target.value)}
        className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
      >
        <option value="">All BHKs</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
      </select>

       {/* Budget Slider */}
       <label className="block text-sm mt-4 text-white">Budget: ₹{filters.budget}</label>
      <input
        type="range"
        min="0"
        max="10000000"
        step="50000"
        value={filters.budget}
        onChange={(e) => updateFilter("budget", e.target.value)}
        className="w-full mt-2 appearance-none h-2 bg-gray-800 rounded-lg outline-none border border-yellow-500"
        style={{ accentColor: "#FFD700" }}
      />
    </div>
  );
};

export default PropertyFilters;
