import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Admin/Login";
import Dashboard from "../components/Admin/Dashboard";
import OrderManagement from "../components/Admin/OrderManagement";
import CompanyDetails from "../components/Admin/CompanyDetails";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../components/Admin/AdminLayout";
import SizeMaster from "../components/Admin/productManagement/SizeMaster";
import CategoryMaster from "../components/Admin/productManagement/CategoryMaster";
import ProductPrice from "../components/Admin/productManagement/ProductPrice";
import PackageType from "../components/Admin/productManagement/PackageType";
import BatchDetails from "../components/Admin/productManagement/BatchDetails";
import adminTheme from "../theme/AdminTheme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import ProductsMaster from "../components/Admin/productManagement/ProductsMaster";
import BatchMaster from "../components/Admin/productManagement/BatchMaster";

const AdminRoutes = () => {
  return (
    <>
      <ThemeProvider theme={adminTheme}>
        <CssBaseline />
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
            <Route path="ProductsMaster" element={<ProductsMaster />} />
            <Route path="SizeMaster" element={<SizeMaster />} />
            <Route path="ProductPrice" element={<ProductPrice />} />
            <Route path="PackageType" element={<PackageType/>}/>
            <Route path="CategoryMaster" element={<CategoryMaster />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="BatchMaster" element={<BatchMaster/>}/>
            <Route path="BatchDetails" element={<BatchDetails/>}/>
            <Route path="company/:companyId" element={<CompanyDetails />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default AdminRoutes;
