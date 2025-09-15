import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PubliceRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PubliceRoute;
