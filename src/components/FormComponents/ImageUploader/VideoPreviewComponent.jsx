import { Box, Button } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const VideoPreviewComponent = ({
  VideoPreview,
  setVideoPreview,
  formik,
  videoRef,
  name,
}) => {
  const [cancel, setCancel] = React.useState(false);
  return (
    <Box className="img-preview-wrapper">
      <Button
        className="cancel-btn"
        onClick={() => {
          //   console.log("cancel clicked");
          setVideoPreview(null);
          if (videoRef.current) {
            videoRef.current.value = null;
          }
          formik.setFieldValue(name, null);
        }}
      >
        <ClearIcon sx={{ color: "white", fontSize: "25px" }} />
      </Button>
      <img
        className="img-preview"
        controls
        muted
        src={VideoPreview}
        style={{ display: cancel ? "none" : "block" }}
      />
    </Box>
  );
};

export default VideoPreviewComponent;
