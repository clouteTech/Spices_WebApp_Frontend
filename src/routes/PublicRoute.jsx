import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated,role } = useUser();
  if(!isAuthenticated){
    return children;
  }
  if(role === "admin"){
    return <Navigate to="/admin/dashboard" replace/>
  } else if(role === "customer"){
    return <Navigate to="/" replace/>
  }
  return children;
};

export default PublicRoute;
