// import React from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Stack,
//   IconButton,
// } from "@mui/material";
// import { CloseTwoTone } from "@mui/icons-material";

// const GlobalModal = ({open,handleClose,title,children,actions}) => {
//   const style ={
//     position:"absolute",
//     top:"50%",
//     left:"50%",
//     transform:"translate(-50%,-50%)",
//     width:500,
//     bgcolor:"background.paper",
//     borderRadius:3,
//     boxShadow:24,
//     p:4,
//   }

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
//           <Typography variant="h6" component="h2">
//             <strong>{title}</strong>
//           </Typography>
//           <IconButton onClick={handleClose}>
//             <CloseTwoTone/>
//           </IconButton>
//         </Stack>
//         <Box sx={{mt:1}}>{children}</Box>
//         {actions&&(<Stack direction="row" justifyContent="flex-end" spacing={2}>
//           {actions}
//         </Stack>)}
//       </Box>
//     </Modal>
//   );
// };

// export default GlobalModal;

import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button,
} from "@mui/material";
import { CloseTwoTone } from "@mui/icons-material";

const GlobalModal = ({
  open,
  handleClose,
  title,
  subtitle,
  children,
  actions,
  loading = false,
  maxWidth = 800,
  fullWidth = true,
  disableBackdropClick = false,
  errors = {},
  onFieldChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: isMobile ? "0" : "50%",
    left: isMobile ? "0" : "50%",
    transform: isMobile ? "none" : "translate(-50%, -50%)",
    width: isMobile ? "none" : fullWidth ? "90%" : maxWidth,
    maxWidth: maxWidth,
    bgcolor: "background.paper",
    borderRadius: isMobile ? 0 : 3,
    boxShadow: theme.shadows[25],
    maxHeight: "90vh",
    overflowY: "auto",
    p: 4,
    display: "flex",
    flexDirection: "column",
    titleBgColor: "primary.main",
    titleColor: "white",
  };

  return (
    <Modal
      open={open}
      onClose={disableBackdropClick ? undefined : handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Box sx={style}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography id="modal-title" variant="h6" component="h2">
              <strong>{title}</strong>
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              color: theme.palette.grey[600],
              "&:hover": { color: theme.palette.grey[900] },
            }}
          >
            <CloseTwoTone />
          </IconButton>
        </Stack>

        {/* Content */}
        <Box
          id="modal-content"
          sx={{
            mb: actions ? 3 : 0,
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "auto",
            mt: 1,
            px: 2,
            py: 1,
            "&.MuiTextField-root": { mb: 2 },
          }}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(child, {
              errors,
              onFieldChange,
            });
          })}
        </Box>

        {/* Actions */}
        {actions && (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            {React.Children.map(actions, (action) =>
              React.cloneElement(action, { disabled: loading }),
            )}
            {loading && <CircularProgress size={24} />}
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default GlobalModal;

export const GlobalDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are You sure you want to delete this item?",
}) => {
  return (
    <GlobalModal
      open={open}
      handleClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <Typography>{message}</Typography>
    </GlobalModal>
  );
};
