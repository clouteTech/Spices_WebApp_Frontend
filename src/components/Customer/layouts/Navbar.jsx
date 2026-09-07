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
  Divider,
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { useCart } from "../../../context/CartContext";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";
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

  const { logout, isAuthenticated, role } = useUser(); // 👈 IMPORTANT
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { cartItems } = useCart();

  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/products";

  const handleLogout = () => {
    logout(); // clears token + context
    clearCart();
    navigate("/"); // go to home page
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const hideNavbar = ["/checkout"];

  if (hideNavbar.includes(location.pathname)) {
    return null;
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", p: 2, background: "rgba(255,255,255,0.1)" }}
    >
      <img src={logo2} alt="logo2" width="120" style={{ marginBottom: "10" }} />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <Inventory2OutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Products" />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemIcon>
            <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Cart" />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <PermContactCalendarOutlinedIcon sx={{ mr: 1 }} />
            <ListItemText primary="Contact" />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      {/* <AppBar
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
      > */}
      {/* <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(-45deg, #2e1f1a, #5c3b2e, #7b4b2a, #3e2723)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 14s ease infinite",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      > */}

      {/* <AppBar
        position="fixed"
        sx={{
          background: isHome
            ? "transparent"
            : isProducts
              ? "#fff"
              : "linear-gradient(-45deg, #FDBA74, #FB923C, #F97316, #FDBA74)",
          backgroundSize: "300% 300%",
          zIndex: 1300,
          animation:
            !isHome && !isProducts ? "gradientMove 14s ease infinite" : "none",
          boxShadow: isHome ? "none" : "0 6px 20px rgba(0,0,0,0.25)",
          transition: "background 0.3s ease",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      > */}
      <AppBar
        position="fixed"
        sx={{
          background: isHome
            ? "linear-gradient(90deg, rgba(60,10,25,0.95), rgba(90,16,40,0.95))"
            : // : "linear-gradient(-45deg, #FDBA74, #FB923C, #F97316, #FDBA74)",
              "linear-gradient(90deg, #4b0f0f, #7b1b3a, #a05b5bff, #7b1b3a, #4b0f0f)",

          backdropFilter: isHome ? "blur(12px)" : "none", // 🔥 IMPORTANT

          WebkitBackdropFilter: isHome ? "blur(12px)" : "none",

          borderBottom: isHome ? "1px solid rgba(255,255,255,0.1)" : "none",

          backgroundSize: isHome ? "auto" : "300% 300%",

          animation: isHome ? "none" : "gradientMove 14s ease infinite",

          boxShadow: isHome ? "none" : "0 6px 20px rgba(0,0,0,0.2)",

          color: isHome ? "#fff" : "#fff",

          zIndex: 1300,

          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Toolbar>
          <Link to="/">
            <img src={logo2} alt="logo2" width="160" />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 2,
              ml: 3,
              justifyContent: "center",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HomeOutlinedIcon sx={{ fontSize: 20 }} />
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/products"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Inventory2OutlinedIcon sx={{ fontSize: 20 }} />
              Product
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />
              Cart
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/contact"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PermContactCalendarOutlinedIcon sx={{ fontSize: 20 }} />
              Contact
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}>
            <InputBase
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                bgcolor: isHome ? "#fff" : "#fff",
                px: 1,
                borderRadius: 1,
                mr: 2,
                height: 36,
              }}
            />

            <IconButton
              component={Link}
              to="/cart"
              color="inherit"
              // sx={{ color: "#333" }}
            >
              <Badge badgeContent={cartItems?.length || 0} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            {/* <IconButton component={Link} to="/profile" color="inherit">
              <AccountCircleIcon />
            </IconButton> */}

            {isAuthenticated && role === "customer" ? (
              <>
                {/* Profile Icon */}
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ color: "#333" }}
                >
                  <AccountCircleIcon />
                </IconButton>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      background:
                        "linear-gradient(135deg, #4a426a 0%, #5a6b87 100%)",
                      color: "white",
                      mt: 1,
                      borderRadius: 2,
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                      minWidth: 150,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/login" color="inherit">
                <AccountCircleIcon />
              </IconButton>
            )}
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
      <Toolbar />
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
