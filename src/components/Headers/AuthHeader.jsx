import React from "react";
import logoImg from "../../assets/logo.png";
import { Box } from "@mui/material";
import { useLocation } from "react-router";

const AuthHeader = () => {
  const location = window.location.href;
  const { pathname } = useLocation();
  const homePageUrl = location.endsWith(pathname)
    ? location.slice(0, -pathname.length)
    : location;
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `start`,
        alignItems: `center`,
        py: 2.2,
        backgroundColor: "#FDFDFF",
        border: "1px solid #EBEBEB",
      }}
    >
      <Box
        component="a"
        href={homePageUrl}
        sx={{ height: "30px", width: "158px" }}
      >
        <img
          src={logoImg}
          alt="Gym-Gear"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default AuthHeader;
