import React from 'react'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TopToolbar from './TopToolbar'

const AdminLayout = () => {
  const companyId = "1" // ✅ store companyId here

  return (
    <Box sx={{display:"flex"}}>
      <TopToolbar />
      <Sidebar companyId={companyId}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default AdminLayout;