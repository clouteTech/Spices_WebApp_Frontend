// import {
//   AppBar,
//   IconButton,
//   Toolbar,
//   Typography,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { drawerWidth, collapsedWidth } from "./Sidebar";
// import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

// const TopToolbar = ({open}) => {
//   const theme = useTheme();
//   const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));
//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: 1000,
//         backgroundColor: "#534c7c",
//         transition: "all 0.3s ease",
//         ml: isMonitor ? `${open ? drawerWidth : collapsedWidth}px` : 0,

//         width: isMonitor
//           ? `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`
//           : "100%",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         <Typography variant="h6" component="div">
//           Admin Panel
//         </Typography>
//         <IconButton color="inherit">
//           <LoginOutlinedIcon />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default TopToolbar;

import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const TopToolbar = ({ open, setOpen, mobileOpen, setMobileOpen }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #1f1c2c 0%, #928dab 100%)",
        color: "#e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        px: 2,
        zIndex: 1200,
        height: "64px",
      }}
    >
      <Toolbar
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            sx={{
              color: "#e5e7eb",
              mr: 1,
              display: { xs: "none", lg: "inline-flex" },
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, alignItems: "center" }}
          >
            ADMIN PANEL
          </Typography>
        </Box>

        {/* DESKTOP TOGGLE */}

        {/* MOBILE SIDEBAR TOGGLE */}
        {/* <IconButton
          sx={{
            color: "#374151",
            mr: 1,
            display: { xs: "inline-flex", lg: "none" },
          }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </IconButton> */}

        {/* <IconButton sx={{ color: "#374151", mr: 1 }}>
          <MoreVertIcon />
        </IconButton> */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "#e5e7eb" }}>
            <CalendarMonthOutlinedIcon />
          </IconButton>

          <IconButton sx={{ color: "#e5e7eb" }}>
            <PersonOutlineOutlinedIcon />
          </IconButton>

          <IconButton sx={{ color: "#e5e7eb" }}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
