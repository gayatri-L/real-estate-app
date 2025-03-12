import React from "react";
 
const CheckBox = ({ label, section, field, checked, onChange,error }) => {
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
        error={Boolean(error)}
        helperText={error || ''}
        onChange={handleCheckboxChange}
        className="appearance-none w-4 h-4 border-2 border-white bg-transparent checked:bg-white checked:after:content-['✔'] checked:after:text-black checked:after:block checked:after:text-xs checked:after:leading-none checked:after:text-center checked:after:translate-y-[-1px]"
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
 
export default CheckBox;
 