import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0))",
        backgroundColor: "#1a1a1a",
        color: "white",
        mt: "auto",
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Spice Store
            </Typography>
            <Typography variant="body2">
              Bringing authentic spices to your kitchen with quality and care.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Explore
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/products"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Product
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/cart"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Cart
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  to="/contact"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Contact
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton color="inherit">
                <MailOutlinedIcon />
              </IconButton>
              <IconButton color="inherit">
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Spice Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
