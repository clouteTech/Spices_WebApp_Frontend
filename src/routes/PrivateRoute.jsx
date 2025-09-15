import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, role } = useUser();
  return isAuthenticated && role === "customer" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
