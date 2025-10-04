import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Admin/Login";
import Dashboard from "../components/Admin/Dashboard";
import OrderManagement from "../components/Admin/OrderManagement";
import AddProduct from "../components/Admin/productManagement/AddProduct"
import CompanyDetails from "../components/Admin/CompanyDetails";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/Admin/AdminLayout";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="company/:companyId" element={<CompanyDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
