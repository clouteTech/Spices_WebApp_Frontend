import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../components/Customer/ProductDetail";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Profile from "../components/Customer/Profile";
import Login from "../components/Customer/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Footer from "../components/Customer/layouts/Footer";
import Navbar from "../components/Customer/layouts/Navbar";
import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext";

const CustomerRoutes = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
};

export default CustomerRoutes;
