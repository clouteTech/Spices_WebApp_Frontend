import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastProvider>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} transition={Slide} />
        </ToastProvider>
      </UserProvider>
    </>
  );
};

export default App;
