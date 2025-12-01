import React from "react";
import CustomTextField from "./CustomtextField";
import { Autocomplete, TextField, Chip, Box, Avatar } from "@mui/material";
const CustomAutoComplete = ({ options, formik, name }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Autocomplete
        id="tags-filled"
        options={options.map((data) => ({
          label: data.exerciseName,
          id: data._id,
          thumbnail: data.thumbnailImage, // <-- Add image here
        }))}
        getOptionLabel={(option) => option.label}
        value={formik.values[name]}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "10px",
                border: "1px solid #3758F91A",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              <Avatar
                src={option.thumbnail}
                alt={option.label}
                variant="rounded"
                sx={{ width: 32, height: 32 }}
              />
              <span>{option.label}</span>
            </Box>
          </li>
        )}
        onChange={(e, newValue) => {
          formik.setFieldValue(name, newValue);
        }}
        sx={{
          "& .MuiFormControl-root": {
            "& .MuiInputBase-root": {
              "& .MuiInputBase-input": {
                padding: "0",
              },
            },
          },
        }}
        renderInput={(params) => (
          <CustomTextField {...params} placeholder="Select Exercise" />
        )}
      />
    </div>
  );
};

export default CustomAutoComplete;
