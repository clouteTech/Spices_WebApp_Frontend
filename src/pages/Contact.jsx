import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Card, CardContent } from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        p: 5,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8e6e0, #fdf5f2)",
      }}
    >
      {/* Title */}
      <Typography variant="h4" align="center" mb={4}>
        <strong>Contact</strong>
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
        {/* LEFT SIDE */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              borderRadius: 2,
              p: 3,
              background: "#ffffff",
              border: "1px solid #eee",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              {/* Title */}
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Send us a message
              </Typography>

              <Typography color="text.secondary" mb={3}>
                Have questions? Fill out the form and we’ll get back to you
                soon.
              </Typography>

              {/* Inputs */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Name" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Email *" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Phone" />
                </Grid>
              </Grid>

              <Box mt={3}>
                <TextField fullWidth label="Message" multiline rows={5} />
              </Box>

              {/* Bottom Section */}
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="I agree to receive updates"
                />

                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #8B4513, #D2691E)",
                    px: 4,
                    py: 1.2,
                    borderRadius: 3,
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(135deg, #5A2D0C, #A0522D)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* RIGHT SIDE */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              borderRadius: 2,
              p: 3,
              background: "#ffffff",
              border: "1px solid #eee",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              {/* Title */}
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Contact Information
              </Typography>

              {/* Name */}
              <Typography fontWeight="bold" color="#8B4513" mb={3}>
                ARUMUGAM VIVEK
              </Typography>

              {/* Address */}
              <Box display="flex" alignItems="center" mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#8B4513",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  📍
                </Box>
                <Typography>No 2, Koot Road, Tamil Nadu, Villupuram</Typography>
              </Box>

              {/* Phone */}
              <Box display="flex" alignItems="center" mb={2}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#2e7d32",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  📞
                </Box>
                <Typography>7708123566, 9790667244</Typography>
              </Box>

              {/* Email */}
              <Box display="flex" alignItems="center" mb={3}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  ✉️
                </Box>
                <Typography>support@spicysamayals.com</Typography>
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                  my: 2,
                }}
              />

              {/* Opening Hours */}
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Opening Hours
              </Typography>

              <Typography color="text.secondary">
                Mon to Sat - 9:00am to 6:00pm
              </Typography>

              <Typography color="text.secondary">Sunday - Holiday</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
