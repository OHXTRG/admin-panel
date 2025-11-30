import React, { useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { workouts } from "../../../workout";
import DataTable from "../../components/dataTable/simpleTable/Index";
import AddIcon from "@mui/icons-material/Add";
import "./workout.css";

const recentWorkoutColumns = [
  { name: "workout", lable: "Workout Name", width: "60%" },
  { name: "lastUpdatedAt", lable: "Last Updated", width: "20%" },
  {
    name: "action",
    lable: "Action",
    actions: [{ name: "Delete" }, { name: "View", navigate: "viewUser" }],
    width: "20%",
  },
];

const Workout = () => {
  const deleteHandler = useCallback((data) => {
    console.log(`Delete handler called with data : ${data}`, data);
  }, []);
  return (
    <Box className="workout-wrapper">
      <Box className="workout-head-wrapper">
        <Typography component={"h1"} className="workout-head">
          Workout Management
        </Typography>

        <Box className="button-wrapper">
          <Button className="create-workout">
            <AddIcon />
            Create Workout
          </Button>
        </Box>
      </Box>

      <Box className="recent-workout">
        <Box className="table-wrapper">
          <DataTable
            columns={recentWorkoutColumns}
            rows={workouts}
            deleteHandler={{
              func: deleteHandler,
              message: "Are you sure. You want to delete this workout.",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Workout;
