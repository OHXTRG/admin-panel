import React from "react";
import { Button, Box, IconButton, Typography } from "@mui/material";
// import CustomAutoComplete from "../../components/FormComponents/CustomAutoFill";
import CustomAutoComplete from "./Customautofill";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";

const ExerciseListComponent = ({
  options,
  formik,
  exerciseItem,
  setExerciseList,
  exerciseList,
}) => {
  return (
    <Box
      className=" exercise-select"
      //  key={exerciseItem.list_id}
    >
      <Box>
        <IconButton
          sx={{
            "&:active": {
              cursor: "grabbing",
            },
          }}
          data-movable-handle
          tabIndex={-1}
        >
          <DragIndicatorIcon sx={{ color: "#111928" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexGrow: "1",
          position: "relative",
        }}
      >
        {exerciseList.length > 1 && (
          <IconButton
            sx={{ position: "absolute", top: "0", right: "10px" }}
            onClick={() =>
              setExerciseList((prev) =>
                prev.filter((i) => i.list_id !== exerciseItem.list_id)
              )
            }
          >
            <img src={DeleteIcon} width={22} height={22} />
          </IconButton>
        )}
        <Typography component={"label"} htmlFor="exercises">
          Exercise Name
        </Typography>
        <CustomAutoComplete
          name="exercises"
          formik={formik}
          options={options}
          setState={setExerciseList}
          state={exerciseList}
          item={exerciseItem}
        />
      </Box>
    </Box>
  );
};

export default ExerciseListComponent;
