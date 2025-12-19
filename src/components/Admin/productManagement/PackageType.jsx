import React, { useCallback, useEffect, useState } from "react";
import Table from "./Table/Table";
import {
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BorderColorTwoTone, DeleteOutlineTwoTone } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GlobalModal from "../../../ui/GlobalModal";
import { GlobalDeleteModal } from "../../../ui/GlobalModal";
import {
  getPackageList,
  getPackageById,
  addPackageType,
  deletePackageType,
  updatePackageType,
} from "../../../services/packageType";
import { useToast } from "../../../context/ToastContext";

const PackageType = () => {
  const [packageType, setPackageType] = useState([]);
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [openDelete,setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    packageType: "",
    packageTypeId: "",
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [totalElements, setTotalElements] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteId,setDeleteId]= useState(null);

  const columns = [
    {
      field: "serialNo",
      headerName: "S.No",
      minWidth: "100",
      sortable: false,
    },
    {
      field: "packageType",
      headerName: "Package Type",
      flex: 1,
      minWidth:"120"
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth:"100"
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      minWidth:"100",
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleEditClick(params.row);
                handleMenuClose();
              }}
            >
              <BorderColorTwoTone fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteId(params.row.id);
                setOpenDelete(true);
                handleMenuClose();
              }}
            >
              <DeleteOutlineTwoTone fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

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
        status: row.packageStatus ? "Active" : "Inactive",
      }));
      setPackageType(mapped);
      setTotalElements(total);
    } catch (error) {
      console.error("Error Fetching Package Type:", error);
      showToast("Failed to load package types", "error", "package-load-failed");
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchPackageType();
  }, [fetchPackageType, pagination.page, pagination.size]);

  const resetForm = () => {
    setForm({
      packageTypeId: "",
      packageType: "",
    });
    setEditId(null);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination({ page: 0, size: newPageSize });
  };

  const handleEditClick = async (row) => {
    try {
      const response = await getPackageById(row.id);
      const pkg = response?.data?.data;
      if (!pkg) throw new Error("Package Type Not Found");

      setForm({
        packageTypeId: pkg.packageTypeId,
        packageType: pkg.type,
      });
      setEditId(pkg.packageTypeId);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching package type by ID:", error);
      showToast("Failed to load package type", "error", "package-edit-load");
    } finally {
      handleMenuClose();
    }
  };

  const handleDelete = async () => {
    try {
      const payload = {
        packageTypeId: deleteId,
      };
      const response = await deletePackageType(payload);
      const resData = response?.data;

      if (
        response?.status === 200 ||
        resData?.status === 200 ||
        resData?.statusCode === 200
      ) {
        showToast(
          "Package Type deleted successfully",
          "success",
          "package-delete-success"
        );
        fetchPackageType();
      } else {
        showToast(
          resData?.msg || "Failed to delete package type",
          "error",
          "package-delete-failed"
        );
      }
    } catch (error) {
      console.error("Delete Error:", error);
      showToast("Server error while deleting", "error", "package-delete-error");
    } finally {
      setOpenDelete(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if(!String(form.packageType).trim()){
      showToast("Please Fill All Fields","warning","fill-fields");
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
          "package-save-success"
        );
        setOpen(false);
        await fetchPackageType();
      } else {
        showToast(
          resData?.msg || "Failed to save package Type",
          "error",
          "package-save-failed"
        );
      }
    } catch (error) {
      console.error("Save Error:", error);
      showToast("Server error while saving", "error", "package-save-error");
    }
  };

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
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Package
        </Button>
      </Stack>
      <Table
        rows={packageType}
        columns={columns}
        pagination={pagination}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
      />
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
          name="packageType"
          value={form.packageType}
          onChange={handleChange}
          fullWidth
        />
      </GlobalModal>
      <GlobalDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Package"
        message="Are you sure want to delete this Package type?"
      />
    </Box>
  );
};

export default PackageType;
