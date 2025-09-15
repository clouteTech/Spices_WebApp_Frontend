import React from "react";
import Navbar from "./components/Customer/layouts/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerRoutes from "./routes/CustomerRoutes";
import Footer from "./components/Customer/layouts/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AdminRoutes/> */}
      <CustomerRoutes />
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
