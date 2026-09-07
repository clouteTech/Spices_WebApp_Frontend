import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import homePage from "../assets/homePage.jpg";
import home from "../assets/home.jpg";
import ScrollBanner from "../components/Customer/Home/ScrollBanner";
import Welcome from "../components/Customer/Home/Welcome";
import Categories from "../components/Customer/Home/Categories";
import WhyChooseUs from "../components/Customer/Home/WhyChooseUs";
import Services from "../components/Customer/Home/Services";
import Founder from "../components/Customer/Home/Founder";
import Testimonials from "../components/Customer/Home/Testimonial";
import home2 from "../assets/home2.jpg";

const Home = () => {
  const heroImages = [home, home2];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  return (
    <>
      <Box>
        {/* ═══════════════════════════════
           SECTION 1 — HERO
      ═══════════════════════════════ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "center",
            gap: 4,
            px: { xs: 4, md: 10 },
            py: { xs: 6, md: 10 },
            // background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.1)), url(${heroImages[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "88vh",
            position: "relative",
            overflow: "hidden",
            transition: "background-image 12s ease-in-out",
          }}
        >
          {/* SLIDER */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "200%", // 2 images
                transform: `translateX(-${current * 50}%)`,
                transition: "transform 0.8s ease-in-out",
              }}
            >
              <img
                src={home}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <img
                src={home2}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2))",
              zIndex: 1,
            }}
          />
          {/* LEFT — Text */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            {/* Badge */}
            <Box
              sx={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                px: 2,
                py: 0.6,
                borderRadius: "40px",
                fontSize: "13px",
                mb: 2,
              }}
            >
              🌿 100% Natural & Organic
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontSize: { xs: "36px", md: "58px" },
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Pure Spices, <br />
              <Box
                component="span"
                sx={{ fontStyle: "italic", color: "#FFE0B2" }}
              >
                Pure Flavors
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.8,
                maxWidth: "420px",
                mb: 4,
              }}
            >
              From the heart of Kerala's lush spice farms to your kitchen —
              every jar carries the story of soil, sun, and generations of
              expertise.
            </Typography>

            {/* Buttons */}
            <Stack direction="row" spacing={2} flexWrap="wrap" mb={5}>
              <Button
                sx={{
                  background: "#fff",
                  color: "#E65C00",
                  borderRadius: "40px",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  "&:hover": { background: "#FFE0B2" },
                }}
              >
                Explore Products
              </Button>
              <Button
                sx={{
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  borderRadius: "40px",
                  px: 4,
                  py: 1.5,
                  fontSize: "14px",
                  textTransform: "none",
                  "&:hover": { background: "rgba(255,255,255,0.1)" },
                }}
              >
                Our Story
              </Button>
            </Stack>

            {/* Stats */}
            <Stack direction="row" spacing={5}>
              {[
                { num: "120+", label: "Spice Varieties" },
                { num: "15K+", label: "Happy Customers" },
                { num: "8+", label: "Years of Trust" },
              ].map((stat) => (
                <Box key={stat.label}>
                  <Typography
                    sx={{ fontSize: "28px", fontWeight: 700, color: "#fff" }}
                  >
                    {stat.num}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          {/* LEFT */}
          <Box
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 20,
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255,255,255,0.3)",
              color: "#fff",
              borderRadius: "50%",
              width: 45,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              "&:hover": {
                background: "#fff",
                color: "#000",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            ❮
          </Box>

          {/* RIGHT */}
          <Box
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 20,
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.3)",
              zIndex: 10,
              color: "#fff",
              borderRadius: "50%",
              width: 45,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              "&:hover": {
                background: "#fff",
                color: "#000",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
          >
            ❯
          </Box>
        </Box>

        {/* ═══ END HERO ═══ */}
      </Box>
      <ScrollBanner />
      <Welcome />
      <Categories />
      <WhyChooseUs />
      <Services />
      <Founder />
      <Testimonials />
    </>
  );
};

export default Home;
