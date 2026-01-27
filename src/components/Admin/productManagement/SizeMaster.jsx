// import React, { useCallback, useEffect, useState } from "react";
// import { Box, Button, TextField, Typography, Stack } from "@mui/material";
// import { useToast } from "../../../context/ToastContext";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
// import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
// import Table from "./Table/Table";
// import {
//   getSize,
//   addSizeById,
//   addSizes,
//   updateSize,
//   deleteSize,
// } from "../../../services/size";
// import GlobalModal from "../../../ui/GlobalModal";

// const SizeForm = () => {
//   const [sizes, setSizes] = useState([]);
//   const { showToast } = useToast();

//   const [openAdd, setOpenAdd] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [sizeType, setSizeType] = useState("");
//   const [sizeValue, setSizeValue] = useState("");
//   const [editId, setEditId] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 10,
//   });
//   const [totalElements, setTotalElements] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [anchorE1, setAnchorE1] = useState(null);
//   const [menuRowId, setMenuRowId] = useState(null);

//   const handleMenuOpen = (event, id) => {
//     setAnchorE1(event.currentTarget);
//     setMenuRowId(id);
//   };

//   const handleMenuClose = () => {
//     setAnchorE1(null);
//     setMenuRowId(null);
//   };

//   const fetchSizes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getSize({
//         page: pagination.page + 1,
//         size: pagination.size,
//       });
//       const data = response?.data?.data?.content || [];
//       const total = response?.data?.data?.totalElements || 0;

//       const formatted = data.map((item, index) => ({
//         id: item.sizeId || index + 1,
//         sizeType: item.sizeType || "",
//         size: item.size || "",
//         sizeStatus: item.sizeStatus ?? true,
//       }));
//       setSizes(formatted);
//       setTotalElements(total);
//     } catch (error) {
//       console.error("Error fetching Sizes:", error);
//       showToast("Failed to load size list", "error", "load-size-error");
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.size]);

//   useEffect(() => {
//     fetchSizes();
//   }, [fetchSizes]);

//   const handlePageChange = (newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage }));
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPagination({ page: 0, size: newSize });
//   };

//   // ✅ Add new size
//   const handleSave = async () => {
//     if (!String(sizeType).trim() || !String(sizeValue).trim()) {
//       showToast("Please fill all fields", "warning", "fill-fields");
//       return;
//     }
//     try {
//       setLoading(true);
//       const payload = {
//         sizeType,
//         size: sizeValue,
//         ...(editId && { sizeId: editId }),
//       };
//       const res = editId ? await updateSize(payload) : await addSizes(payload);

//       console.log(editId ? "Update Response:" : "Add Response:", res.data.data);

//       const isSuccess =
//         res?.data?.success ||
//         res?.data?.status === "success" ||
//         res?.status === 200;

//       if (isSuccess) {
//         showToast(
//           res?.data?.message ||
//             (editId ? "Size Updated Successfully" : "Size added Successfully"),
//           "success",
//           "size-save-success"
//         );
//       } else {
//         showToast(
//           res?.data?.message || (editId ? "Update Completed" : "Size Added"),
//           "info",
//           "size-save-info"
//         );
//       }
//       await fetchSizes();
//       setSizeType("");
//       setSizeValue("");
//       setEditId(null);
//       setOpenAdd(false);
//     } catch (error) {
//       console.error("Error saving size:", error);
//       showToast(
//         error.response?.data?.msg || "Error While Saving Size",
//         "error",
//         "save-error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete size
//   const handleDelete = async () => {
//     try {
//       await deleteSize(selectedId);
//       showToast("Size Deleted Successfully", "success", "delete-success");
//       await fetchSizes();
//     } catch (error) {
//       console.error("Error deleting Size:", error);
//       showToast("Failed to delete Size", "error", "delete-error");
//     } finally {
//       setOpenDelete(false);
//       setSelectedId(null);
//     }
//   };

//   // ✅ Define table columns
//   const columns = [
//     {
//       field: "sno",
//       headerName: "S.No",
//       width: 100,
//       renderCell: (params) =>
//         // +1 because rowIndex starts from 0
//         params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
//     },
//     { field: "sizeType", headerName: "Size Type", flex: 1 },
//     { field: "size", headerName: "Size", flex: 1 },
//     {
//       field: "sizeStatus",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (
//         <span
//           style={{
//             color: params.value ? "green" : "red",
//             fontWeight: "bold",
//           }}
//         >
//           {params.value ? "Active" : "Inactive"}
//         </span>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             onClick={(e) => handleMenuOpen(e, params.row.id)}
//             size="small"
//           >
//             <MoreVertIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorE1}
//             open={menuRowId === params.row.id}
//             onClose={handleMenuClose}
//           >
//             <MenuItem
//               onClick={() => {
//                 handleMenuClose();
//                 setEditId(params.row.id);
//                 setSizeType(params.row.sizeType);
//                 setSizeValue(params.row.size);
//                 setOpenAdd(true);
//               }}
//             >
//               <BorderColorTwoToneIcon />
//               Edit
//             </MenuItem>
//             <MenuItem
//               onClick={() => {
//                 handleMenuClose();
//                 setSelectedId(params.row.id);
//                 setOpenDelete(true);
//               }}
//             >
//               <DeleteOutlineTwoToneIcon />
//               Delete
//             </MenuItem>
//           </Menu>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ p: 4 }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h5">
//           <strong>Product Size List</strong>
//         </Typography>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => {
//             setEditId(null);
//             setSizeType("");
//             setSizeValue("");
//             setOpenAdd(true);
//           }}
//         >
//           Add Size
//         </Button>
//       </Stack>

//       <Table
//         rows={sizes}
//         columns={columns}
//         pagination={pagination}
//         totalElements={totalElements}
//         onPageChange={handlePageChange}
//         onPageSizeChange={handlePageSizeChange}
//         loading={loading}
//       />
//       <GlobalModal
//         open={openAdd}
//         handleClose={() => {
//           setOpenAdd(false);
//           setEditId(null);
//           setSizeType("");
//           setSizeValue("");
//         }}
//         title={editId ? "Edit Size" : "Add Size"}
//         actions={
//           <>
//             <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               {editId ? "Update" : "Save"}
//             </Button>
//           </>
//         }
//       >
//         <Stack spacing={2}>
//           <Stack direction="row" spacing={1}>
//             <TextField
//               label="SizeType"
//               name="sizeType"
//               value={sizeType}
//               onChange={(e) => setSizeType(e.target.value)}
//               fullWidth
//             />
//             <TextField
//               label="Size"
//               name="size"
//               value={sizeValue}
//               onChange={(e) => setSizeValue(e.target.value)}
//               fullWidth
//             />
//           </Stack>
//         </Stack>
//       </GlobalModal>
//       <GlobalModal
//         open={openDelete}
//         handleClose={() => setOpenDelete(false)}
//         title="Delete Confirmation"
//         actions={
//           <>
//             <Button
//               color="primary"
//               variant="contained"
//               onClick={() => setOpenDelete(false)}
//             >
//               Cancel
//             </Button>
//             <Button color="error" variant="contained" onClick={handleDelete}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <Typography>Are You sure want to delete this size?</Typography>
//       </GlobalModal>
//     </Box>
//   );
// };

// export default SizeForm;

// import React, { useCallback, useEffect, useState,useRef } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { useToast } from "../../../context/ToastContext";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
// import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
// import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import Table from "./Table/Table";
// import { FilterMatchMode } from "primereact/api";
// import {
//   getSize,
//   addSizes,
//   updateSize,
//   deleteSize,
// } from "../../../services/size";
// import GlobalModal from "../../../ui/GlobalModal";

// const SizeForm = () => {
//   const [sizes, setSizes] = useState([]);
//   const { showToast } = useToast();

//   const [openAdd, setOpenAdd] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [sizeType, setSizeType] = useState("");
//   const [sizeValue, setSizeValue] = useState("");
//   const [editId, setEditId] = useState(null);

//   const [pagination, setPagination] = useState({ page: 0, size: 10 });
//   const [totalElements, setTotalElements] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const actionRef = useRef(null);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const fetchSizes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getSize({
//         page: pagination.page + 1,
//         size: pagination.size,
//       });

//       const data = response?.data?.data?.content || [];
//       const total = response?.data?.data?.totalElements || 0;

//       setSizes(
//         data.map((item, index) => ({
//           id: item.sizeId,
//           sizeType: item.sizeType || "",
//           size: item.size || "",
//           sizeStatus: item.sizeStatus ?? true,
//         }))
//       );
//       setTotalElements(total);
//       console.log(response);
//     } catch {
//       showToast("Failed to load size list", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.size]);

//   useEffect(() => {
//     fetchSizes();
//   }, [fetchSizes]);

//   const handleSave = async () => {
//     if (!sizeType || !sizeValue) {
//       showToast("Please fill all fields", "warning");
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         sizeType,
//         size: sizeValue,
//         ...(editId && { sizeId: editId }),
//       };

//       editId ? await updateSize(payload) : await addSizes(payload);

//       showToast(editId ? "Size Updated" : "Size Added", "success");
//       fetchSizes();
//       setOpenAdd(false);
//       setEditId(null);
//       setSizeType("");
//       setSizeValue("");
//     } catch {
//       showToast("Error while saving size", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteSize(selectedId);
//       showToast("Size Deleted", "success");
//       fetchSizes();
//     } catch {
//       showToast("Delete failed", "error");
//     } finally {
//       setOpenDelete(false);
//     }
//   };

//   // ✅ PRIME REACT COLUMNS (THIS IS THE MAIN CHANGE)
//   const columns = [
//     {
//       header: "S.No",
//       body: (_, options) =>
//         pagination.page * pagination.size + options.rowIndex + 1,
//       style: { width: "80px" },
//     },
//     {
//       field: "sizeType",
//       header: "Size Type",
//     },
//     {
//       field: "size",
//       header: "Size",
//     },
//     {
//       header: "Status",
//       body: (row) => (
//         <span
//           style={{
//             color: row.sizeStatus ? "green" : "red",
//             fontWeight: 600,
//           }}
//         >
//           {row.sizeStatus ? "Active" : "Inactive"}
//         </span>
//       ),
//     },
//     {
//       header: "Actions",
//       body: (row) => (
//         <IconButton
//           onClick={(e) => {
//             setSelectedRow(row);
//             actionRef.current.toggle(e);
//           }}
//         >
//           <MoreVertIcon />
//         </IconButton>
//       ),
//       style: { width: "120px" },
//     },
//   ];

//   const header = (
//     <div className="table-topbar">
//       <button className="clear-btn">
//         <i className="pi pi-filter-slash" /> Clear
//       </button>

//       <span className="p-input-icon-left">
//         <i className="pi pi-search" />
//         <input
//           type="text"
//           className="p-inputtext p-component"
//           placeholder="Keyword Search"
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//         />
//       </span>
//     </div>
//   );

//   return (
//     <Box sx={{ p: 4 }}>
//       <Stack direction="row" justifyContent="space-between" mb={2}>
//         <Typography variant="h5">
//           <strong>Product Size List</strong>
//         </Typography>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => setOpenAdd(true)}
//         >
//           Add Size
//         </Button>
//       </Stack>

//       <Table
//         value={sizes}
//         columns={columns}
//         pagination={pagination}
//         totalRecords={totalElements}
//         loading={loading}
//         onPageChange={(data) => {
//           setPagination((prev) => ({
//             ...prev,
//             page: data.page,
//             size: data.size,
//           }));
//         }}
//         header={header}
//         globalFilter={globalFilter}
//         enablePagination={true}
//       />

//       <OverlayPanel ref={actionRef}>
//         <MenuItem
//           onClick={() => {
//             if (!selectedRow) return;
//             handleEditClick(selectedRow);
//             actionRef.current.hide();
//           }}
//         >
//           <BorderColorTwoTone fontSize="small" sx={{ mr: 1 }} />
//           Edit
//         </MenuItem>

//         <MenuItem
//           onClick={() => {
//             if (!selectedRow) return;
//             setDeleteId(selectedRow.id);
//             setOpenDelete(true);
//             actionRef.current.hide();
//           }}
//         >
//           <DeleteOutlineTwoTone fontSize="small" sx={{ mr: 1 }} />
//           Delete
//         </MenuItem>
//       </OverlayPanel>

//       {/* ADD / EDIT MODAL */}
//       <GlobalModal
//         open={openAdd}
//         handleClose={() => setOpenAdd(false)}
//         title={editId ? "Edit Size" : "Add Size"}
//         actions={
//           <>
//             <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               {editId ? "Update" : "Save"}
//             </Button>
//           </>
//         }
//       >
//         <Stack spacing={2}>
//           <TextField
//             label="Size Type"
//             value={sizeType}
//             onChange={(e) => setSizeType(e.target.value)}
//           />
//           <TextField
//             label="Size"
//             value={sizeValue}
//             onChange={(e) => setSizeValue(e.target.value)}
//           />
//         </Stack>
//       </GlobalModal>

//       {/* DELETE MODAL */}
//       <GlobalModal
//         open={openDelete}
//         handleClose={() => setOpenDelete(false)}
//         title="Delete Confirmation"
//         actions={
//           <>
//             <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
//             <Button color="error" variant="contained" onClick={handleDelete}>
//               Delete
//             </Button>
//           </>
//         }
//       >
//         <Typography>Are you sure you want to delete this size?</Typography>
//       </GlobalModal>
//     </Box>
//   );
// };

// export default SizeForm;

import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useToast } from "../../../context/ToastContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { OverlayPanel } from "primereact/overlaypanel";
import Table from "./Table/Table";
import GlobalModal from "../../../ui/GlobalModal";
import { GlobalDeleteModal } from "../../../ui/GlobalModal";
import {
  getSize,
  addSizes,
  updateSize,
  deleteSize,
} from "../../../services/size";
import { activateMasterEntity } from "../../../services/activate";

const SizeForm = () => {
  const { showToast } = useToast();

  // ===== TABLE STATE =====
  const [sizes, setSizes] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  // ===== ACTION MENU =====
  const actionRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // ===== MODALS =====
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // ===== FORM =====
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sizeType, setSizeType] = useState("");
  const [sizeValue, setSizeValue] = useState("");

  // ===== FETCH LIST =====
  const fetchSizes = useCallback(async () => {
    console.log("Calling API with page:", pagination.page);
    setLoading(true);
    try {
      const response = await getSize({
        page: pagination.page,
        size: pagination.size,
        status: true,
      });
      console.log(pagination.page, pagination.size);

      const data = response?.data?.data?.content || [];
      const total = response?.data?.data?.totalElements || 0;
      console.log("API response:", response?.data?.data?.content);

      setSizes(
        data.map((item) => ({
          id: item.sizeId,
          sizeType: item.sizeType,
          size: item.size,
          sizeStatus: item.sizeStatus ? "Active" : "Inactive",
        })),
      );
      setTotalElements(total);
    } catch {
      showToast("Failed to load size list", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.size, showToast]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  // ===== EDIT =====
  const handleEditClick = (row) => {
    setEditId(row.id);
    setSizeType(row.sizeType);
    setSizeValue(row.size);
    setOpenAdd(true);
  };

  // ===== SAVE =====
  const handleSave = async () => {
    if (!sizeType || !sizeValue) {
      showToast("Please fill all fields", "warning");
      return;
    }

    try {
      const payload = {
        sizeType,
        size: sizeValue,
        ...(editId && { sizeId: editId }),
      };

      editId ? await updateSize(payload) : await addSizes(payload);

      showToast(editId ? "Size Updated" : "Size Added", "success");
      fetchSizes();
      setOpenAdd(false);
      setEditId(null);
      setSizeType("");
      setSizeValue("");
    } catch {
      showToast("Error while saving size", "error");
    }
  };

  // ===== DELETE =====
  const handleDelete = async (sizeId) => {
    try {
      await deleteSize(deleteId);
      showToast("Size Deleted", "success");
      fetchSizes();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setOpenDelete(false);
      setSelectedId(null);
    }
  };

  const handleActivate = async (row) => {
    try {
      await activateMasterEntity("SIZE_MASTER", row.id);
      showToast("Size Activated Successfully", "success");
      fetchSizes();
    } catch (err) {
      console.error(err);
      showToast("Failed to activate Product", "error");
    }
  };

  // ===== COLUMNS =====
  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    { field: "sizeType", header: "Size Type" },
    { field: "size", header: "Size" },
    {
      header: "Status",
      body: (row) => (
        <span
          style={{
            color: row.sizeStatus === "Active" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {row.sizeStatus}
        </span>
      ),
    },
    {
      header: "Actions",
      body: (row) => (
        <IconButton
          onClick={(e) => {
            setSelectedRow(row);
            actionRef.current.toggle(e);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Product Size List</strong>
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditId(null);
            setSizeType("");
            setSizeValue("");
            setOpenAdd(true);
          }}
        >
          Add Size
        </Button>
      </Stack>

      <Table
        value={sizes}
        columns={columns}
        pagination={pagination}
        totalRecords={totalElements}
        loading={loading}
        enablePagination
        onPageChange={(data) =>
          setPagination({
            page: data.page,
            size: data.size,
            first: data.first,
          })
        }
      />

      {/* ACTION MENU */}
      <OverlayPanel ref={actionRef}>
        {selectedRow?.sizeStatus === "Inactive" ? (
          <MenuItem
            onClick={() => {
              handleActivate(selectedRow);
              actionRef.current.hide();
            }}
          >
            <CheckCircleOutlineRoundedIcon sx={{ mr: 1 }} />
            Activate
          </MenuItem>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                if (!selectedRow) return;
                handleEditClick(selectedRow);
                actionRef.current.hide();
              }}
            >
              <BorderColorTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>

            <MenuItem
              onClick={() => {
                if (!selectedRow) return;
                setDeleteId(selectedRow.id);
                setOpenDelete(true);
                actionRef.current.hide();
              }}
            >
              <DeleteOutlineTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </OverlayPanel>

      {/* ADD / EDIT MODAL */}
      <GlobalModal
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        title={editId ? "Edit Size" : "Add Size"}
        actions={
          <>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <TextField
              label="SizeType"
              name="sizeType"
              value={sizeType}
              onChange={(e) => setSizeType(e.target.value)}
              fullWidth
            />
            <TextField
              label="Size"
              name="size"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              fullWidth
            />
          </Stack>
        </Stack>
      </GlobalModal>

      {/* DELETE MODAL */}
      {/* <GlobalModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title="Delete Confirmation"
        actions={
          <>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button color="error" variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <Typography>Are you sure you want to delete this size?</Typography>
      </GlobalModal> */}
      <GlobalDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Size"
        message="Are you sure you want to delete this Size?"
      />
    </Box>
  );
};

export default SizeForm;
