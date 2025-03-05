
// import React from 'react';
// import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

// const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
//   const handleDropdownChange = (e) => {
//     onChange(section, field, e.target.value);
//   };

//   return (
//     <div style={{ marginBottom: '1rem' }}>
//       <FormControl fullWidth variant="standard" error={Boolean(error)}>
//         <InputLabel sx={{ color: '#F8F8F8' }}>{label}</InputLabel>
//         <Select
//           value={value}
//           onChange={handleDropdownChange}
//           sx={{
//             color: '#F8F8F8',
//             borderBottom: '2px solid #F8F8F8',
//             '& .MuiSvgIcon-root': { color: '#F8F8F8' } // Ensures dropdown arrow is off-white
//           }}
//         >
//           {options.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {error && <Typography color="error">{error}</Typography>}
//     </div>
//   );
// };

// export default DropdownField;
import React from 'react';
import { MenuItem, Select, Typography, FormControl, InputLabel } from '@mui/material';

const DropdownField = ({ label, section, field, value, onChange, error, options }) => {
  const handleDropdownChange = (e) => {
    onChange(section, field, e.target.value);
  };

  return (
    <div className="mb-4">
    <FormControl fullWidth variant="standard" error={Boolean(error)}>
      <InputLabel sx={{ color: 'rgb(156, 163, 175)' }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleDropdownChange}
        displayEmpty
        sx={{
          color: 'rgb(229, 231, 235)', // text-gray-200
          borderBottom: '2px solid rgb(229, 231, 235)', // border-gray-200
          '&.Mui-focused': { borderBottom: '2px solid white' },
          '& .MuiSvgIcon-root': { color: 'rgb(229, 231, 235)' }, // Dropdown arrow
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: 'rgb(0, 0, 0)', // bg-black
              color: 'rgb(229, 231, 235)', // text-gray-200
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ '&:hover': { bgcolor: 'rgb(55, 65, 81)' } }} // hover:bg-gray-700
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    {error && <Typography sx={{ color: 'rgb(239, 68, 68)' }}>{error}</Typography>}
  </div>
  

  );
};

export default DropdownField;
