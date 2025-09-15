import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Spices from "../../Data/Spices";
import ProductTabs from "./ProductTabs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
  Stack,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const {addToCart} = useCart();
  const product = Spices.find((item) => item.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(100);
  const totalPrice = Number((product.price * selectedSize).toFixed(2));

  if (!product) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  const handleAdd = () => {
    const productToAdd = {
      ...product,
      selectedSize,
      totalPrice: Number(totalPrice),
      quantity: 1,
    };
    addToCart(productToAdd);
    toast.success(`${product.name}-${selectedSize} Added to cart`);
    console.log(toast);
  };

  const features = [
    { icon: <LocalShippingOutlinedIcon />, label: "Free Delivery" },
    { icon: <AccountBalanceWalletOutlinedIcon />, label: "Cash On Delivery" },
    { icon: <ReplayOutlinedIcon />, label: "Refundable" },
    { icon: <LockOutlinedIcon />, label: "Secure Transaction" },
  ];

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {/* LEFT SIDE - IMAGE */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "12px",
              p: 2,
              backgroundColor: "#fff",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT SIDE - DETAILS */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom>
            {product.name}
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                ml: 1,
                textAlign: "center",
              }}
            >
              ({selectedSize}g)
            </Box>
          </Typography>

          {/* Price & GST */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" color="primary">
              ₹{totalPrice}
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              ({product.gst}% GST incl)
            </Typography>
          </Box>

          {/* Rating */}
          <Box sx={{ mt: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1, display: "inline" }}>
              {product.rating} / 5
            </Typography>
          </Box>

          {/* Availability */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            Availability: <strong>{product.Availability}</strong>
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Type: <strong>{product.name}</strong>
          </Typography>

          {/* Size Selection */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Select Size:</Typography>
            {product.variants.map((variant) => (
              <Button
                key={variant.id}
                variant={
                  selectedSize === variant.size ? "contained" : "outlined"
                }
                color={selectedSize === variant.size ? "warning" : "secondary"}
                sx={{ m: 1 }}
                onClick={() => setSelectedSize(variant.size)}
              >
                {variant.size}g
              </Button>
            ))}
          </Box>

          {/* Add to Cart */}
          <Button variant="contained" color="primary" sx={{ mt: 3, mr: 2 }} onClick={handleAdd}>
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={product.Availability !== "Instock"}
          >
            Buy Now
          </Button>

          <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
            {features.map((feature) => (
              <Box
                key={feature.label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {feature.icon}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {feature.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 5 }} />

          {/* Additional Product Info */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              <strong>PRODUCT INFORMATION</strong>
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Product Type:</strong> {product.name}
              </Typography>
              <Typography variant="body2">
                <strong>Container Type:</strong> {product.ContainerType}
              </Typography>
              <Typography variant="body2">
                <strong>Diet Type:</strong> {product.DietType}
              </Typography>
              <Typography variant="body2">
                <strong>Organic:</strong> {product.Organic}
              </Typography>
              <Typography variant="body2">
                <strong>Preservatives Added:</strong>
                {product.AddPreservatives}
              </Typography>
              <Typography variant="body2">
                <strong>Ingredients:</strong> {product.Ingredients}
              </Typography>
              <Typography variant="body2">
                <strong>Form Factor:</strong> {product.FormFactor}
              </Typography>
              <Typography variant="body2">
                <strong>Shelf Life:</strong> {product.MaximumShelfLife}
              </Typography>
              <Typography variant="body2">
                <strong>Manufacture Date:</strong>
                {product.ManufactureDate}
              </Typography>
              <Typography variant="body2">
                <strong>Expiry Date:</strong> {product.ExpiryDate}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "orange", fontStyle: "italic" }}
              >
                <strong>Note:</strong> {product.ImportantNote}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <ProductTabs />
    </Container>
  );
};

export default ProductDetail;
