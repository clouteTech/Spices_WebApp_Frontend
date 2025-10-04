import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "admin") {
    return <h1>Unauthorized - you cannot access this page </h1>;
  }
  return children;
};

export default ProtectedRoute;
