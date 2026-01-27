// import React, { useState } from "react";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Toolbar,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import {
//   DashboardOutlined,
//   Inventory2Outlined,
//   ShoppingCartOutlined,
//   CategoryOutlined,
//   StoreOutlined,
//   ShoppingBagOutlined,
//   ExpandMoreOutlined,
//   ExpandLessOutlined,
//   StraightenRounded,
//   InventoryRounded,
//   Menu,
//   ChevronLeft,
// } from "@mui/icons-material";
// import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
// import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
// import { Link } from "react-router-dom";
// import logo1 from "../../assets/logo1.png";

// export const drawerWidth = 240;
// export const collapsedWidth = 60;

// const Sidebar = ({ open, setOpen }) => {
//   const [openProduct, setOpenProduct] = useState(false);
//   const [openOrder, setOpenOrder] = useState(false);

//   const toggleDrawer = () => setOpen((prev) => !prev);

//   const menuItemStyles = {
//     display: "flex",
//     justifyContent: open ? "initial" : "center",
//     px: 2,
//   };

//   const iconStyles = {
//     minWidth: 32,
//     justifyContent: "center",
//     mr: open ? 0 : "auto",
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       open={open}
//       sx={{
//         width: open ? drawerWidth : collapsedWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: open ? drawerWidth : collapsedWidth,
//           transition: "width 0.3s",
//           overflowX: "hidden",
//           boxSizing: "border-box",
//           backgroundColor: "#fcfcfcff",
//         },
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: open ? "space-between" : "center",
//           alignItems: "center",
//           px: 1,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {open && (
//             <>
//               <Box
//                 component="img"
//                 src={logo1}
//                 alt="logo"
//                 sx={{ height: 40, width: "auto" }}
//               />
//               <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
//                 Admin
//               </Typography>
//             </>
//           )}
//         </Box>
//         <IconButton onClick={toggleDrawer}>
//           {open ? <ChevronLeft /> : <Menu />}
//         </IconButton>
//       </Toolbar>

//       <Box sx={{ overflow: "auto", flexGrow: 1 }}>
//         <List>
//           {/* Dashboard */}
//           <ListItemButton
//             component={Link}
//             to="/admin/Dashboard"
//             sx={menuItemStyles}
//           >
//             <ListItemIcon sx={iconStyles}>
//               <DashboardOutlined />
//             </ListItemIcon>
//             {open && <ListItemText primary="Dashboard" />}
//           </ListItemButton>

//           {/* Company */}
//           <ListItemButton
//             component={Link}
//             to="/admin/company/1"
//             sx={menuItemStyles}
//           >
//             <ListItemIcon sx={iconStyles}>
//               <StoreOutlined />
//             </ListItemIcon>
//             {open && <ListItemText primary="Company Details" />}
//           </ListItemButton>

//           {/* Product Management */}
//           <ListItemButton
//             onClick={() => setOpenProduct(!openProduct)}
//             sx={menuItemStyles}
//           >
//             <ListItemIcon sx={iconStyles}>
//               <Inventory2Outlined />
//             </ListItemIcon>
//             {open && <ListItemText primary="Product Management" />}
//             {open &&
//               (openProduct ? <ExpandLessOutlined /> : <ExpandMoreOutlined />)}
//           </ListItemButton>

//           <Collapse in={openProduct} timeout="auto" unmountOnExit>
//             <List disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/admin/SizeMaster"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <StraightenRounded />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Size Master" />}
//               </ListItemButton>

//               <ListItemButton
//                 component={Link}
//                 to="/admin/CategoryMaster"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <InventoryRounded />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Product Category" />}
//               </ListItemButton>

//               <ListItemButton
//                 component={Link}
//                 to="/admin/ProductsMaster"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <CategoryOutlined />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Product Master" />}
//               </ListItemButton>

//               <ListItemButton
//                 component={Link}
//                 to="/admin/PackageType"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <BackpackOutlinedIcon />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Package Type" />}
//               </ListItemButton>

//               <ListItemButton
//                 component={Link}
//                 to="/admin/ProductPrice"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <LocalOfferOutlinedIcon />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Product Price" />}
//               </ListItemButton>
//             </List>
//           </Collapse>

//           <ListItemButton
//             onClick={() => setOpenOrder(!openOrder)}
//             sx={menuItemStyles}
//           >
//             <ListItemIcon sx={iconStyles}>
//               <ShoppingCartOutlined />
//             </ListItemIcon>
//             {open && <ListItemText primary="Stock Management" />}
//             {open &&
//               (openOrder ? <ExpandLessOutlined /> : <ExpandMoreOutlined />)}
//           </ListItemButton>

//           <Collapse in={openOrder} timeout="auto" unmountOnExit>
//             <List disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/admin/order/orders"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <ShoppingBagOutlined />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Stock" />}
//               </ListItemButton>
//             </List>
//           </Collapse>

//           {/* Order Management */}
//           <ListItemButton
//             onClick={() => setOpenOrder(!openOrder)}
//             sx={menuItemStyles}
//           >
//             <ListItemIcon sx={iconStyles}>
//               <ShoppingCartOutlined />
//             </ListItemIcon>
//             {open && <ListItemText primary="Order Management" />}
//             {open &&
//               (openOrder ? <ExpandLessOutlined /> : <ExpandMoreOutlined />)}
//           </ListItemButton>

//           <Collapse in={openOrder} timeout="auto" unmountOnExit>
//             <List disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/admin/order/orders"
//                 sx={{ pl: open ? 6 : 2 }}
//               >
//                 <ListItemIcon sx={iconStyles}>
//                   <ShoppingBagOutlined />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Orders" />}
//               </ListItemButton>
//             </List>
//           </Collapse>
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";

import {
  DashboardOutlined,
  Inventory2Outlined,
  ShoppingCartOutlined,
  CategoryOutlined,
  StoreOutlined,
  ShoppingBagOutlined,
  ExpandMore,
  ExpandLess,
  Straighten,
  Inventory,
  ChevronLeft,
} from "@mui/icons-material";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import BackpackIcon from "@mui/icons-material/BackpackOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import { Link } from "react-router-dom";
import logo1 from "../../assets/logo1.png";

export const drawerWidth = 300;
export const collapsedWidth = 70;

const Sidebar = ({ open, setOpen, mobileOpen, setMobileOpen }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openInward,setOpenInward]= useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  const menuItemStyle = {
    py: 1,
    px: 2,
    my: 0.5,
    borderRadius: 2,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    color: "#fff",
    "&:hover": { backgroundColor: "#1e2f44" },
  };

  const iconStyle = { minWidth: 32, color: "#d1d5db", fontSize: 20 };

  return (
    // <Drawer
    //   variant={mobileOpen ? "temporary" : "persistent"}
    //   open={mobileOpen || open}
    //   onClose={() => setMobileOpen(false)}
    //   sx={{
    //     "& .MuiDrawer-paper": {
    //       width: open ? drawerWidth : collapsedWidth,
    //       top: "84px",
    //       height: "calc(100% - 84px)",
    //       backgroundColor: "#2d4358",
    //       color: "#fff",
    //       transition: "width 0.3s",
    //       overflowX: "hidden",

    //       paddingTop: "20px",
    //       paddingLeft: open ? "20px" : "10px",
    //       paddingRight: open ? "20px" : "5px",
    //     },
    //   }}
    // >
    <Box
      className="sidebar"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        // position: "fixed",
        // top: "84px",
        // left: open ? "20px" : "-300px",
        height: "calc(100vh - 84px)",
        backgroundColor: "#3a4757ff",
        borderRadius: "20px", // ★ THIS MAKES IT A CARD
        boxShadow: "0 6px 20px rgba(0,0,0,0.2)", // ★ SHADOW LIKE SAKAI
        overflowY: "auto",
        overflowX: "hidden",
        // transition: "0.3s",
        paddingTop: "20px",
        paddingLeft: open ? "20px" : "10px",
        paddingRight: open ? "20px" : "5px",
        zIndex: 1200,
      }}
    >
      {/* HEADER */}
      {/* <Toolbar sx={{ justifyContent: open ? "space-between" : "center" }}>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <img src={logo1} alt="logo" style={{ height: 40 }} />
          {open && (
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
              Admin
            </Typography>
          )} */}
      {/* </Box> */}

      {/* {open && (
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <ChevronLeft />
          </IconButton>
        )} */}
      {/* </Toolbar> */}

      {/* MENU */}
      <List>
        {open && (
          <Typography
            sx={{ px: 3, py: 1, fontSize: 14, opacity: 0.6, color: "#e5e7eb" }}
          >
            HOME
          </Typography>
        )}

        <ListItemButton
          component={Link}
          to="/admin/Dashboard"
          sx={menuItemStyle}
        >
          <ListItemIcon sx={iconStyle}>
            <DashboardOutlined />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        {/* COMPANY */}
        {open && (
          <Typography
            sx={{ px: 3, py: 1, fontSize: 14, opacity: 0.6, color: "#e5e7eb" }}
          >
            COMPANY
          </Typography>
        )}

        <ListItemButton
          component={Link}
          to="/admin/company/1"
          sx={menuItemStyle}
        >
          <ListItemIcon sx={iconStyle}>
            <StoreOutlined />
          </ListItemIcon>
          {open && <ListItemText primary="Company Details" />}
        </ListItemButton>

        {/* PRODUCT MANAGEMENT */}
        {open && (
          <Typography
            sx={{ px: 3, py: 1, fontSize: 14, opacity: 0.6, color: "#e5e7eb" }}
          >
            PRODUCT
          </Typography>
        )}

        <ListItemButton
          sx={menuItemStyle}
          onClick={() => setOpenProduct(!openProduct)}
        >
          <ListItemIcon sx={iconStyle}>
            <Inventory2Outlined />
          </ListItemIcon>
          {open && <ListItemText primary="Product Management" />}
          {open && (openProduct ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        <Collapse in={openProduct}>
          <List disablePadding>
            {[
              ["Product Master", "/admin/ProductsMaster", <CategoryOutlined />],
              ["Product Category", "/admin/CategoryMaster", <Inventory />],
              ["Size Master", "/admin/SizeMaster", <Straighten />],
              ["Package Type", "/admin/PackageType", <BackpackIcon />],
              ["Product Price", "/admin/ProductPrice", <LocalOfferIcon />],
            ].map(([label, to, icon], i) => (
              <ListItemButton
                key={i}
                component={Link}
                to={to}
                sx={{ ...menuItemStyle, pl: 5 }}
              >
                <ListItemIcon sx={iconStyle}>{icon}</ListItemIcon>
                {open && <ListItemText primary={label} />}
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* STOCK */}
        {open && (
          <Typography
            sx={{ px: 3, py: 1, fontSize: 14, opacity: 0.6, color: "#e5e7eb" }}
          >
            STOCK
          </Typography>
        )}

        <ListItemButton
          sx={menuItemStyle}
          onClick={() => setOpenStock(!openStock)}
        >
          <ListItemIcon sx={iconStyle}>
            <ShoppingCartOutlined />
          </ListItemIcon>

          {open && <ListItemText primary="Stock Management" />}
          {open && (openStock ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        <Collapse in={openStock} timeout="auto" unmountOnExit>
          <List disablePadding>
            {/* INWARD */}
            <ListItemButton
              sx={{ ...menuItemStyle, pl: 5 }}
              onClick={() => setOpenInward(!openInward)}
            >
              <ListItemIcon sx={iconStyle}>
                <MoveToInboxOutlinedIcon />
              </ListItemIcon>

              {open && <ListItemText primary="Inward" />}
              {open && (openInward ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={openInward} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/BatchMaster"
                  sx={{ ...menuItemStyle, pl: 8 }}
                >
                  <ListItemIcon sx={iconStyle}>
                    <PostAddOutlinedIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Add Batch" />}
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/BatchDetails"
                  sx={{ ...menuItemStyle, pl: 8 }}
                >
                  <ListItemIcon sx={iconStyle}>
                    <Inventory2Outlined />
                  </ListItemIcon>
                  {open && <ListItemText primary="Batch Details" />}
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* <ListItemButton
          sx={menuItemStyle}
          onClick={() => setOpenStock(!openStock)}
        >
          <ListItemIcon sx={iconStyle}>
            <ShoppingCartOutlined />
            {open && <ListItemText primary="Inward" />}
            {open && (openStock ? <ExpandLess /> : <ExpandMore />)}
          </ListItemIcon>
        </ListItemButton>

        <Collapse in={openStock}>
          <List disablePadding>
            {[
              ["Add Batch", "/admin/BatchMaster", <Inventory2Outlined />],
              ["Batch Details", "/admin/BatchDetails", <Inventory2Outlined />],
            ].map(([label, to, icon], i) => (
              <ListItemButton
                key={i}
                component={Link}
                to={to}
                sx={{ ...menuItemStyle, pl: 5 }}
              >
                <ListItemIcon sx={iconStyle}>{icon}</ListItemIcon>
                {open && <ListItemText primary={label} />}
              </ListItemButton>
            ))}
          </List>
        </Collapse> */}

        {/* ORDERS */}
        {open && (
          <Typography
            sx={{ px: 3, py: 1, fontSize: 14, opacity: 0.6, color: "#e5e7eb" }}
          >
            ORDERS
          </Typography>
        )}

        <ListItemButton
          sx={menuItemStyle}
          onClick={() => setOpenOrder(!openOrder)}
        >
          <ListItemIcon sx={iconStyle}>
            <ShoppingCartOutlined />
          </ListItemIcon>
          {open && <ListItemText primary="Order Management" />}
          {open && (openOrder ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        <Collapse in={openOrder}>
          <List disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/orders"
              sx={{ ...menuItemStyle, pl: 5 }}
            >
              <ListItemIcon sx={iconStyle}>
                <ShoppingBagOutlined />
              </ListItemIcon>
              {open && <ListItemText primary="Orders" />}
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
    // {/* </Drawer> */}
  );
};

export default Sidebar;
