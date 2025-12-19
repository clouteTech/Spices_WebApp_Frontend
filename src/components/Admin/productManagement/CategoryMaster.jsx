import React, { useEffect, useState, useCallback } from "react";
import Table from "./Table/Table";
import {
  Box,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import GlobalModal from "../../../ui/GlobalModal";
import { GlobalDeleteModal } from "../../../ui/GlobalModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory,
  getProductType,
  getCategoriesById,
} from "../../../services/categoryService";
import { toast } from "react-toastify";
import { useToast } from "../../../context/ToastContext";

const TYPE_LABELS = {
  PS: "Powdered Spices",
  RS: "Raw Spices",
  BS: "Blended Spices",
};

const CategoryMaster = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    productType: "",
    categoryName: "",
    categoryCode: "",
    description: "",
    categoryId: "",
  });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [totalElements, setTotalElements] = useState(0);

  const [anchorE1, setAnchorE1] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const columns = [
    {
      field: "serialNo",
      headerName: "S.No",
      width: "100",
      // renderCell: (params) =>
      //   // +1 because rowIndex starts from 0
      //   params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
      sortable: false,
    },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "categoryCode", headerName: "Category Code", flex: 1 },
    {
      field: "productType",
      headerName: "Product Type",
      flex: 1,
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 1,
    // },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            color: params.value ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorE1}
            open={menuRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleEditClick(params.row)}>
              <BorderColorTwoToneIcon />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteId(params.row.id);
                setOpenDelete(true);
                handleMenuClose();
              }}
            >
              <DeleteOutlineTwoToneIcon />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const fetchProductType = useCallback(async () => {
    try {
      const response = await getProductType();
      console.log("Product Type:", response?.data?.data);
      setProductTypes(response?.data?.data || []);
    } catch (error) {
      console.log("Error Fetching Data Types:", error);
      toast.error("Failed to load Product Types");
    }
  }, []);

  useEffect(() => {
    fetchProductType();
  }, [fetchProductType]);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCategoryList({
        page: pagination.page,
        size: pagination.size,
        status: true,
      });

      const data = response?.data?.data?.content || [];
      const total = response?.data?.data?.totalElements || 0;
      const startIndex = pagination.page * pagination.size;

      const mapped = data.map((row, index) => ({
        id: row.categoryId,
        serialNo: startIndex + index + 1,
        categoryName: row.categoryName,
        categoryCode: row.categoryCode,
        productType: TYPE_LABELS[row.productType] || row.productType,
        description: row.description,
        status: row.categoryStatus ? "Active" : "Inactive",
      }));
      setCategories(mapped || []);
      setTotalElements(total);
    } catch (error) {
      console.log("Error fetch categories", error);
      showToast("Failed to load categories", "error", "fetch-category-error");
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchCategories();
  }, [pagination.page, pagination.size]);

  const resetForm = () => {
    setForm({
      categoryId: "",
      productType: "",
      categoryName: "",
      categoryCode: "",
    });
    setEditId(null);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorE1(event.currentTarget);
    setMenuRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorE1(null);
    setMenuRowId(null);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination({ page: 0, size: newPageSize });
  };

  // const handleEditClick = async (row) => {
  //   try {
  //     const response = await getCategoriesById(row.id);

  //     const category = response.data?.data;
  //     if (!category) throw new Error("Category not found");
  //     setForm({
  //       categoryId: category.categoryId || row.id,
  //       productType: category.productType || "",
  //       categoryName: category.categoryName || "",
  //       categoryCode: category.categoryCode || "",
  //       description: category.description || "",
  //     });
  //     setEditId(category.categoryId || row.id);
  //     setOpen(true);
  //   } catch (error) {
  //     console.log("Error fetching category by ID:", error);
  //     showToast(
  //       "Failed to load category details",
  //       "error",
  //       "category-load-error"
  //     );
  //   } finally {
  //     handleMenuClose();
  //   }
  // };

  // const handleEditClick = async (row) => {
  //   try {
  //     const response = await getCategoriesById(row.id);

  //     const category = response?.data?.data;

  //     if (!category || !category.categoryId) {
  //       showToast("Category not found", "error");
  //       return;
  //     }

  //     setForm({
  //       categoryId: category.categoryId,
  //       categoryCode: category.categoryCode || "",
  //       productType: category.productType || "",
  //       categoryName: category.categoryName || "",
  //       description: category.description || "",
  //     });

  //     setEditId(category.categoryId);
  //     setOpen(true);
  //   } catch (error) {
  //     console.error("Error fetching category:", error);
  //     showToast("Failed to load category details", "error");
  //   } finally {
  //     handleMenuClose();
  //   }
  // };

  const handleEditClick = async (row) => {
    if (!row?.id) {
      showToast("Invalid category ID", "error");
      return;
    }

    try {
      const response = await getCategoriesById(row.id);
      const category = response?.data?.data;

      if (!category || !category.categoryId) {
        showToast("Category not found", "error");
        return;
      }

      setForm({
        categoryId: category.categoryId,
        categoryCode: category.categoryCode || "",
        productType: category.productType || "",
        categoryName: category.categoryName || "",
        description: category.description || "",
      });

      setEditId(category.categoryId);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching category:", error);
      showToast("Failed to load category details", "error");
    } finally {
      handleMenuClose();
    }
  };


  // const handleDelete = async () => {
  //   try {
  //     if (!deleteId) {
  //       showToast("Category ID Missing!", "warning", "missing-id");
  //       return;
  //     }
  //     const response = await deleteCategory(deleteId);

  //     if (
  //       response?.data?.status === 200 ||
  //       response?.data?.success === true ||
  //       response?.status === 200
  //     ) {
  //       showToast("Category deleted successfully", "success", "delete-success");
  //       await fetchCategories(); // refresh table
  //     } else {
  //       showToast(
  //         response?.data?.msg || "Failed to delete category",
  //         "error",
  //         "delete-failed"
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Error deleting Category:", error);
  //     showToast(
  //       error.response?.data?.msg || "Server error while deleting",
  //       "error",
  //       "delete-server-error"
  //     );
  //   } finally {
  //     setOpenDelete(false);
  //   }
  // };

  const handleDelete = async () => {
    try {
      const response = await deleteCategory(deleteId);

      console.log("DELETE API RAW RESPONSE:", response);
      console.log("DELETE API DATA:", response?.data);

      const success =
        response?.status === 200 ||
        response?.data?.status === 200 ||
        response?.data?.success === true ||
        (response?.data?.msg &&
          response.data.msg.toLowerCase().includes("success"));

      if (success) {
        showToast("Category deleted successfully", "success", "delete-success");

        setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
      } else {
        showToast("Failed to delete category", "error", "delete-failed");
      }
    } catch (error) {
      console.error("Error deleting Category:", error);
      showToast("Server error while deleting", "error", "delete-error");
    } finally {
      setOpenDelete(false);
    }
  };

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    try {
      const payload = {
        categoryId: form.categoryId || editId || null,
        productType: form.productType,
        categoryName: form.categoryName,
        categoryCode: form.categoryCode,
        description: form.description,
      };

      const response = editId
        ? await updateCategory(editId, payload)
        : await addCategory(payload);

      if (
        response?.data?.status === 200 ||
        response?.status === 200 ||
        response?.data?.msg?.toLowerCase().includes("success") ||
        response?.data?.message?.toLowerCase().includes("success")
      ) {
        showToast(
          editId
            ? "Category updated successfully"
            : "Category added successfully",
          "success",
          "category-save-success"
        );
        setOpen(false);
        await fetchCategories(); // refresh the table instantly
      } else {
        showToast(
          response?.data?.msg || "Failed to save category",
          "error",
          "category-save-failed"
        );
      }
    } catch (error) {
      console.log("Error Saving Category:", error);
      showToast(
        error.response?.data?.msg || "Server error while saving",
        "error",
        "category-save-error"
      );
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
          <strong>Product Category</strong>
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
          Add Product
        </Button>
      </Stack>
      <Table
        rows={categories}
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
        title={editId ? "Edit Category" : "Product Form"}
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            sx={{ mt: 2 }}
          >
            <TextField
              select
              label="Product Type"
              name="productType"
              value={form.productType || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              {Array.isArray(productTypes) && productTypes.length > 0 ? (
                productTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {TYPE_LABELS[type] || type}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Product Types Found</MenuItem>
              )}
            </TextField>

            <TextField
              label="Category Name"
              name="categoryName"
              value={form.categoryName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Stack>
          {/* <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
          /> */}
        </Stack>
      </GlobalModal>
      <GlobalDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure want to delete this Category?"
      />
    </Box>
  );
};

export default CategoryMaster;
