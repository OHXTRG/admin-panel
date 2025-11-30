import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    width: "50%",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "white", // Light gray background
    borderRadius: "8px",
    padding: "15px 15px",
    border: "1px solid #e5e7eb", // Light border
  },
  "& .MuiInputLabel-root": {
    color: "#666", // Label color
  },
  "& .MuiInputBase-input": {
    color: "#333", // Input text color
    fontSize: "16px",
    padding: "0",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#black", // Blue border on hover
    },
    "&.Mui-focused fieldset": {
      outline: "none",
      borderColor: "#black", // Blue border when focused
    },
  },
}));

export default CustomTextField;
