import React from "react";
import { Routes, Route } from "react-router";
import Authenticate from "../Pages/Admin/Authenticate";
import AdminLayout from "../Pages/Admin/Layout";
import Dashboard from "../Pages/Admin/Dashboard";
import Users from "../Pages/Admin/Users";
import ProtectedRoute from "../Pages/Admin/ProtectedRoute";
import { useSelector } from "react-redux";

const Index = () => {
  const user = useSelector((state) => state.user);
  console.dir(user);
  return (
    <Routes>
      <Route path="/authenticate" element={<Authenticate />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthenticated={user.isAuthenticated}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Index;
