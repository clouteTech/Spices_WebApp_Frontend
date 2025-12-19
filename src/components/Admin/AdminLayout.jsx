// import { useState } from "react";
// import { Box, CssBaseline, Toolbar } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import Sidebar, { drawerWidth, collapsedWidth } from "./Sidebar";
// import TopToolbar from "./TopToolbar";

// const AdminLayout = () => {
//   const [open, setOpen] = useState(true);
//   const companyId = "1"; // Company ID stored here

//   return (
//     <>
//       <CssBaseline />

//       {/* Top Toolbar */}
//       <TopToolbar open={open} />

//       {/* Sidebar */}
//       <Sidebar open={open} setOpen={setOpen} companyId={companyId} />

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           mt: 8,
//           p: 2,
//           transition: "margin 0.3s ease",
//           ml: { lg: `${open ? drawerWidth : collapsedWidth}px` },
//           backgroundColor: "#f9f9fb",
//           minHeight: "100vh",
//         }}
//       >
//         <Outlet />
//       </Box>
//     </>
//   );
// };

// export default AdminLayout;

import { useState } from "react";
import { Box, CssBaseline, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopToolbar from "./TopToolbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <CssBaseline />

      {/* FIXED TOP BAR */}
      <TopToolbar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* FLOATING SIDEBAR CARD */}
      <Box
        sx={{
          position: "fixed",
          top: "84px",
          transform: open ? "translateX(20px)" : "translateX(-320px)",
          // height:"calc(100vh - 84px)",
          // overflowY:"visible",
          // overflowX:"visible",
          transition: "transform 0.25s ease",
          zIndex: 2000,
        }}
      >
        <Sidebar
          open={open}
          setOpen={setOpen}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </Box>

      {/* MAIN PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          pt: "80px", // small padding under TopToolbar
          px: 3,
          minHeight: "100vh",
          backgroundColor: "#f5f6fa",
          ml: {
            xs: 0,
            lg: open ? "320px" : "80px",
          },
          transition: "margin-left 0.25s ease",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </>
  );
};

export default AdminLayout;
