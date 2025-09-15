import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Spices from "../../Data/Spices";

const ProductCard = ({ id, img, name, price, variants, onAdd }) => {
  const navigate = useNavigate();
  const spice = Spices.find((spice) => spice.id === id);
  const [selectedSize, setSelectedSize] = useState(
    Array.isArray(variants) && variants.length > 0 ? variants[0].size : ""
  );

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    onAdd({ ...spice, size: selectedSize });
    navigate("/cart");
  };

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        width: 250,
        maxWidth: "100%",
        height: "auto",
        boxShadow: 6,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow:8
        },
      }}
      onClick={handleViewDetails}
    >
      <Box
        sx={{
          height: 180,
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={img}
          alt={name}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            aspectRatio: "3/2",
            borderRadius: "4px",
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "8px 6px",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{price * selectedSize}
          </Typography>
        </Box>
        {Array.isArray(variants) && variants.length > 0 && (
          <FormControl
            fullWidth
            size="small"
            sx={{ mt: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              label="Size"
              size="small"
              onChange={(e) => {
                e.stopPropagation();
                setSelectedSize(e.target.value);
              }}
              sx={{ mt: 0.5 }}
            >
              {variants.map((variant) => (
                <MenuItem
                  key={variant.id}
                  value={variant.size}
                  onClick={(e) => e.stopPropagation()}
                >
                  {variant.size}g
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
          <Button
            variant="contained"
            color="warning"
            onClick={handleAddtoCart}
            sx={{ textAlign: "right", mt: 1, py: 0.7 }}
          >
            Add to Cart
          </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
