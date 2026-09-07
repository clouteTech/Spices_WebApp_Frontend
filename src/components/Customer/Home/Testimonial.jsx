import React from "react";
import { Box, Typography, Container, Grid, Avatar } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";

const testimonials = [
  {
    name: "Ravi Kumar",
    feedback:
      "The spices are incredibly fresh and full of aroma. It feels like home-made masalas!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    feedback:
      "Loved the quality and packaging. Delivery was quick and the taste is amazing!",
    rating: 4,
  },
  {
    name: "Arjun Reddy",
    feedback:
      "Authentic spices with great flavor. Definitely my go-to store now!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #fff8f2, #fdebd0)",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          What Our Customers Say
        </Typography>

        {/* Cards */}
        <Grid container spacing={4}>
          {testimonials.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  background: "#fff",
                  boxShadow: 3,
                  textAlign: "center",
                  height: "100%",
                  maxWidth:"350px",position:"relative"
                }}
              >
                  {/* Quote Icon */}
                  <FormatQuoteIcon
                    sx={{
                      fontSize: 50,
                      color: "#d2691e",
                      opacity: 0.2,
                      position: "absolute",
                      top: 10,
                      left: 10,
                    }}
                  />

                  {/* Avatar */}
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      margin: "0 auto",
                      mb: 2,
                      bgcolor: "#d2691e",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name[0]}
                  </Avatar>

                  {/* Feedback */}
                  <Typography sx={{ mb: 2, color: "#555",maxWidth:"300px" }}>
                    “{item.feedback}”
                  </Typography>

                  {/* Stars */}
                  <Box
                    sx={{
                      mb: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {[...Array(item.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: "#ffa000" }} />
                    ))}
                  </Box>

                  {/* Name */}
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
