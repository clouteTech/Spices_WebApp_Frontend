// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Collapse,
//   Toolbar,Typography
// } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
// import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
// import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

// const Sidebar = () => {

//   const drawerWidth = 240;
//   // const [open, setOpen] = useState(false);
//   const [openProduct, setOpenProduct] = useState(false);
//   const [openOrder, setOpenOrder] = useState(false);

//   return (
//     <Drawer
//       variant="persistent"
//       anchor="left"
//       open={open}
//       sx={{
//         width: open ? drawerWidth : 60,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? drawerWidth : 60,
//           transition: "width 0.3s",
//           overflowX: "hidden",
//           boxSizing: "border-box",
//           backgroundColor: "#ffffff",
//         },
//       }}
//     >
//       <Toolbar
//         sx={{
//           backgroundColor: "#0c243bff",
//           color: "#fff",
//           justifyContent: "center",
//         }}
//       >
//         <Typography variant="h6" noWrap>
//           Admin Panel
//         </Typography>
//       </Toolbar>
//       <List>
//         <ListItem
//           button
//           component={NavLink}
//           to="/admin/dashboard"
//           style={{ color: "black", textDecoration: "none" }}
//         >
//           <ListItemIcon sx={{ minWidth: 32 }}>
//             <DashboardOutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary="DashBoard" />
//         </ListItem>
//         <ListItem
//           button
//           component={NavLink}
//           to="/admin/company"
//           style={{ color: "black", textDecoration: "none" }}
//         >
//           <ListItemIcon sx={{ minWidth: 32 }}>
//             <StoreOutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary="Company" />
//         </ListItem>
//         <ListItem button onClick={() => setOpenProduct(!openProduct)}>
//           <ListItemIcon sx={{ minWidth: 32 }}>
//             <Inventory2OutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary="Product Management" />
//           {openProduct ? (
//             <ExpandLessOutlinedIcon />
//           ) : (
//             <ExpandMoreOutlinedIcon />
//           )}
//         </ListItem>
//         <Collapse in={openProduct} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               component={NavLink}
//               to="/admin/products/add"
//               style={{ color: "black", textDecoration: "none" }}
//             >
//               <ListItemIcon sx={{ minWidth: 32 }}>
//                 <CategoryOutlinedIcon />
//               </ListItemIcon>
//               <ListItemText primary="Add Product" />
//             </ListItem>
//           </List>
//         </Collapse>
//         <ListItem button onClick={() => setOpenOrder(!openOrder)}>
//           <ListItemIcon sx={{ minWidth: 32 }}>
//             <ShoppingCartOutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary="Order Management" />
//           {openOrder ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
//         </ListItem>
//         <Collapse in={openOrder} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               component={NavLink}
//               to="/admin/order/orders"
//               style={{ color: "black", textDecoration: "none" }}
//             >
//               <ListItemIcon sx={{ minWidth: 32 }}>
//                 <ShoppingBagOutlinedIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order" />
//             </ListItem>
//           </List>
//         </Collapse>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  ListItemButton,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { companyId } = useParams();
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  //   // // const menuItems = [
  //   // //   {
  //   // //     text: "Dashboard",
  //   // //     icon: <DashboardOutlinedIcon />,
  //   // //     path: "/admin/dashboard",
  //   // //   },
  //   // //   {
  //   // //     text: "Company",
  //   // //     icon: <StoreOutlinedIcon />,
  //   // //     path: "/admin/company",
  //   // //   },
  //   // // ];

  //   // // const productMenu = [
  //   // //   {
  //   // //     text: "Add Product",
  //   // //     icon: <CategoryOutlinedIcon />,
  //   // //     path: "/admin/products/add",
  //   // //   },
  //   // // ];

  //   // const orderMenu = [
  //   //   {
  //   //     text: "Order",
  //   //     icon: <ShoppingBagOutlinedIcon />,
  //   //     path: "/admin/order/orders",
  //   //   },
  //   // ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
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
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton
            component={Link}
            to="/admin/Dashboard"
            sx={{
              display: "flex",
              justifyContent: open ? "initial" : "center",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                justifyContent: "center",
                mr: open ? 0 : "auto",
              }}
            >
              <DashboardOutlinedIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to={`/admin/company/1`}
            sx={{
              display: "flex",
              justifyContent: open ? "initial" : "center",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                justifyContent: "center",
                mr: open ? 0 : "auto",
              }}
            >
              <StoreOutlinedIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Company" />}
          </ListItemButton>
          

          <ListItemButton
            component={Link}
            onClick={() => setOpenProduct(!openProduct)}
            sx={{
              display: "flex",
              justifyContent: open ? "initial" : "center",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                justifyContent: "center",
                mr: open ? 0 : "auto",
              }}
            >
              <Inventory2OutlinedIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Product Management" />}
            {open &&
              (openProduct ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              ))}
          </ListItemButton>
          <Collapse in={openProduct} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/AddProduct"
                sx={{
                  pl: open ? 6 : 2,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    justifyContent: "center",
                    mr: open ? 0 : "auto",
                  }}
                >
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Add Product" />}
              </ListItemButton>
            </List>
          </Collapse>

          {/* Order Management */}
          <ListItemButton
            component={Link}
            onClick={() => setOpenOrder(!openOrder)}
            sx={{
              display: "flex",
              justifyContent: open ? "initial" : "center",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                justifyContent: "center",
                mr: open ? 0 : "auto",
              }}
            >
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Order Management" />}
            {open &&
              (openOrder ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              ))}
          </ListItemButton>
          <Collapse in={openOrder} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/order/orders"
                sx={{
                  textDecoration: "none",
                  pl: open ? 6 : 2,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    justifyContent: "center",
                    mr: open ? 0 : "auto",
                  }}
                >
                  <ShoppingBagOutlinedIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Order" />}
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
