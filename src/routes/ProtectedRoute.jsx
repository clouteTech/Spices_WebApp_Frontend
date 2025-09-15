import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Sidebar from "../components/Admin/Sidebar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useUser();

  if (!isAuthenticated || role !== "admin"){
    return <Navigate to="/admin-login"/>
  }
    return(
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{flex:1}}>{children}</div>
      </div>
    )
};

export default ProtectedRoute;
