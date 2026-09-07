import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminPublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useUser();

  // 🔁 Admin already logged in → dashboard
  if (isAuthenticated && role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 🔓 Allow admin login page
  return children;
};

export default AdminPublicRoute;
