import { Typography, Box } from "@mui/material";
import React, { useCallback } from "react";
import workoutImg from "../../assets/workout.png";
import exerciseImg from "../../assets/exercise.png";
import activeTablets from "../../assets/activeTablets.png";
import sync from "../../assets/sync.png";
import CardDS from "../../components/dashboard/CardDS";
import { workouts } from "../../../workout";
import DataTable from "../../components/dataTable/simpleTable/Index";
import "./dashboard.css";

const cards = [
  { img: workoutImg, count: 12, label: "Total Workouts" },
  { img: exerciseImg, count: 48, label: "Total Excercises" },
  { img: activeTablets, count: 25, label: "Active Tablets" },
  { img: sync, count: 18, label: "Synced Today" },
];

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

const Dashboard = () => {
  const deleteHandler = useCallback((data) => {
    console.log(`Delete handler called with data : ${data}`, data);
  }, []);
  return (
    <>
      <Box className="dashbaord-wrapper">
        <Typography component={"h1"} className="dashboard-head">
          Dashboard Overview
        </Typography>
        <Box className="dashboard-cards-wrapper">
          {cards.map((data) => (
            <CardDS data={data} />
          ))}
        </Box>

        <Box className="recent-workout">
          <Typography component={"h1"} className="head">
            Recent Workouts
          </Typography>

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
    </>
  );
};

export default Dashboard;
