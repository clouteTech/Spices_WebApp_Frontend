import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
// import Spices from "../../Data/Spices";
import ProductTabs from "./ProductTabs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { getProductDetails } from "../../services/productDetail";
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

const productTypeName = {
  RS: "Raw Spices",
  BS: "Blended Spices",
  PS: "Powdered Spices",
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  // const product = Spices.find((item) => item.id === parseInt(id));
  const [selectedVariant, setSelectedVariant] = useState(undefined);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const totalPrice = selectedVariant?.price || 0;

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductDetails(id);
        const data = res?.data?.data;

        if (!data) return;

        const defaultVariant =
          data.variants?.find((v) => v.priceId === data.defaultPriceId) ||
          data.variants?.[0];

        const primaryIndex = data?.images?.findIndex((i) => i.primary) ?? 0;

        // ✅ Update all together (important)
        setProduct(data);
        setSelectedVariant(defaultVariant);
        setActiveImageIndex(primaryIndex >= 0 ? primaryIndex : 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  // if (!product || !selectedVariant) {
  //   return (
  //     <Container sx={{ py: 5 }}>
  //       <Typography variant="h6">Product not found</Typography>
  //     </Container>
  //   );
  // }

  if (!product || !selectedVariant) {
    return <Container sx={{ py: 5 }} />; // 👈 EMPTY, NOT TEXT
  }

  // const handleAdd = () => {
  //   const productToAdd = {
  //     productPriceId: selectedVariant.priceId,
  //     productName: product.productName,
  //     size: selectedVariant.size,
  //     sellingPrice: selectedVariant.price,
  //     thumbnail:
  //       product.images?.[activeImageIndex]?.thumbnailUrl ||
  //       product.images?.[0]?.thumbnailUrl ||
  //       "",
  //   };

  //   addToCart(productToAdd);

  //   toast.success(
  //     `${product.productName} - ${selectedVariant.size} Added to cart`,
  //   );
  // };

  const handleAdd = async () => {
    const productToAdd = {
      productPriceId: selectedVariant.priceId,
      productName: product.productName,
      size: selectedVariant.size,
      sellingPrice: selectedVariant.price,
      thumbnail:
        product.images?.[activeImageIndex]?.thumbnailUrl ||
        product.images?.[0]?.thumbnailUrl ||
        "",
    };

    try {
      await addToCart(productToAdd);

      toast.success(
        `${product.productName} - ${selectedVariant.size} Added to cart`,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Could not add item to cart. Please try again.",
      );
    }
  };

  const features = [
    { icon: <LocalShippingOutlinedIcon />, label: "Free Delivery" },
    { icon: <AccountBalanceWalletOutlinedIcon />, label: "Cash On Delivery" },
    { icon: <ReplayOutlinedIcon />, label: "Refundable" },
    { icon: <LockOutlinedIcon />, label: "Secure Transaction" },
  ];

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ py: 5, px: 5, animation: "fadeIn 0.4s ease-in" }}
    >
      <Grid container spacing={4}>
        {/* LEFT SIDE - IMAGE */}
        {/* <Grid item xs={12} md={5}>
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
        </Grid> */}

        <Grid item xs={12} md={1}>
          {/* <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
          >
            {product.images.map((img, index) => (
              <Box
                key={img.id}
                onClick={() => setActiveImageIndex(index)}
                sx={{
                  width: 74,
                  height: 74,
                  padding: "3px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border:
                    activeImageIndex === index
                      ? "2px solid #ff9800"
                      : "1px solid #ccc",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    border: "2px solid #ff9800",
                  },
                }}
              >
                <img
                  src={`${BASE_URL}${img.thumbnailUrl}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </Box>
            ))}
          </Box> */}
          {/* <Box sx={{display:"flex",gap:2,alignItems:"flex-start"}}> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              // mt:2
            }}
          >
            {product?.images?.map((img, index) => (
              <Box
                key={img.id}
                onClick={() => setActiveImageIndex(index)}
                sx={{
                  width: 64,
                  height: 64,
                  padding: "3px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border:
                    activeImageIndex === index
                      ? "2px solid #ff9800"
                      : "1px solid #ccc",
                  backgroundColor: "#fff",
                  "&:hover": {
                    border: "2px solid #ff9800",
                  },
                }}
              >
                <img
                  src={`${BASE_URL}${img.thumbnailUrl}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "relative",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              p: 2,
              backgroundColor: "#fff",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            {/* MAIN IMAGE */}
            <img
              src={`${BASE_URL}${product?.images?.[activeImageIndex]?.imageUrl || ""}`}
              alt={product.productName}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "contain",
                borderRadius: "20px",
              }}
            />

            {/* LEFT ARROW */}
            <Button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === 0 ? product?.images?.length - 1 : prev - 1,
                )
              }
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                minWidth: "40px",
              }}
            >
              <ArrowBackIosOutlinedIcon />
            </Button>

            {/* RIGHT ARROW */}
            <Button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === product?.images?.length - 1 ? 0 : prev + 1,
                )
              }
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                minWidth: "40px",
              }}
            >
              <ArrowForwardIosOutlinedIcon />
            </Button>

            {/* THUMBNAILS */}
            {/* <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
            >
              {product.images.map((img, index) => (
                <img
                  key={img.id}
                  src={`${BASE_URL}${img.thumbnailUrl}`}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                    border:
                      activeImageIndex === index
                        ? "2px solid orange"
                        : "1px solid #ccc",
                  }}
                />
              ))}
            </Box> */}
          </Box>
        </Grid>

        {/* RIGHT SIDE - DETAILS */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom>
            {product.productName}
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: "1.5rem",
                ml: 1,
                textAlign: "center",
              }}
            >
              ({selectedVariant.size})
            </Box>
          </Typography>

          {/* Price & GST */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" color="primary">
              ₹{totalPrice}
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              ({selectedVariant.gst}% GST exclusive)
            </Typography>
          </Box>

          {/* Rating */}
          {/* <Box sx={{ mt: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1, display: "inline" }}>
              {product.rating} / 5
            </Typography>
          </Box> */}

          {/* Availability */}
          <Typography variant="body2" sx={{ mt: 1 }}>
            Availability:
            <strong>
              {selectedVariant.inStock ? "In Stock" : "Out of Stock"}
            </strong>
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Type: <strong>{product.productName}</strong>
          </Typography>

          {/* Size Selection */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Select Size:</Typography>
            {product?.variants?.map((variant) => (
              <Button
                key={variant.priceId}
                variant={
                  selectedVariant.priceId === variant.priceId
                    ? "contained"
                    : "outlined"
                }
                sx={{
                  m: 1,
                  borderRadius: "20px",
                  borderColor: "#7b1e2b",
                  color:
                    selectedVariant.priceId === variant.priceId
                      ? "#fff"
                      : "#7b1e2b",
                  background:
                    selectedVariant.priceId === variant.priceId
                      ? "linear-gradient(90deg, #7b1e2b, #a83232)"
                      : "transparent",
                  "&:hover": {
                    background: "linear-gradient(90deg, #7b1e2b, #a83232)",
                    color: "#fff",
                  },
                }}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.size}
              </Button>
            ))}
          </Box>

          {/* Add to Cart */}
          {/* <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, mr: 2 }}
            onClick={handleAdd}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={product.Availability !== "Instock"}
          >
            Buy Now
          </Button> */}

          <Button
            variant="contained"
            sx={{
              mt: 3,
              mr: 2,
              px: 4,
              py: 1.5,
              borderRadius: "25px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #7b1e2b, #a83232)",
              color: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #5a1420, #8b2626)",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleAdd}
          >
            Add to Cart
          </Button>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              borderRadius: "25px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #7b1e2b, #a83232)",
              color: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #5a1420, #8b2626)",
                transform: "scale(1.05)",
              },
            }}
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
                <strong>Category Name:</strong> {product.categoryName}
              </Typography>
              <Typography variant="body2">
                <strong>Product Type:</strong>{" "}
                {productTypeName[product.productType]}
              </Typography>
              <Typography variant="body2">
                <strong>Container Type:</strong> {selectedVariant.packageType}
              </Typography>
              <Typography variant="body2">
                <strong>Diet Type:</strong>{" "}
                {product.dietType ? "Vegeterian" : "Non-Vegeterian"}
              </Typography>
              <Typography variant="body2">
                <strong>Organic:</strong> {product.Organic ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Preservatives Added:</strong>{" "}
                {product.AddPreservatives ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Ingredients:</strong> {product.ingredients}
              </Typography>
              <Typography variant="body2">
                <strong>Shelf Life:</strong> {selectedVariant.shelfLife}
              </Typography>
              {/* <Typography variant="body2">
                <strong>Manufacture Date:</strong>
                {product.ManufactureDate}
              </Typography>
              <Typography variant="body2">
                <strong>Expiry Date:</strong> {product.ExpiryDate}
              </Typography> */}
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
      <ProductTabs product={product} />
    </Container>
  );
};

export default ProductDetail;
