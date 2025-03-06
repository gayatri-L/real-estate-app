import React from 'react';
import { TextField} from '@mui/material';

const InputField = ({ label, section, field, value, onChange, error, type = 'text', maxLength }) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;

    // Validate integer input
    if (type === 'integer') {
      if (!/^[0-9]*$/.test(newValue)) {
        return;
      }
    }

    // Validate float input
    if (type === 'float') {
      if (!/^[0-9]*\.?[0-9]*$/.test(newValue)) {
        return;
      }
    }

    if (maxLength && newValue.length > maxLength) return;

    onChange(section, field, newValue);
  };

  return (
    // <div style={{ marginBottom: '1rem' }}>
    //   <TextField
    //     label={label}
    //     variant="standard"
    //     fullWidth
    //     value={value}
    //     onChange={handleInputChange}
    //     error={Boolean(error)}
    //     helperText={error || ''}
    //     InputLabelProps={{ style: { color: '#808080' } }}
    //     InputProps={{ style: { color: '#fff', borderBottom: '2px solid #F8F8F8' ,width:'300px'} }}
    //     type={type === 'integer' || type === 'float' ? 'text' : type} // Use 'text' for custom validation
    //   />
    //   {error && <Typography color="error">{error}</Typography>}
    // </div>
    <div className="mb-4">
  <TextField
  label={label}
  variant="standard"
  fullWidth
  value={value}
  onChange={handleInputChange}
  error={Boolean(error)}
  helperText={error || ''}
  type={type === 'integer' || type === 'float' ? 'text' : type}
  sx={{
    '& .MuiInputLabel-root': { color: '#9CA3AF' }, // Tailwind 'text-gray-400'
    '& .MuiInput-root': {
      color: 'white',
      borderBottom: '1px solid #E5E7EB', // Tailwind 'border-gray-200'
      width: '300px',
    },
  }}
/>

  {/* {error && <Typography className="text-red-500">{error}</Typography>} */}
</div>

  );
};

export default InputField;
