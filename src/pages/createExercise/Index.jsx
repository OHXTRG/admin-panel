import React, { useState } from "react";
import "./index.css";
import {
  IconButton,
  Box,
  Typography,
  Button,
  FormHelperText,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomTextField from "../../components/FormComponents/CustomtextField";
import CustomImageUploader from "../../components/FormComponents/ImageUploader/Index";
import CustomVideoUploader from "../../components/FormComponents/VideoUploader/Index";
import { createExercise } from "../../apis/createExercise";
import { getAllExerciseAPI } from "../../features/exercise.slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      exerciseName: "",
      exercise_thumb: "",
      exercise_main_video: "",
      exercise_demo_video: "",
    },
    validationSchema: yup.object({
      exerciseName: yup.string().required("Please fill the exercise name."),
      exercise_thumb: yup
        .mixed()
        .required("Please upload the exercise thumbnail"),
      exercise_main_video: yup
        .mixed()
        .required("Please upload the exercise main video"),
      exercise_demo_video: yup
        .mixed()
        .required("Please upload the exercise demo video"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values, "the form is submited");
      if (!token) toast.error("No token found");
      try {
        setLoading(true);
        const response = await createExercise(token, values);
        console.log(response, "djflakdsjflkasfjk");
        if (response.data?.success) {
          dispatch(getAllExerciseAPI(token));
          toast.success(
            response.data?.message || "Exercise created successfully"
          );
          navigate("/admin/dashboard/exercises");
        } else {
          toast.error(response.data?.message || "Error in creating exercise");
        }
      } catch (error) {
        console.log(error, "error error in create exercise api");
        if (error?.response?.data) {
          toast.error(response.data?.message || "Error in creating exercise");
        } else {
          toast.error("Error in creating exercise");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className="workout-wrapper">
        <Box className="Exercise-head-wrapper">
          <IconButton onClick={() => navigate("/admin/dashboard/exercises")}>
            <KeyboardBackspaceIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography component={"h1"} className="workout-head">
            Create Exercise
          </Typography>
        </Box>

        <Box className="create-exercise-form-wrapper">
          <form className="create-exercise-form" onSubmit={formik.handleSubmit}>
            <Box className="form-control">
              <Typography component={"label"} htmlFor="exerciseName">
                Exercise Name
              </Typography>
              <CustomTextField
                placeholder="Enter exercise name"
                name="exerciseName"
                value={formik.values.exerciseName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.exerciseName && formik.errors.exerciseName ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.exerciseName}
                </FormHelperText>
              ) : null}
            </Box>

            <Box className="form-control">
              <Typography component={"label"} htmlFor="exercise_thumb">
                Thumbnail Image
              </Typography>
              <CustomImageUploader formik={formik} name="exercise_thumb" />
              {formik.touched.exercise_thumb && formik.errors.exercise_thumb ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.exercise_thumb}
                </FormHelperText>
              ) : null}
            </Box>

            <Box className="form-control">
              <Typography component={"label"} htmlFor="exercise_main_video">
                Main Exercise Video
              </Typography>
              <CustomVideoUploader formik={formik} name="exercise_main_video" />
              {formik.touched.exercise_main_video &&
              formik.errors.exercise_main_video ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.exercise_main_video}
                </FormHelperText>
              ) : null}
            </Box>

            <Box className="form-control">
              <Typography component={"label"} htmlFor="exercise_thumb">
                Demo Preview Video
              </Typography>
              <CustomVideoUploader formik={formik} name="exercise_demo_video" />
              {formik.touched.exercise_demo_video &&
              formik.errors.exercise_demo_video ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.exercise_demo_video}
                </FormHelperText>
              ) : null}
            </Box>

            <Box className="form-button-c">
              <Box>
                <Button
                  className="form-button cancel-button"
                  onClick={() => {
                    console.log("slfadjlf");
                  }}
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button className="form-button save-button" type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Index;
