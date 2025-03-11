import React from 'react';
import { TextField } from '@mui/material';
 
 
const InputField = ({ label, section, field, value, onChange, error, type = 'text', maxLength }) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;
 
 
    // Allow only integers
    if (type === 'integer' && newValue !== '' && !/^\d+$/.test(newValue)) return;
 
 
    // Allow only floats
    if (type === 'float' && newValue !== '' && !/^\d*\.?\d*$/.test(newValue)) return;
 
 
    // Handle maxLength
    if (maxLength && newValue.length > maxLength) return;
 
 
    // Ensure numbers are sent as undefined when empty
    if ((type === 'integer' || type === 'float') && newValue === '') {
      newValue = undefined;
    }
 
 
    // Trigger validation only for this field
    onChange(section, field, newValue);
  };
 
 
  return (
    <div className="mb-1">
      <TextField
        className='w-3/4'
        label={label}
        variant="standard"
        value={value ?? ""}
        onChange={handleInputChange}
        error={Boolean(error)}
        helperText={error || ''}
        type={type === 'integer' || type === 'float' ? 'text' : type}
        inputMode={type === 'integer' || type === 'float' ? 'numeric' : 'text'}
        sx={{
          '& .MuiInputLabel-root': { color: '#9CA3AF' }, // Label color (default)
          '& .MuiInputLabel-root.Mui-focused': { color: '#1F2937' }, // Label color on focus
          '& .MuiInput-root': {
            color: 'white', // Input text color
            borderBottom: '1px solid #E5E7EB', // Bottom border
            width: '100%', // Equivalent to Tailwind w-full
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#E5E7EB', // Underline color on focus
          },
        }}
      />
    </div>
  );
};
 
 
export default InputField;