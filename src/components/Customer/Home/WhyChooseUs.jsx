import React from "react";
import { Box, Typography, Container } from "@mui/material";

import Cloves from "../../../assets/Cloves.jpg";
import Farming from "../../../assets/home.jpg";
import Traditional from "../../../assets/homePage.jpg";
import Bayleaves from "../../../assets/Bayleaves.jpg";

const data = [
  {
    title: "Direct Farm Sourcing",
    desc: "We partner with passionate farmers across India to bring you spices that are fresh, pure, and full of life.",
    image: Cloves,
  },
  {
    title: "Quality Testing",
    desc: "Every batch undergoes strict quality checks for purity and freshness.",
    image: Farming,
  },
  {
    title: "Traditional Methods",
    desc: "We preserve authentic taste using traditional processing methods.",
    image: Traditional,
  },
  {
    title: "Spice Story",
    desc: "Every spice tells a story — handpicked from trusted farms and crafted to bring authentic taste to your home.",
    image: Bayleaves,
  },
];

const WhyChooseUs = () => {
  return (
    <Box sx={{ py: 8, background: "#f8f5f2" }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              background: "#d8b98a",
              borderRadius: "20px",
              p: 4,
              color: "#fff",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Spices sourced directly from 200+ farms across India
            </Typography>
          </Box>

          {/* RIGHT SIDE SCROLL */}
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              display: "flex",
              gap: 3,
              overflowX: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#c59d5f",
                borderRadius: "10px",
              },
            }}
          >
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: "250px",
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ fontSize: "14px", color: "#666" }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
