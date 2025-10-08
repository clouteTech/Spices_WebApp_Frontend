import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { CloseTwoTone } from "@mui/icons-material";

const GlobalModal = ({open,handleClose,title,children,actions}) => {
  const style ={
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    width:500,
    bgcolor:"background.paper",
    borderRadius:3,
    boxShadow:24,
    p:4,
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseTwoTone/>
          </IconButton>
        </Stack>
        <Box sx={{mt:1}}>{children}</Box>
        {actions&&(<Stack direction="row" justifyContent="flex-end" spacing={2}>
          {actions}
        </Stack>)}
      </Box>
    </Modal>
  );
};

export default GlobalModal;
