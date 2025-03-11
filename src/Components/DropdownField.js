import React from 'react';
import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';
 
const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
  const handleDropdownChange = (e) => {
    onChange(section, field, e.target.value);
  };
 
  return (
    <div className="mb-4">
    <FormControl variant="standard" error={Boolean(error)} className='w-3/4'>
      <InputLabel
       sx={{
        color: '#9CA3AF', // Default label color
        '&.Mui-focused': { color: '#9CA3AF' }, // Keep label gray when focused
      }}
      >{label}</InputLabel>
      <Select
        value={value}
        onChange={handleDropdownChange}
        displayEmpty
        sx={{
          '& .MuiInputLabel-root': { color: '#9CA3AF' }, // Label color (default)
          '& .MuiInputLabel-root.Mui-focused': { color: '#1F2937' }, // Label color on focus
          color: '#E5E7EB', // text-gray-200
          borderBottom: '2px solid #E5E7EB', // border-gray-200
          '&.Mui-focused': { borderBottom: '2px solid #FFFFFF' }, // Focused border color
          '& .MuiSvgIcon-root': { color: '#E5E7EB' }, // Dropdown arrow color
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: '#000000', // bg-black
              color: '#E5E7EB', // text-gray-200
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ '&:hover': { bgcolor: '#1F2937' } }}// hover:bg-gray-700
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {error && <Typography sx={{ color: '#EF4444)' }}>{error}</Typography>}
  </div>
  );
};
 
export default DropdownField;