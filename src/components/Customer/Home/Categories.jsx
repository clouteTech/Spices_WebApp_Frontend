import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import RawSpice from "../../../assets/RawSpice.png";
import BlendedSpices from "../../../assets/BlendedSpices.jpg";
import Powdered from "../../../assets/Powdered.jpg";
import Combos from "../../../assets/Combos3.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Blended Spice",
    image: BlendedSpices,
    category: "Blended Spice",
  },
  {
    name: "Powdered Spice",
    image: Powdered,
    category: "Powdered Spice",
  },
  {
    name: "Whole Spice",
    image: RawSpice,
    category: "Whole Spice",
  },
  {
    name: "Combos",
    image: Combos,
    category: "Combos",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ py: 8, background: "linear-gradient(135deg, #fff3e0, #ffe0b2)" }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#7b1b3a",
            mb: 1,
          }}
        >
          SHOP BY CATEGORY
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            mb: 5,
            color: "#777",
          }}
        >
          Get the quality Spices
        </Typography>

        {/* Grid */}
        <Grid container spacing={5} alignItems="center">
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(cat.category)}`,
                  )
                }
                sx={{
                  position: "relative",
                  height: "280px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-8px)", // 🔥 lift
                    boxShadow: 6,
                  },
                  "&:hover img": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.name}
                  sx={{
                    width: "100%",
                    // maxWidth: "350px",
                    height: "100%",
                    borderRadius: "20px",
                    display: "block",
                    objectFit: "cover",
                    transition: "0.5s",
                  }}
                />

                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  }}
                />

                {/* Text */}
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 15,
                    left: 15,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {cat.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
