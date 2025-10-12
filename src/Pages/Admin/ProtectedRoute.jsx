import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  console.log(`The User is ${isAuthenticated} ......`);
  return isAuthenticated ? children : <Navigate to={"/authenticate"} />;
};

export default ProtectedRoute;
