import { createTheme } from "@mui/material";

const customerTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5D4037",
    },
    secondary: {
      main: "#C62828",
    },
    background: {
      default: "#fff7f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#2e2e2e",
      secondary: "#6d6d6d",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',

    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },

    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "2.2rem",
      fontWeight: 700,
    },

    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: "1.8rem",
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #7a1f2b, #a44a4a)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg,#ff7a18,#ffb347)",
          boxShadow: "0 5px 15px rgba(14, 135, 242, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg,#ffb347,#ff7a18)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #fff3e6, #fde2c4, #fff7f0)",
          minHeight: "100vh",
        },
      },
    },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 20,
    //       boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    //       transition: "all 0.3s ease",
    //       "&:hover": {
    //         transform: "translateY(-6px)",
    //         boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    //       },
    //     },
    //   },
    // },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          transition: "none",
        },
      },
    },
  },
});

export default customerTheme;
