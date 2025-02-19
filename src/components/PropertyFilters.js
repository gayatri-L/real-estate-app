// // // import React from "react";

// // // const PropertyFilters = ({
// // //   onLocationChange,
// // //   onAreaChange,
// // //   onBHKChange,
// // //   onBudgetChange,
// // //   uniqueLocations,
// // //   uniqueAreas,
// // //   uniqueBHKs,
// // //   uniqueBudgets,
// // // }) => {
// // //   return (
// // //     <div className="bg-gray-900 p-4 rounded-lg">
// // //       <h3 className="text-xl font-bold mb-3">Your Preferences</h3>
      
// // //       <label className="block text-sm">City:</label>
// // //       <select
// // //         onChange={(e) => onLocationChange(e.target.value)}
// // //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// // //       >
// // //         <option value="">Select City</option>
// // //         {uniqueLocations.map((loc) => (
// // //           <option key={loc} value={loc}>
// // //             {loc}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       <label className="block text-sm mt-2">Area:</label>
// // //       <select
// // //         onChange={(e) => onAreaChange(e.target.value)}
// // //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// // //       >
// // //         <option value="">Select Area</option>
// // //         {uniqueAreas.map((area) => (
// // //           <option key={area} value={area}>
// // //             {area}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       <label className="block text-sm mt-2">BHK:</label>
// // //       <select
// // //         onChange={(e) => onBHKChange(e.target.value)}
// // //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// // //       >
// // //         <option value="">Select BHK</option>
// // //         {uniqueBHKs.map((bhk) => (
// // //           <option key={bhk} value={bhk}>
// // //             {bhk}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       <label className="block text-sm mt-2">Budget:</label>
// // //       <input
// // //         type="range"
// // //         min="0"
// // //         max="10000000"
// // //         className="w-full mt-2"
// // //         onChange={(e) => onBudgetChange(e.target.value)}
// // //       />

// // //       <label className="block text-sm mt-2">Other Preferences:</label>
// // //       <select
// // //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// // //         placeholder="Select Other preference"
// // //       >
// // //         <option>School & Hostel</option>
// // //       </select>
// // //     </div>
// // //   );
// // // };

// // // export default PropertyFilters;
// // import React from "react";

// // const PropertyFilters = ({ 
// //   onLocationChange, 
// //   onAreaChange, 
// //   onBHKChange, 
// //   onBudgetChange, 
// //   uniqueLocations, 
// //   uniqueAreas, 
// //   uniqueBHKs 
// // }) => {
// //   return (
// //     <div className="bg-gray-900 p-4 rounded-lg">
// //       <h3 className="text-xl font-bold mb-3 text-white">Your Preferences</h3>

// //       {/* Location Dropdown */}
// //       <label className="block text-sm text-white">City:</label>
// //       <select
// //         onChange={(e) => onLocationChange(e.target.value)}
// //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// //       >
// //         <option value="">Select City</option>
// //         {uniqueLocations.map((loc) => (
// //           <option key={loc} value={loc}>{loc}</option>
// //         ))}
// //       </select>

// //       {/* Area Dropdown */}
// //       <label className="block text-sm mt-2 text-white">Area:</label>
// //       <select
// //         onChange={(e) => onAreaChange(e.target.value)}
// //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// //       >
// //         <option value="">Select Area</option>
// //         {uniqueAreas.map((area) => (
// //           <option key={area} value={area}>{area}</option>
// //         ))}
// //       </select>

// //       {/* BHK Dropdown */}
// //       <label className="block text-sm mt-2 text-white">BHK:</label>
// //       <select
// //         onChange={(e) => onBHKChange(e.target.value)}
// //         className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
// //       >
// //         <option value="">Select BHK</option>
// //         {uniqueBHKs.map((bhk) => (
// //           <option key={bhk} value={bhk}>{bhk}</option>
// //         ))}
// //       </select>

// //       {/* Budget Slider */}
// //       <label className="block text-sm mt-2 text-white">Budget:</label>
// //       <input
// //         type="range"
// //         min="0"
// //         max="10000000"
// //         step="100000"
// //         className="w-full mt-2"
// //         onChange={(e) => onBudgetChange(e.target.value)}
// //       />
// //       <span className="text-white">Max Budget: ₹{Number(onBudgetChange).toLocaleString()}</span>
// //     </div>
// //   );
// // };

// // export default PropertyFilters;
// import React from "react";

// const PropertyFilters = ({ 
//   onLocationChange, 
//   onAreaChange, 
//   onBHKChange, 
//   onBudgetChange, 
//   uniqueLocations, 
//   uniqueAreas, 
//   uniqueBHKs 
// }) => {
//   return (
//     <div className="bg-gray-900 p-4 rounded-lg">
//       <h3 className="text-xl font-bold mb-3 text-white">Your Preferences</h3>

//       {/* Location Dropdown */}
//       <label className="block text-sm text-white">City:</label>
//       <select
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
//         className="w-full mt-2"
//         onChange={(e) => onBudgetChange(Number(e.target.value))}
//       />
//       <span className="text-white">Max Budget: ₹{Number(onBudgetChange).toLocaleString()}</span>
//     </div>
//   );
// };

// export default PropertyFilters;
import React from "react";

const PropertyFilters = ({ 
  onLocationChange, 
  onAreaChange, 
  onBHKChange, 
  onBudgetChange, 
  uniqueLocations, 
  uniqueAreas, 
  uniqueBHKs, 
  uniqueBudgets, 
  selectedLocation, 
  selectedArea, 
  selectedBHK, 
  selectedBudget
}) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-3 text-white">Your Preferences</h3>

      {/* Location Dropdown */}
      <label className="block text-sm text-white">City:</label>
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
      >
        <option value="">Select City</option>
        {uniqueLocations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      {/* Area Dropdown */}
      <label className="block text-sm mt-2 text-white">Area:</label>
      <select
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
      >
        <option value="">Select Area</option>
        {uniqueAreas.map((area) => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>

      {/* BHK Dropdown */}
      <label className="block text-sm mt-2 text-white">BHK:</label>
      <select
        value={selectedBHK}
        onChange={(e) => onBHKChange(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-yellow-500 text-white mt-1"
      >
        <option value="">Select BHK</option>
        {uniqueBHKs.map((bhk) => (
          <option key={bhk} value={bhk}>{bhk}</option>
        ))}
      </select>

      {/* Budget Slider */}
      <label className="block text-sm mt-2 text-white">Budget:</label>
      <input
        type="range"
        min="0"
        max="10000000"
        step="100000"
        value={selectedBudget}
        className="w-full mt-2"
        onChange={(e) => onBudgetChange(Number(e.target.value))}
      />
      <span className="text-white">Max Budget: ₹{selectedBudget.toLocaleString()}</span>
    </div>
  );
};

export default PropertyFilters;
