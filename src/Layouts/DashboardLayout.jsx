import React from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import AuthHeader from "../components/Headers/AuthHeader";
import Sidebar from "./Sidebar";
import Main from "./Main";

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="main-wrapper"
    >
      <Box
        sx={{ flexGrow: "1", display: "flex", gap: "20px", height: "100%" }}
        className="main"
      >
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
