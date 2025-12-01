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
  Chip,
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
import CustomAutoComplete from "../../components/FormComponents/CustomAutoFill";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import ExerciseListComponent from "./ExerciseListComponent";
import { generateUUID } from "../../utils/commonFunctions";
import MovableExerciseList from "./MovableExerciseList";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const exerciseData = useSelector((state) => state.exerciseState);
  const [exerciseList, setExerciseList] = useState([
    { id: "", name: "", list_id: generateUUID() },
  ]);

  const formik = useFormik({
    initialValues: {
      workoutName: "",
      description: "",
      thumbnailImage: "",
    },
    validationSchema: yup.object({
      workoutName: yup.string().required("Please fill the workout name."),
      description: yup.string().required("Please fill the description."),
      thumbnailImage: yup
        .mixed()
        .required("Please upload the exercise thumbnail"),
      exercises: yup
        .array()
        .of(yup.string().trim().min(1, "Exercise can't be empty"))
        .min(1, "Alleast one exercise is required")
        .required("Alleast one exercise is required"),
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
            Create Workout
          </Typography>
        </Box>

        <Box className="create-exercise-form-wrapper">
          <form className="create-exercise-form" onSubmit={formik.handleSubmit}>
            <Typography className="create-workout-form-head" component={"h1"}>
              Basics Details
            </Typography>
            <Box className="form-control">
              <Typography component={"label"} htmlFor="workoutName">
                Workout Name
              </Typography>
              <CustomTextField
                placeholder="Enter workout name"
                name="workoutName"
                value={formik.values.workoutName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.workoutName && formik.errors.workoutName ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.workoutName}
                </FormHelperText>
              ) : null}
            </Box>
            <Box className="form-control">
              <Typography component={"label"} htmlFor="description">
                Description
              </Typography>
              <CustomTextField
                placeholder="Enter description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={4}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </Box>

            <Box className="form-control">
              <Typography component={"label"} htmlFor="thumbnailImage">
                Thumbnail Image
              </Typography>
              <CustomImageUploader formik={formik} name="thumbnailImage" />
              {formik.touched.thumbnailImage && formik.errors.thumbnailImage ? (
                <FormHelperText className="custom-form-error">
                  {formik.errors.thumbnailImage}
                </FormHelperText>
              ) : null}
            </Box>

            <Typography component={"h1"} className="create-workout-form-head">
              Exercises
            </Typography>
            {/* 
            {exerciseList.map((exerciseItem) => {
              return (
                <ExerciseListComponent
                  options={exerciseData?.data || []}
                  formik={formik}
                  exerciseItem={exerciseItem}
                  setExerciseList={setExerciseList}
                  exerciseList={exerciseList}
                />
              );
            })} */}

            <MovableExerciseList
              options={exerciseData?.data || []}
              setExerciseList={setExerciseList}
              exerciseList={exerciseList}
              formik={formik}
            />

            <Box className="add-exercise">
              <Chip
                icon={<AddIcon sx={{ color: "#2346EE !important" }} />}
                label="Add exercise"
                sx={{
                  backgroundColor: "#E0E5FF",
                  color: "#2346EE",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() =>
                  setExerciseList((prev) => [
                    ...prev,
                    { id: "", name: "", list_id: generateUUID() },
                  ])
                }
              />
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
