import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../components/Admin/Login";
import Dashboard from "../components/Admin/Dashboard";
import OrderManagement from "../components/Admin/OrderManagement";
import ProductManagement from "../components/Admin/ProductManagement";
import CompanyDetails from "../components/Admin/CompanyDetails";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <ProtectedRoute>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/company"
          element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;
