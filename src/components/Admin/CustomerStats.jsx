import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

const CustomerStats = ({ customers }) => {
  // ✅ FINAL SAFETY FIX
  const safeCustomers = Array.isArray(customers) ? customers : [];

  const total = safeCustomers.length;

  const active = safeCustomers.filter((c) => c.userActive).length;

  const inactive = safeCustomers.filter((c) => !c.userActive).length;

  const orders = safeCustomers.reduce(
    (sum, c) => sum + (c.totalOrders || 0),
    0,
  );

  const addresses = safeCustomers.reduce(
    (sum, c) => sum + (c.totalAddresses || 0),
    0,
  );

  const stats = [
    {
      label: "Total Customers",
      value: total,
      icon: <PeopleIcon />,
      color: "#1976d2",
      bg: "#e3f2fd",
    },
    {
      label: "Active Users",
      value: active,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      label: "Inactive Users",
      value: inactive,
      icon: <CancelIcon />,
      color: "#d32f2f",
      bg: "#ffebee",
    },
    {
      label: "Total Orders",
      value: orders,
      icon: <ShoppingCartIcon />,
      color: "#ed6c02",
      bg: "#fff3e0",
    },
    // {
    //   label: "Total Addresses",
    //   value: addresses,
    //   icon: <HomeIcon />,
    //   color: "#6a1b9a",
    //   bg: "#f3e5f5",
    // },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((item, index) => (
        <Grid item xs={12} sm={6} md={2} key={index}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 1,
              position: "relative",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              },
            }}
          >
            {/* 🔥 Top Accent Line */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: item.color,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Icon */}
              <Box
                sx={{
                  background: `${item.color}15`,
                  color: item.color,
                  borderRadius: "12px",
                  p: 1.5,
                  display: "flex",
                }}
              >
                {item.icon}
              </Box>

              {/* Text */}
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomerStats;
