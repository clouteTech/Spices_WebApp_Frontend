// import React, { useCallback, useEffect, useState } from "react";
// import Table from "./Table/Table";
// import {
//   Button,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { BorderColorTwoTone, DeleteOutlineTwoTone } from "@mui/icons-material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import GlobalModal from "../../../ui/GlobalModal";
// import { GlobalDeleteModal } from "../../../ui/GlobalModal";
// import {
//   getPackageList,
//   getPackageById,
//   addPackageType,
//   deletePackageType,
//   updatePackageType,
// } from "../../../services/packageType";
// import { useToast } from "../../../context/ToastContext";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { useRef } from "react";

// const PackageType = () => {
//   const [packageType, setPackageType] = useState([]);
//   const { showToast } = useToast();
//   const [open, setOpen] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     packageType: "",
//     packageTypeId: "",
//   });
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 10,
//   });
//   const [totalElements, setTotalElements] = useState(0);
//   const actionRef = useRef(null);
//   const [selectedRow, setSelectedRow] = useState(null);

//   // const [anchorEl, setAnchorEl] = useState(null);
//   // const [menuRowId, setMenuRowId] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const header = (
//     <Box display="flex" justifyContent="flex-end">
//       <TextField
//         size="small"
//         placeholder="Search..."
//         value={globalFilter}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//       />
//     </Box>
//   );

//   const columns = [
//     {
//       header: "S.No",
//       body: (_, options) =>
//         pagination.page * pagination.size + options.rowIndex + 1,
//       style: { width: "80px" },
//     },
//     {
//       field: "packageType",
//       header: "Package Type",
//       style: { minWidth: "120px" },
//     },
//     {
//       header: "Status",
//       body: (row) => (
//         <span
//           style={{
//             color: row.status ? "green" : "red",
//             fontWeight: 600,
//           }}
//         >
//           {row.status ? "Active" : "Inactive"}
//         </span>
//       ),
//       style: { minWidth: "100px" },
//     },
//     {
//       header: "Actions",
//       body: (row) => (
//         <>
//           <IconButton
//             onClick={(e) => {
//               setSelectedRow(row); // ✅ store row
//               actionRef.current.toggle(e); // ✅ open overlay
//             }}
//           >
//             <MoreVertIcon />
//           </IconButton>

//           <OverlayPanel ref={actionRef}>
//             <MenuItem
//               onClick={() => {
//                 handleEditClick(selectedRow);
//                 actionRef.current.hide();
//               }}
//             >
//               <BorderColorTwoTone fontSize="small" sx={{ mr: 1 }} />
//               Edit
//             </MenuItem>

//             <MenuItem
//               onClick={() => {
//                 setDeleteId(selectedRow.id);
//                 setOpenDelete(true);
//                 actionRef.current.hide();
//               }}
//             >
//               <DeleteOutlineTwoTone fontSize="small" sx={{ mr: 1 }} />
//               Delete
//             </MenuItem>
//           </OverlayPanel>
//         </>
//       ),
//       style: { width: "120px" },
//     },
//   ];

//   const fetchPackageType = useCallback(async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         page: pagination.page,
//         size: pagination.size,
//         status: true,
//       };
//       const response = await getPackageList(payload);
//       const data = response?.data?.data?.content || [];
//       const total = response?.data?.data?.totalElements || 0;
//       const startIndex = pagination.page * pagination.size;

//       const mapped = data.map((row, index) => ({
//         id: row.packageTypeId,
//         serialNo: startIndex + index + 1,
//         packageType: row.type,
//         status: row.packageStatus
//       }));
//       setPackageType(mapped);
//       setTotalElements(total);
//     } catch (error) {
//       console.error("Error Fetching Package Type:", error);
//       showToast("Failed to load package types", "error", "package-load-failed");
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination]);

//   useEffect(() => {
//     fetchPackageType();
//   }, [fetchPackageType, pagination.page, pagination.size]);

//   const resetForm = () => {
//     setForm({
//       packageTypeId: "",
//       packageType: "",
//     });
//     setEditId(null);
//   };

//   // const handleMenuOpen = (event, id) => {
//   //   setAnchorEl(event.currentTarget);
//   //   setMenuRowId(id);
//   // };

//   // const handleMenuClose = () => {
//   //   setAnchorEl(null);
//   //   setMenuRowId(null);
//   // };

//   const handlePageChange = (newPage) => {
//     setPagination((prev) => ({ ...prev, page: newPage }));
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPagination({ page: 0, size: newPageSize });
//   };

//   const handleEditClick = async (row) => {
//     try {
//       const response = await getPackageById(row.id);
//       const pkg = response?.data?.data;
//       if (!pkg) throw new Error("Package Type Not Found");

//       setForm({
//         packageTypeId: pkg.packageTypeId,
//         packageType: pkg.type,
//       });
//       setEditId(pkg.packageTypeId);
//       setOpen(true);
//     } catch (error) {
//       console.error("Error fetching package type by ID:", error);
//       showToast("Failed to load package type", "error", "package-edit-load");
//     } finally {
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const payload = {
//         packageTypeId: deleteId,
//       };
//       const response = await deletePackageType(payload);
//       const resData = response?.data;

//       if (
//         response?.status === 200 ||
//         resData?.status === 200 ||
//         resData?.statusCode === 200
//       ) {
//         showToast(
//           "Package Type deleted successfully",
//           "success",
//           "package-delete-success"
//         );
//         fetchPackageType();
//       } else {
//         showToast(
//           resData?.msg || "Failed to delete package type",
//           "error",
//           "package-delete-failed"
//         );
//       }
//     } catch (error) {
//       console.error("Delete Error:", error);
//       showToast("Server error while deleting", "error", "package-delete-error");
//     } finally {
//       setOpenDelete(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     if (!String(form.packageType).trim()) {
//       showToast("Please Fill All Fields", "warning", "fill-fields");
//       return;
//     }

//     try {
//       const payload = {
//         packageTypeId: form.packageTypeId || editId || null,
//         type: form.packageType,
//       };
//       const response = editId
//         ? await updatePackageType(payload)
//         : await addPackageType(payload);

//       const resData = response?.data;

//       if (
//         response?.status === 200 ||
//         resData?.status === 200 ||
//         resData?.msg?.toLowerCase().includes("success")
//       ) {
//         showToast(
//           editId
//             ? "Package Type updated successfully"
//             : "Package Type added successfully",
//           "success",
//           "package-save-success"
//         );
//         setOpen(false);
//         await fetchPackageType();
//       } else {
//         showToast(
//           resData?.msg || "Failed to save package Type",
//           "error",
//           "package-save-failed"
//         );
//       }
//     } catch (error) {
//       console.error("Save Error:", error);
//       showToast("Server error while saving", "error", "package-save-error");
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h5">
//           <strong>Package Type</strong>
//         </Typography>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => {
//             resetForm();
//             setEditId(null);
//             setOpen(true);
//           }}
//         >
//           Add Package
//         </Button>
//       </Stack>
//       {/* <Table
//         rows={packageType}
//         columns={columns}
//         pagination={pagination}
//         totalElements={totalElements}
//         onPageChange={handlePageChange}
//         onPageSizeChange={handlePageSizeChange}
//         loading={loading}
//       /> */}
//       <Table
//         value={packageType}
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

//       <GlobalModal
//         open={open}
//         handleClose={() => setOpen(false)}
//         title={editId ? "Edit Package Type" : "Add Package Type"}
//         actions={
//           <>
//             <Button onClick={() => setOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               {editId ? "Update" : "Save"}
//             </Button>
//           </>
//         }
//       >
//         <TextField
//           label="Package Type"
//           name="packageType"
//           value={form.packageType}
//           onChange={handleChange}
//           fullWidth
//         />
//       </GlobalModal>
//       <GlobalDeleteModal
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         onConfirm={handleDelete}
//         title="Delete Package"
//         message="Are you sure want to delete this Package type?"
//       />
//     </Box>
//   );
// };

// export default PackageType;

import React, { useCallback, useEffect, useRef, useState } from "react";
import Table from "./Table/Table";
import {
  Button,
  Box,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BorderColorTwoTone, DeleteOutlineTwoTone } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OverlayPanel } from "primereact/overlaypanel";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import GlobalModal from "../../../ui/GlobalModal";
import { GlobalDeleteModal } from "../../../ui/GlobalModal";
import {
  getPackageList,
  addPackageType,
  deletePackageType,
  updatePackageType,
} from "../../../services/packageType";
import { activateMasterEntity } from "../../../services/activate";
import { useToast } from "../../../context/ToastContext";

const PackageType = () => {
  const { showToast } = useToast();

  // ===== TABLE STATE =====
  const [packageType, setPackageType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 0, size: 10, first: 0 });
  const [totalElements, setTotalElements] = useState(0);

  // ===== ACTION MENU =====
  const actionRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // ===== MODALS =====
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // ===== FORM =====
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    packageType: "",
    packageTypeId: "",
  });

  // ===== SEARCH =====
  const [globalFilter, setGlobalFilter] = useState("");

  // const header = (
  //   <Box display="flex" justifyContent="flex-end">
  //     <TextField
  //       size="small"
  //       placeholder="Search..."
  //       value={globalFilter}
  //       onChange={(e) => setGlobalFilter(e.target.value)}
  //     />
  //   </Box>
  // );

  // ===== COLUMNS =====
  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    {
      field: "packageType",
      header: "Package Type",
    },
    {
      header: "Status",
      body: (row) => (
        <span
          style={{
            color: row.packageStatus === "Active" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {row.packageStatus}
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
      style: { width: "120px" },
    },
  ];

  // ===== FETCH LIST =====
  const fetchPackageType = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        page: pagination.page,
        size: pagination.size,
        status: true,
      };

      const response = await getPackageList(payload);
      const data = response?.data?.data?.content || [];
      const total = response?.data?.data?.totalElements || 0;
      const startIndex = pagination.page * pagination.size;

      const mapped = data.map((row, index) => ({
        id: row.packageTypeId,
        serialNo: startIndex + index + 1,
        packageType: row.type,
        packageStatus: row.packageStatus ? "Active" : "Inactive", // boolean
      }));

      setPackageType(mapped || []);
      setTotalElements(total);
    } catch (error) {
      showToast("Failed to load package types", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination, showToast]);

  useEffect(() => {
    fetchPackageType();
  }, [fetchPackageType]);

  // ===== HELPERS =====
  const resetForm = () => {
    setForm({ packageType: "", packageTypeId: "" });
    setEditId(null);
  };

  // ===== EDIT (NO API CALL – TEMP FIX) =====
  const handleEditClick = (row) => {
    if (!row?.id) return;

    setForm({
      packageTypeId: row.id,
      packageType: row.packageType,
    });

    setEditId(row.id);
    setOpen(true);
  };

  // ===== DELETE =====
  const handleDelete = async () => {
    try {
      await deletePackageType({ packageTypeId: deleteId });
      showToast("Package Type deleted successfully", "success");
      fetchPackageType();
    } catch (error) {
      if (error?.response?.status === 403) {
        showToast("You don't have permission to delete", "error");
      } else {
        showToast("Delete failed", "error");
      }
    } finally {
      setOpenDelete(false);
      setDeleteId(null);
    }
  };

  const handleActivate = async (row) => {
    try {
      await activateMasterEntity("PACKAGE_MASTER", row.id);
      showToast("Package Activated Successfully", "success");
      fetchPackageType();
    } catch (err) {
      console.error(err);
      showToast("Failed to activate Product", "error");
    }
  };

  // ===== SAVE =====
  const handleSave = async () => {
    if (!String(form.packageType).trim()) {
      showToast("Please Fill All Fields", "warning", "fill-fields");
      return;
    }

    try {
      const payload = {
        packageTypeId: form.packageTypeId || editId || null,
        type: form.packageType,
      };
      const response = editId
        ? await updatePackageType(payload)
        : await addPackageType(payload);

      const resData = response?.data;

      if (
        response?.status === 200 ||
        resData?.status === 200 ||
        resData?.msg?.toLowerCase().includes("success")
      ) {
        showToast(
          editId
            ? "Package Type updated successfully"
            : "Package Type added successfully",
          "success",
          "package-save-success",
        );
        setOpen(false);
        await fetchPackageType();
        console.log(resData);
      } else {
        showToast(
          resData?.msg || "Failed to save package Type",
          "error",
          "package-save-failed",
        );
      }
    } catch (error) {
      console.error("Save Error:", error);
      showToast("Server error while saving", "error", "package-save-error");
    }
  };
  // ===== UI =====
  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">
          <strong>Package Type</strong>
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          Add Package
        </Button>
      </Stack>

      <Table
        value={packageType}
        columns={columns}
        pagination={pagination}
        totalRecords={totalElements}
        loading={loading}
        // header={header}
        globalFilter={globalFilter}
        enablePagination
        onPageChange={(data) =>
          setPagination({ page: data.page, size: data.size, first: data.first })
        }
      />

      {/* ===== ACTION MENU ===== */}
      <OverlayPanel ref={actionRef}>
        {selectedRow?.packageStatus === "Inactive" ? (
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
              <BorderColorTwoTone fontSize="small" sx={{ mr: 1 }} />
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
              <DeleteOutlineTwoTone fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </OverlayPanel>

      {/* ===== ADD / EDIT MODAL ===== */}
      <GlobalModal
        open={open}
        handleClose={() => setOpen(false)}
        title={editId ? "Edit Package Type" : "Add Package Type"}
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <TextField
          label="Package Type"
          value={form.packageType}
          onChange={(e) => setForm({ ...form, packageType: e.target.value })}
          fullWidth
        />
      </GlobalModal>

      {/* ===== DELETE MODAL ===== */}
      <GlobalDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Package"
        message="Are you sure you want to delete this package type?"
      />
    </Box>
  );
};

export default PackageType;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import GlobalDataGrid from "../../../ui/GlobalDataGrid";
// import {
//   Button,
//   Box,
//   IconButton,
//   MenuItem,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { BorderColorTwoTone, DeleteOutlineTwoTone } from "@mui/icons-material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { OverlayPanel } from "primereact/overlaypanel";

// import GlobalModal, { GlobalDeleteModal } from "../../../ui/GlobalModal";
// import {
//   getPackageList,
//   addPackageType,
//   deletePackageType,
//   updatePackageType,
// } from "../../../services/packageType";
// import { useToast } from "../../../context/ToastContext";

// const PackageType = () => {
//   const { showToast } = useToast();

//   // ===== TABLE STATE =====
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({ page: 0, size: 10, first: 0 });
//   const [totalElements, setTotalElements] = useState(0);

//   // ===== ACTION MENU =====
//   const actionRef = useRef(null);
//   const [selectedRow, setSelectedRow] = useState(null);

//   // ===== MODALS =====
//   const [open, setOpen] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);

//   // ===== FORM =====
//   const [editId, setEditId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const [form, setForm] = useState({
//     packageType: "",
//     packageTypeId: "",
//   });

//   // ===== SEARCH =====
//   const [globalFilter, setGlobalFilter] = useState("");

//   const header = (
//     <Box display="flex" justifyContent="flex-end">
//       <TextField
//         size="small"
//         placeholder="Search..."
//         value={globalFilter}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//       />
//     </Box>
//   );

//   // ===== COLUMNS =====
//   const columns = [
//     {
//       header: "S.No",
//       render: (_, options) => options.rowIndex + 1,
//       style: { width: "80px" },
//     },
//     {
//       field: "packageType",
//       header: "Package Type",
//     },
//     {
//       header: "Status",
//       render: (row) => (
//         <span
//           style={{
//             color: row.status ? "green" : "red",
//             fontWeight: 600,
//           }}
//         >
//           {row.status ? "Active" : "Inactive"}
//         </span>
//       ),
//     },
//     {
//       header: "Actions",
//       render: (row) => (
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

//   // ===== FETCH LIST =====
//   const fetchPackageType = useCallback(async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         page: pagination.page,
//         size: pagination.size,
//         status: true,
//       };

//       const response = await getPackageList(payload);
//       const data = response?.data?.data?.content || [];
//       const total = response?.data?.data?.totalElements || 0;

//       const mapped = data.map((row) => ({
//         id: row.packageTypeId,
//         packageType: row.type,
//         status: row.packageStatus,
//       }));

//       setRows(mapped);
//       setTotalElements(total);
//     } catch {
//       showToast("Failed to load package types", "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination, showToast]);

//   useEffect(() => {
//     fetchPackageType();
//   }, [fetchPackageType]);

//   // ===== HELPERS =====
//   const resetForm = () => {
//     setForm({ packageType: "", packageTypeId: "" });
//     setEditId(null);
//   };

//   const handleEditClick = (row) => {
//     setForm({
//       packageTypeId: row.id,
//       packageType: row.packageType,
//     });
//     setEditId(row.id);
//     setOpen(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await deletePackageType({ packageTypeId: deleteId });
//       showToast("Package Type deleted successfully", "success");
//       fetchPackageType();
//     } catch {
//       showToast("Delete failed", "error");
//     } finally {
//       setOpenDelete(false);
//       setDeleteId(null);
//     }
//   };

//   const handleSave = async () => {
//     if (!form.packageType.trim()) {
//       showToast("Please fill all fields", "warning");
//       return;
//     }

//     const payload = {
//       packageTypeId: editId || null,
//       type: form.packageType,
//     };

//     editId ? await updatePackageType(payload) : await addPackageType(payload);

//     showToast(
//       editId
//         ? "Package Type updated successfully"
//         : "Package Type added successfully",
//       "success"
//     );

//     setOpen(false);
//     fetchPackageType();
//   };

//   // ===== UI =====
//   return (
//     <Box sx={{ p: 3 }}>
//       <Stack direction="row" justifyContent="space-between" mb={2}>
//         <Typography variant="h5">
//           <strong>Package Type</strong>
//         </Typography>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={() => {
//             resetForm();
//             setOpen(true);
//           }}
//         >
//           Add Package
//         </Button>
//       </Stack>
//       <GlobalDataGrid
//         rows={rows}
//         columns={columns}
//         loading={loading}
//         pagination={pagination}
//         totalRecords={totalElements}
//         header={header}
//         onPageChange={setPagination}
//       />
//       {/* ACTION MENU */}
//       <OverlayPanel ref={actionRef}>
//         <MenuItem
//           onClick={() => {
//             handleEditClick(selectedRow);
//             actionRef.current.hide();
//           }}
//         >
//           <BorderColorTwoTone fontSize="small" sx={{ mr: 1 }} />
//           Edit
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
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
//         open={open}
//         handleClose={() => setOpen(false)}
//         title={editId ? "Edit Package Type" : "Add Package Type"}
//         actions={
//           <>
//             <Button onClick={() => setOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               {editId ? "Update" : "Save"}
//             </Button>
//           </>
//         }
//       >
//         <TextField
//           label="Package Type"
//           value={form.packageType}
//           onChange={(e) => setForm({ ...form, packageType: e.target.value })}
//           fullWidth
//         />
//       </GlobalModal>
//       {/* DELETE MODAL */}
//       <GlobalDeleteModal
//         open={openDelete}
//         onClose={() => setOpenDelete(false)}
//         onConfirm={handleDelete}
//         title="Delete Package"
//         message="Are you sure you want to delete this package type?"
//       />
//     </Box>
//   );
// };

// export default PackageType;
