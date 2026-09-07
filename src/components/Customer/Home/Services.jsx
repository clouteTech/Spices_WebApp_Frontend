import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";

const services = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 50 }} />,
    title: "Premium Quality",
    desc: "Carefully selected and tested spices",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 50 }} />,
    title: "Secure Payment",
    desc: "100% safe and secure payment methods",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 50 }} />,
    title: "Fast Delivery",
    desc: "Quick and reliable delivery across India",
  },
];

const Services = () => {
  return (
    // <Box sx={{ py: 6, background: "#2e2e2e" }}>
    <Box
      sx={{
        py: 6,
        color: "#000",

        // 🔥 GRADIENT BACKGROUND
        background: "#6f3333ff",
        backgroundSize: "400% 400%",

        // 🔥 ANIMATION
        animation: "gradientMove 10s ease infinite",

        // 🔥 KEYFRAMES
        "@keyframes gradientMove": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {services.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: "20px",
                  transition: "0.3s",
                  cursor: "pointer",
                  background: "#f9f9f9",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 4,
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "#fff3e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 2,
                    color: "#d2691e",
                  }}
                >
                  {item.icon}
                </Box>

                {/* TITLE */}
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "18px", mb: 1 }}
                >
                  {item.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography sx={{ fontSize: "14px", color: "#666" }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
