import { createTheme } from "@mui/material/styles";

const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#534c7c",
    },
    secondary: {
      main: "#E91E63",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f1f1f",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Poppins","Robonto","Helevetica","Arial",sans-serif',
    h1: { fontSize: "4rem", fontWeight: 600 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    body1: { fontSize: "0.95rem" },
  },
  shape: {
    borderRadius: 10,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A73E8",
          color: "#fff",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
        },
      },
    },
  },
});

export default adminTheme;