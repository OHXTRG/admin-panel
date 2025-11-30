import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to={"/admin/login"} />;
};

export default ProtectedRoute;
