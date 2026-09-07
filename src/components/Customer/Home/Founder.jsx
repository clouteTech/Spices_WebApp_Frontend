import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import FounderImg from "../../../assets/logo1.png"; // change later
import FounderImg1 from "../../../assets/Founder.png";

const Founder = () => {
  return (
    <Box sx={{ py: 10, background: "#fff" }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          {/* IMAGE */}
          {/* <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "300px",
                height: "300px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  width: "100%",
                  height: "100%",
                  background: "#fff3e0",
                  borderRadius: "20px",
                  boxShadow: 3,
                  zIndex: 1,
                }}
              />
              <Box
                component="img"
                src={FounderImg}
                alt="Founder"
                sx={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "300px",
                  borderRadius: "20px",
                  boxShadow: 4,
                  objectFit: "cover",
                  boxShadow: 4,
                  zIndex: 2,
                }}
              />
            </Box>
          </Grid> */}

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "260px", md: "400px" }, // 🔥 RESPONSIVE SIZE
                height: { xs: "260px", md: "400px" },
                transition: "0.4s",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              {/* BACK CARD */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  width: "100%",
                  height: "100%",
                  background: "#e6d5b8",
                  borderRadius: "20px",
                  boxShadow: 3,
                  zIndex: 1,
                }}
              />

              {/* FRONT IMAGE */}
              <Box
                component="img"
                src={FounderImg}
                alt="Founder"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: 6,
                  zIndex: 2,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              />
            </Box>
          </Grid>

          {/* TEXT */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              textAlign: { xs: "center", md: "left" },
              maxWidth: "600px",
              px: { xs: 2, md: 0 },
            }}
          >
            {/* Heading */}
            <Typography
              sx={{
                color: "#d2691e",
                fontWeight: 600,
                mb: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Meet Our Founder
            </Typography>

            {/* Quote */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.5,
                mb: 3,
                color: "#3e2723",
              }}
            >
              “Our mission is to bring authentic, farm-fresh spices to every
              kitchen while supporting the farmers who grow them.”
            </Typography>

            {/* Description */}
            <Typography sx={{ color: "#555", lineHeight: 1.8, mb: 3 }}>
              At Spice Harvest, we believe that quality begins at the source.
              Our journey started with a passion for delivering pure, natural
              spices directly from farmers across India. Every product reflects
              our commitment to freshness, tradition, and trust.
            </Typography>

            {/* Name */}
            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              Govindraj Krishnamurthy
            </Typography>

            {/* Role */}
            <Typography sx={{ color: "#777" }}>
              Founder & CEO, Spice Harvest
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Founder;
