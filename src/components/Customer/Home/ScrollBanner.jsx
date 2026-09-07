import React from "react";
import { Box, Typography } from "@mui/material";

const ScrollBanner = () => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        py: 2,
        background: "#381324",
        color: "#efdfdf",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: "scrollText 25s linear infinite",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            fontWeight: 200,
            letterSpacing: "0.8px",
            textShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        >
          🌿 100% Natural Spices • 🌶️ Rich Aroma & Flavor • 🚜 Farm Sourced
          Ingredients • 📦 Freshly Packed • 🍃 No Artificial Colors • 🍛 Elevate
          Your Cooking Experience
        </Typography>
      </Box>

      {/* Animation */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default ScrollBanner;
