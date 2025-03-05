// import React from "react";

// const PriceMeter = ({ currentPrice, minPrice, maxPrice }) => {
//   // Calculate needle position
//   const calculateNeedleRotation = () => {
//     const safeMin = minPrice - minPrice * 0.05; // Lower buffer
//     const safeMax = maxPrice + maxPrice * 0.05; // Upper buffer

//     if (currentPrice < safeMin) return -45; // "Great"
//     if (currentPrice > safeMax) return 45; // "High"

//     // Normalize price within range (0 to 1)
//     const normalized = (currentPrice - minPrice) / (maxPrice - minPrice);
//     return -45 + normalized * 90; // Rotate from -45 to +45 degrees
//   };

//   return (
//     <div className="flex items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
//       <div className="relative w-40 h-40">
//         {/* Meter Background */}
//         <div className="absolute inset-0 bg-gray-200 rounded-full border-4 border-gray-300"></div>

//         {/* Colored Sections */}
//         <div className="absolute inset-0 flex justify-center items-center">
//           <div className="w-full h-full rounded-full bg-transparent border-[10px] border-gray-300 border-t-green-500 border-l-green-500 border-r-red-500 border-b-red-500"></div>
//         </div>

//         {/* Needle */}
//         <div
//           className="absolute left-1/2 bottom-1/2 w-1 h-16 bg-black origin-bottom transform"
//           style={{ transform: `rotate(${calculateNeedleRotation()}deg)` }}
//         ></div>
//       </div>

//       {/* Price Information */}
//       <div className="ml-4">
//         <p className="text-lg font-semibold">Car Price</p>
//         <p className="text-xl font-bold text-gray-700">₹{currentPrice.toFixed(2)} Lakh</p>
//         <p className="text-sm text-gray-500">
//           Avg. Market Price: ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)} Lakh
//         </p>
//         <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//           Make Offer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PriceMeter;
import React from "react";

const PriceMeter = ({ currentPrice, minPrice, maxPrice }) => {
  // Determine Price Category
  const getCategory = () => {
    if (currentPrice < minPrice * 0.9) return "Low";
    if (currentPrice >= minPrice * 0.9 && currentPrice < minPrice) return "Great";
    if (currentPrice >= minPrice && currentPrice <= maxPrice) return "Fair";
    return "High";
  };

  // Calculate Needle Position
  const calculateNeedleRotation = () => {
    const minThreshold = minPrice * 0.9; // 90% of minPrice (Low)
    const maxThreshold = maxPrice * 1.1; // 110% of maxPrice (High)

    if (currentPrice <= minThreshold) return -60; // "Low"
    if (currentPrice >= maxThreshold) return 60; // "High"

    // Map current price to range between -60 to +60
    const normalized = (currentPrice - minThreshold) / (maxThreshold - minThreshold);
    return -60 + normalized * 120; // Full range is 120 degrees
  };

  // Get the current category
  const category = getCategory();

  return (
    <div className="flex items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      {/* Meter Section */}
      <div className="relative w-52 h-52">
        {/* Outer Meter */}
        <div className="absolute inset-0 bg-gray-200 rounded-full border-8 border-gray-300"></div>

        {/* Colored Sections */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full h-full rounded-full border-[12px] border-gray-300 border-t-green-500 border-l-green-400 border-r-red-500 border-b-red-600"></div>
        </div>

        {/* Needle */}
        <div
          className="absolute left-1/2 bottom-1/2 w-1.5 h-24 bg-black origin-bottom transform transition-transform duration-500"
          style={{ transform: `rotate(${calculateNeedleRotation()}deg)` }}
        ></div>
      </div>

      {/* Price Info */}
      <div className="ml-6">
        <p className="text-lg font-semibold">Property Price</p>
        <p className="text-2xl font-bold text-gray-800">₹{currentPrice.toFixed(2)} Lakh</p>

        <p className="text-sm text-gray-500 mt-2">
          Avg. Market Price: ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)} Lakh
        </p>

        <p className="mt-4 text-lg font-medium">
          Category:{" "}
          <span
            className={`${
              category === "Low"
                ? "text-gray-600"
                : category === "Great"
                ? "text-green-500"
                : category === "Fair"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {category}
          </span>
        </p>

        <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Make Offer
        </button>
      </div>
    </div>
  );
};

export default PriceMeter;
