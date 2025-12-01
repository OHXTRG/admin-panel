import React from "react";
import { Box } from "@mui/material";

const Main = ({ children }) => {
  return (
    <Box
      className="layout-main"
      sx={{
        flexGrow: "1",
        height: "100%",
        overflow: "auto",
        // width: "min-content",
      }}
    >
      <Box className="main-wrapper-inner">{children}</Box>
    </Box>
  );
};

export default Main;
