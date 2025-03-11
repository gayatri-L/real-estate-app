import React from "react";
 
const CheckBoxControl = ({ label, section, field, checked, onChange }) => {
  // Handle checkbox state change
  const handleCheckboxChange = (e) => {
    onChange(section, field, e.target.checked);
  };
 
  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        id={`${section}-${field}`} // Unique ID for accessibility
        checked={checked}
        onChange={handleCheckboxChange}
        className="w-5 h-5 accent-gray-800 cursor-pointer"
      />
      {label && (
        <label
          htmlFor={`${section}-${field}`}
          className="text-white cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};
 
export default CheckBoxControl;