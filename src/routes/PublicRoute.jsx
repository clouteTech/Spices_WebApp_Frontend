// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const PublicRoute = ({ children }) => {
//   const { isAuthenticated,role } = useUser();
//   if(!isAuthenticated){
//     return children;
//   }
//   if(role === "admin"){
//     return <Navigate to="/admin/dashboard" replace/>
//   } else if(role === "customer"){
//     return <Navigate to="/" replace/>
//   }
//   return children;
// };

// export default PublicRoute;
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useUser();

  // 🔓 Not logged in → allow page
  if (!isAuthenticated) {
    return children;
  }

  // 🔁 Customer already logged in → home
  if (role === "customer") {
    return <Navigate to="/profile" replace />;
  }

  // 🔓 Admin logged in → allow (do NOT redirect)
  return children;
};

export default PublicRoute;
