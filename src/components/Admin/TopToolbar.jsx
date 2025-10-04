import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography,Box } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const TopToolbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#7a537dff",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="div">
            Admin Panel
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton>
            <LoginOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
