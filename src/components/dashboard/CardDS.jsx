import React from "react";
import { Box, Typography } from "@mui/material";

const CardDS = ({ data }) => {
  return (
    <Box className="card-ds">
      <Box className="img-wrapper">
        <img src={data.img} className="img-class" />
      </Box>
      <Box className="content">
        <Typography component="span" className="count">
          {data.count}
        </Typography>
        <Typography component="span" className="label">
          {data.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardDS;
