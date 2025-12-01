import React, { useState, useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VideoPreviewComponent from "./VideoPreviewComponent";
import { toast } from "react-toastify";
import uploadIcon from "../../../assets/icons/uploadIcon.svg";
import "./index.css";

const supportedFileTypes = [
  "mp4",
  "avi",
  "mov",
  "wmv",
  "mkv",
  "flv",
  "webm",
  "mpeg",
  "mpg",
  "3gp",
  "mts",
  "m2ts",
  "hevc",
  "h265",
  "mpd",
];
const Step2 = ({ formik, edited, name }) => {
  // console.log(edited, "edited edited edited");
  const [video, setVideo] = useState(null);
  const [dragValue, setDragValue] = useState(false);
  const [videoPreview, setVideoPreview] = useState(() =>
    edited
      ? formik.values.videoFile
      : formik.values.videoFile
      ? URL.createObjectURL(formik.values.videoFile)
      : null
  );
  const videoRef = useRef(null);

  const dragLeaveEle = useRef([]);

  const handleVideoChange = (e) => {
    // console.log("handleVideoChange called");
    e.preventDefault();
    setDragValue(false);
    let file = null;
    if (e.target.files) {
      file = e.target.files[0];
    } else if (e.dataTransfer.files) {
      file = e.dataTransfer.files[0];
    }

    if (file) {
      // console.log(typeof file, "inputfile");
      const fileType = file.type.split("/")[1];
      const fileExt = file.name.split(".").pop().toLowerCase();
      if (
        !supportedFileTypes.includes(fileType) &&
        !supportedFileTypes.includes(fileExt)
      ) {
        formik.setFieldValue(name, null);
        formik.setFieldError(name, "File type not supported");
        toast.error("File type not supported");
        return;
      }
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
      formik.setFieldValue(name, file);
    } else {
      console.log("no file");
    }
  };

  return (
    <>
      <Box className="upload-img-wrapper">
        <Box
          className={dragValue ? "drag-area upload-img" : "upload-img"}
          onDragOver={(e) => {
            e.preventDefault();
            setDragValue(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            if (!dragLeaveEle.current.includes(e.target)) {
              setDragValue(false);
              return;
            } else {
            }
          }}
          onDrop={handleVideoChange}
        >
          {videoPreview ? (
            <VideoPreviewComponent
              VideoPreview={videoPreview}
              setVideoPreview={setVideoPreview}
              formik={formik}
              videoRef={videoRef}
              name={name}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={uploadIcon} style={{ height: "44px", width: "44px" }} />

              <Box>
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.click();
                    } else {
                      console.log("videoRef is null");
                    }
                  }}
                  ref={(el) => dragLeaveEle.current.push(el)}
                >
                  <Typography
                    className="label"
                    ref={(el) => dragLeaveEle.current.push(el)}
                  >
                    Upload Video
                  </Typography>
                </Button>
              </Box>

              <Typography component={"span"}>
                Simply Drag or drop your video here
              </Typography>
            </Box>
          )}
          <input
            type="file"
            accept="video/*"
            className="form-control"
            name={name}
            // id="video"
            style={{ display: "none" }}
            ref={videoRef}
            onChange={handleVideoChange}
          />
        </Box>
      </Box>
      {/* <FormHelperText sx={{ color: "red" }}>
        {formik.touched.videoFile && formik.errors.videoFile
          ? formik.errors.videoFile
          : ""}
      </FormHelperText> */}
    </>
  );
};

export default Step2;
