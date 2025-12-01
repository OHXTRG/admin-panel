import React from "react";
import CustomTextField from "../../components/FormComponents/CustomtextField";
import { Autocomplete, TextField, Chip, Box, Avatar } from "@mui/material";
const CustomAutoComplete = ({
  options,
  formik,
  name,
  setState,
  item,
  state,
}) => {
  console.log(
    state.find((i) => i.list_id == item.list_id)?.selectedObject,
    "kjaslkfj;sadkfj"
  );

  console.log(state, "the current state");
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
        value={
          state.find((i) => i.list_id == item.list_id)?.selectedObject || null
        }
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
          console.log("new value", newValue);
          if (newValue) {
            setState((prev) =>
              prev.map((pd) =>
                pd.list_id == item.list_id
                  ? {
                      ...pd,
                      selectedObject: {
                        id: newValue.id,
                        label: newValue.label,
                        thumbnail: newValue.thumbnail,
                      },
                    }
                  : pd
              )
            );
          }
          // formik.setFieldValue(name, newValue);
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
