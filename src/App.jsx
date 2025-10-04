import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes,Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useUser } from "./context/UserContext";

const App = () => {
  const { role } = useUser();
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </UserProvider>
    </>
  );
};

export default App;
