import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { workouts } from "../../../workout";
import DataTable from "../../components/dataTable/simpleTable/Index";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const recentWorkoutColumns = [
  { name: "thumbnailImage", lable: "Image", width: "20%", type: "img" },
  { name: "exerciseName", lable: "Exercise Name", width: "50%", type: "text" },
  {
    name: "action",
    lable: "Action",
    actions: [{ name: "Delete" }, { name: "Edit", navigate: "viewUser" }],
    width: "20%",
  },
];

const Workout = () => {
  const exercisesData = useSelector((state) => state.exerciseState);
  const [exerciseRows, setExerciseRows] = useState([]);
  useEffect(() => {
    console.log(exercisesData, "exerdata sta");
    if (!exercisesData.loading && !exercisesData.error) {
      if (Array.isArray(exercisesData.data) && exercisesData.data.length > 0) {
        setExerciseRows(exercisesData.data);
      } else {
        setExerciseRows([]);
      }
    }
  }, [exercisesData]);

  console.log(exerciseRows, "rows rows are set");

  const deleteHandler = useCallback((data) => {
    console.log(`Delete handler called with data : ${data}`, data);
  }, []);
  return (
    <Box className="workout-wrapper">
      <Box className="workout-head-wrapper">
        <Typography component={"h1"} className="workout-head">
          Exercise Management
        </Typography>

        <Box className="button-wrapper">
          <Button className="create-workout">
            <AddIcon />
            Create Exercise
          </Button>
        </Box>
      </Box>

      <Box className="recent-workout">
        <Box className="table-wrapper">
          <DataTable
            columns={recentWorkoutColumns}
            rows={exerciseRows}
            deleteHandler={{
              func: deleteHandler,
              message: "Are you sure. You want to delete this workout.",
            }}
            loading={exercisesData.loading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Workout;
