// // components/ToggleButton.js
// import React from "react";

// const ToggleButton = ({ section, field, value, onChange }) => {
//   const handleToggle = () => {
//     onChange(section, field, !value);
//   };

//   return (
//     <div
//       className={`flex items-center w-24 h-9 rounded-full cursor-pointer p-1 transition-all duration-300 ${
//         value ? "bg-green-500" : "bg-red-500"
//       }`}
//       onClick={handleToggle}
//     >
//       <div
//         className={`w-10 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
//           value ? "translate-x-12" : "translate-x-0"
//         }`}
//       />
//       <span
//         className={`absolute text-white font-semibold ${
//           value ? "ml-4" : "ml-16"
//         }`}
//       >
//         {value ? "YES" : "NO"}
//       </span>
//     </div>
//   );
// };

// export default ToggleButton;
// components/ToggleButton.js
import React from "react";

const ToggleButton = ({ label, section, field, value, onChange }) => {
  const handleToggle = () => {
    onChange(section, field, !value);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Toggle Label */}
      <span className="text-gray-400">{label}</span>

      {/* Toggle Button */}
      <div
        className={`flex items-center w-24 h-9 rounded-full cursor-pointer p-1 transition-all duration-300 ${
          value ? "bg-green-500" : "bg-red-500"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`w-10 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            value ? "translate-x-12" : "translate-x-0"
          }`}
        />
        <span
          className={`absolute text-white font-semibold ${
            value ? "ml-4" : "ml-16"
          }`}
        >
          {value ? "YES" : "NO"}
        </span>
      </div>
    </div>
  );
};

export default ToggleButton;
