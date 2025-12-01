import { Routes, Route } from "react-router";
import React from "react";
import Authenticate from "../pages/Authenticate";
import ErrorPage from "../pages/ErrorPage";
import Exercises from "../pages/Exercise/Exercises";
import Workouts from "../pages/workouts/Workouts";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import ProtectedRoute from "../utils/ProtectedRoutes";
import { useSelector } from "react-redux";
import { RedirectToAdmin } from "../utils/RedirectRoutes";
const Index = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectToAdmin />} />
        <Route path="admin" errorElement={<ErrorPage />}>
          <Route path="login" element={<Authenticate />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="workouts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Workouts />
                </ProtectedRoute>
              }
            />
            <Route
              path="exercises"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Exercises />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default Index;
