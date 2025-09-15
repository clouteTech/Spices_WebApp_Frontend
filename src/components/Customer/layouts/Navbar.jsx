import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../../../assets/logo1.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Badge } from "@mui/material";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <img src={logo1} alt="logo1" width="120" style={{ marginBottom: "10" }} />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home"/>
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <Inventory2OutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Products"/>
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemIcon>
            <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Cart"/>
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <PermContactCalendarOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Contact"/>
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: {
            xs: "linear-gradient(135deg, #4a426aff 0%, #5a6b87ff 100%)",
            md: "#474e6bff",
          },
          boxShadow: "none",
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        <Toolbar>
          <Link to="/">
            <img src={logo1} alt="logo1" width="100" />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 2,
              ml: 3,
              justifyContent: "end",
            }}
          >
            <Button color="inherit" component={Link} to="/">
              <HomeOutlinedIcon />
              Home
            </Button>
            <Button color="inherit" component={Link} to="/products">
              <Inventory2OutlinedIcon />
              Product
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              <ShoppingBagOutlinedIcon />
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              <PermContactCalendarOutlinedIcon />
              Contact
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}>
            <InputBase
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                bgcolor: "white",
                px: 1,
                borderRadius: 1,
                mr: 2,
                height: 36,
              }}
            />

            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={2} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/account" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" }, ml: "auto" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: {
            xs: "block",
            md: "none",
            color: "white",
          },
        }}
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #9594a2ff 0%, #8f9299ff 100%)", // gradient
            color: "black",
            width: 240, // optional: control drawer width
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
