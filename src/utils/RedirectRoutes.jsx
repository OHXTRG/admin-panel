import React from "react";
import { Navigate } from "react-router";
export const RedirectToAdmin = () => {
  return <Navigate to={"/admin/dashboard"} />;
};
