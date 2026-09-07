import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import WelcomeImg from "../../../assets/Welcome.jpg";

const Welcome = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "#fff8f0",
        "@keyframes slideRight": {
          "0%": {
            opacity: 0,
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={WelcomeImg}
              alt="Spices"
              // sx={{
              //   width: "100%",
              //   maxWidth: "450px",
              //   height: "auto",
              //   display: "block",
              //   margin: "0 auto",
              //   borderRadius: "20px",
              //   boxShadow: 3,
              //   opacity: 0,
              //   animation: "fadeUp 1s ease forwards",
              //   animationDelay: "0.2s",
              // }}
              sx={{
                width: "100%",
                maxWidth: "450px",
                height: "auto",
                borderRadius: "20px",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: "650px",
            }}
          >
            <Typography
              sx={{
                color: "#d2691e",
                fontWeight: 600,
                mb: 1,
                opacity: 0,
                animation: "slideRight 1s ease forwards",
                animationDelay: "0.3s",
              }}
            >
              Premium Quality Spices
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.3,
                mb: 2,
                color: "#3e2723",
                opacity: 0,
                animation: "slideRight 0.8s ease forwards",
                animationDelay: "0.3s",
                "@keyframes slideRight": {
                  "0%": {
                    opacity: 0,
                    transform: "translateX(60px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              Welcome to Spice World
            </Typography>
            <Typography
              sx={{
                mb: 3,
                color: "#555",
                lineHeight: 1.8,
                opacity: 0,
                animation: "slideRight 0.8s ease forwards",
                animationDelay: "0.4s",
              }}
            >
              From farm to kitchen, Spice World brings you authentic, handpicked
              spices packed with freshness and rich flavor.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  mb: 1,
                  opacity: 0,
                  animation: "slideRight 0.8s ease forwards",
                  animationDelay: "0.7s",
                }}
              >
                🌿 <strong>100% Natural & Pure</strong> – No chemicals, just
                authentic spices
              </Typography>

              <Typography
                sx={{
                  mb: 1,
                  animation: "slideRight 0.8s ease forwards",
                  animationDelay: "0.7s",
                }}
              >
                🚜 <strong>Directly from Farmers</strong> – Sourced from trusted
                farms
              </Typography>

              <Typography
                sx={{
                  mb: 1,
                  animation: "slideRight 0.8s ease forwards",
                  animationDelay: "0.7s",
                }}
              >
                📦 <strong>Freshly Packed</strong> – Sealed to preserve aroma &
                taste
              </Typography>
            </Box>
            {/* <Button
              variant="contained"
              sx={{
                backgroundColor: "#d2691e",
                borderRadius: "25px",
                px: 5,
                py: 1.5,
                width: "fit-content",
                textTransform: "none",
                opacity: 0,
                animation: "fadeUp 1s ease forwards",
                animationDelay: "0.6s",
                "&:hover": {
                  backgroundColor: "#a0522d",
                },
              }}
            >
              Explore Products
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Welcome;
