import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Backdrop,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import AuthHeader from "../components/Headers/AuthHeader";
import CustomTextField from "../components/FormComponents/CustomtextField";
import { loginApi } from "../features/user.slice";

function Authenticate() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.user);

  const location = window.location.href;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter valid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(loginApi(values));
    },
  });

  useEffect(() => {
    console.log(auth, "user auth state");
  }, [auth]);

  return (
    <>
      {auth.isAuthenticated ? (
        <Backdrop sx={{ color: "#0eb0c0" }} open="true">
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box
          component={"section"}
          sx={{
            backgroundColor: "#EEF0F8",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
          id={"login_section"}
        >
          <AuthHeader />

          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "25px 35px",
                borderRadius: 5,
                backgroundColor: "#fff",
                minWidth: "517px",
              }}
            >
              <Typography
                component="h4"
                sx={{
                  textAlign: "center",
                  fontFamily: "Almarai",
                  fontWeight: 700,
                  fontSize: 30,
                  marginBottom: "0",
                }}
                gutterBottom
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontFamily: "Almarai",
                  fontSize: 17,
                  color: "#666666",
                }}
              >
                Enter login details
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{ marginTop: "20px" }}
              >
                <Box
                  className="form"
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box className="form-control">
                    <Typography component={"label"} htmlFor="email">
                      Email
                    </Typography>
                    <CustomTextField
                      fullWidth
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="john@gmail.com"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormHelperText sx={{ color: "red" }}>
                        {formik.errors.email}
                      </FormHelperText>
                    ) : null}
                  </Box>
                  <Box className="form-control">
                    <Typography component={"label"} htmlFor="email">
                      Password
                    </Typography>
                    <CustomTextField
                      fullWidth
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPassword ? "text" : "password"}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                sx={{ width: "100%", padding: "0 11px" }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormHelperText sx={{ color: "red" }}>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </Box>

                  <Button
                    className="submit_btn"
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      mt: 4,
                      backgroundColor: "#3758F9",
                    }}
                    disabled={auth.loading}
                  >
                    {auth.loading ? (
                      <CircularProgress size={28} sx={{ color: "#fff" }} />
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Authenticate;
