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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  addProductPrice,
  getProductPrice,
  getProductPriceList,
  updateProductPrice,
  getAllProductDetails,
} from "../../../services/priceService";
import { getSize } from "../../../services/size";
import { getPackageList } from "../../../services/packageType";
import { toast } from "react-toastify";

const ProductPrice = () => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState([
    // {
    //   id: 1,
    //   productCategory: "Regular Chilli Powder",
    //   size: "100g",
    //   mrpPrice: "60",
    //   discount: "5",
    //   sellingPrice: "57",
    //   status: "Active",
    // },
    // {
    //   id: 2,
    //   productCategory: "Regular Chilli Powder",
    //   size: "200g",
    //   mrpPrice: "110",
    //   discount: "5",
    //   sellingPrice: "105",
    //   status: "Active",
    // },
    // {
    //   id:3,
    //   productCategory:"Kashmiri Chilli Powder",
    //   size:"250g",
    //   mrpPrice:"120",
    //   discount:"6",
    //   sellingPrice:"113",
    //   status:"Active",
    // }
  ]);
  const [form, setForm] = useState({
    mrpPrice: "",
    discount: "",
    sellingPrice: "",
    productId: "",
    sizeId: "",
    packageTypeId: "",
  });
  const [productList, setProductList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [anchorE1, setAnchorE1] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductDetails();
      const list = res?.data?.data || [];

      const updated = list.map((item) => ({
        ...item,
        combinedLabel: `${item.productName}-${item.productCategory}-${item.productType}`,
      }));
      setProductList(updated);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSizeList = async () => {
    try {
      const res = await getSize({ page: 0, size: 200 });
      const list = res?.data?.data?.content || [];

      const formatted = list.map((s) => ({
        id: s.sizeId,
        label: `${s.sizeType}-${s.size}`,
      }));
      setSizeList(formatted);
    } catch (err) {
      console.error("Size fetch error:", err);
    }
  };

  const fetchPackageList = async () => {
    try {
      const res = await getPackageList({ page: 0, size: 200 });
      const list = res?.data?.data?.content || [];

      const formatted = list.map((p) => ({
        id: p.packageTypeId,
        label: p.type,
      }));
      setPackageList(formatted);
    } catch (err) {
      console.error("Package fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSizeList();
    fetchPackageList();
  }, []);

  const fetchProductList = useCallback(async () => {
    try {
      const response = await getProductPriceList({
        page: pagination.page,
        size: pagination.size,
      });

      const data = response?.data?.data?.content || [];
      const total = response?.data?.data?.totalElements || 0;
      const totalPages = response?.data?.data?.totalPages || 0;
      const startIndex = pagination.page * pagination.size;
      const mapped = data.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        productName: item.productName,
        productCategory:item.productCategory,
        productType:item.productType,
        packageTypeId: item.packageTypeId,
        packageType: item.packageTypeName,
        size: item.size,
        mrpPrice: item.mrp,
        discount: item.discount,
        sellingPrice: (item.mrp - (item.mrp * item.discount) / 100).toFixed(2),
        priceStatus: item.priceStatus,
      }));
      setPrice(mapped);
      setTotalElements(total);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching Price List:", error);
    }
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const columns = [
    { field: "id", headerName: "S.No", width: 120 },
    { field: "productName", headerName: "Product Name", minWidth: 200 },
    { field: "productCategory", headerName: "Product Category", minWidth: 200 },
    { field: "productType", headerName: "Product Type", minWidth: 200 },
    { field: "size", headerName: "Size", minWidth: 150 },
    {
      field: "mrpPrice",
      headerName: "MRP",
      minWidth: 100,
    },
    {
      field: "discount",
      headerName: "Discount",
      minWidth: 100,
    },
    {
      field: "sellingPrice",
      headerName: "Selling Price",
      minWidth: 150,
    },
    {
      field: "priceStatus",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params) => (params.value ? "Active" : "Inactive"),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
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
            <MenuItem onClick={() => handleDeleteClick(params.row.categoryId)}>
              <DeleteOutlineTwoToneIcon />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

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

  const handlePageSizeChange = (newSize) => {
    setPagination((prev) => ({ ...prev, size: newSize, page: 0 }));
  };

  const handleEditClick = (row) => {
    fetchProducts();
    setForm({ ...row });
    setEditId(row.id);
    setOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setPrice((prev) => prev.filter((prod) => prod.id !== id));
    }
    handleMenuClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === "mrpPrice" || name === "discount") {
      const mrp = parseFloat(updatedForm.mrpPrice) || 0;
      const discount = parseFloat(updatedForm.discount) || 0;
      updatedForm.sellingPrice = (mrp - (mrp * discount) / 100).toFixed(2);
    }
    setForm(updatedForm);
  };

  const handleSave = async () => {
    try {
      const payload = {
        mrp: parseFloat(form.mrpPrice),
        discount: parseFloat(form.discount),
        sellingPrice: parseFloat(form.sellingPrice), // ✅ REQUIRED
        productId: form.productId ? Number(form.productId) : null,
        sizeId: form.sizeId ? Number(form.sizeId) : null,
        packageTypeId: form.packageTypeId ? Number(form.packageTypeId) : null,
      };

      let response;
      if (editId) {
        response = await updateProductPrice(payload);
        toast.success("Price Updated Successfully");
      } else {
        response = await addProductPrice(payload);
        toast.success("Price added Successfully");
      }
      setOpen(false);
      await fetchProductList(); // ✅ Refresh the table
    } catch (error) {
      console.error("Error saving product price:", error);
      toast.error("Error saving price");
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
          <strong>Product Price</strong>
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setForm({
              mrpPrice: "",
              discount: "",
              productId: "",
              sizeId: "",
              packageTypeId: "",
            });
            fetchProducts();
            setEditId(null);
            setOpen(true);
          }}
        >
          Add Price
        </Button>
      </Stack>
      <Table
        rows={price}
        columns={columns}
        pagination={pagination}
        totalElements={totalElements}
        totalPages={totalPages}
        loading={loading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      <GlobalModal
        open={open}
        handleClose={() => setOpen(false)}
        title={editId ? "Edit Price" : "Add Price"}
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <Stack spacing={3}>
          <TextField
            select
            label="Products"
            name="productId"
            value={form.productId}
            onChange={handleChange}
          >
            {productList.map((item) => (
              <MenuItem key={item.productId} value={item.productId}>
                {item.combinedLabel}
              </MenuItem>
            ))}
          </TextField>

          <Stack spacing={2} direction="row">
            <TextField
              select
              label="Product Size"
              name="sizeId"
              value={form.sizeId}
              onChange={handleChange}
              sx={{ width: 350 }}
            >
              {sizeList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Package Type"
              name="packageTypeId"
              value={form.packageTypeId}
              onChange={handleChange}
              sx={{ width: 350 }}
            >
              {packageList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack spacing={2} direction="row">
            <TextField
              label="Mrp"
              name="mrpPrice"
              value={form.mrpPrice}
              onChange={handleChange}
            />
            <TextField
              label="Discount"
              name="discount"
              value={form.discount}
              onChange={handleChange}
            />
            <TextField
              label="Selling Price"
              name="sellingPrice"
              value={form.sellingPrice}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Stack>
      </GlobalModal>
    </Box>
  );
};

export default ProductPrice;
