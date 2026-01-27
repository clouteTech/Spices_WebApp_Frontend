import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h5" fontWeight="600">
          Log in
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Please enter your details
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            fullWidth
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          {/* Password */}
          <TextField
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />

          {/* Remember + Reset */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Remember Me"
            />

            <Link
              component="button"
              underline="none"
              sx={{ color: "#c9c9d5ff", fontSize: 14 }}
            >
              Reset password
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.4,
              borderRadius: 2,
              backgroundColor: "#6c6ff5",
              color: "#fff",
              fontSize: 16,
              "&:hover": {
                backgroundColor: "#5a5de0",
              },
            }}
          >
            Log In
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CustomerLogin;
