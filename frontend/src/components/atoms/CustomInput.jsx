import { TextField, InputAdornment, Box } from '@mui/material';

const CustomInput = ({ value, onChange, placeholder, icon, type = 'text' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#333A5C',
        borderRadius: '9999px',
        paddingX: 2,
        paddingY: 1,
        marginBottom: 2,
      }}
    >
      <TextField
        variant="standard"
        fullWidth
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={{
          disableUnderline: true,
          startAdornment: icon ? (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          input: { color: 'white' },
        }}
      />
    </Box>
  );
};

export default CustomInput;
