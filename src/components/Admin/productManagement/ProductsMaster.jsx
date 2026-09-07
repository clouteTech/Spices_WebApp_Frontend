import { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  Stack,
  IconButton,
  Typography,
  Menu,
  Radio,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useToast } from "../../../context/ToastContext";
import GlobalModal from "../../../ui/GlobalModal";
import { GlobalDeleteModal } from "../../../ui/GlobalModal";
import Table from "./Table/Table";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import { Button as PrimeButton } from "primereact/button";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getProductById,
  getProductList,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/masterService";
import {
  getCategoryByType,
  getProductType,
} from "../../../services/categoryService";

import { OverlayPanel } from "primereact/overlaypanel";

import {
  uploadProductImage,
  getProductImage,
  setProductDefault,
  deleteProductImage,
} from "../../../services/productImageService";

import { Card, CardContent, Divider } from "@mui/material";
import { activateMasterEntity } from "../../../services/activate";

const TYPE_LABELS = {
  PS: "Powdered Spices",
  RS: "Raw Spices",
  BS: "Blended Spices",
};

const DEFAULT_FORM = {
  productCode: "",
  productName: "",
  productType: "",
  productCategoryId: null,
  productCategoryName: "",
  quality: "",
  organicOrNot: false,
  preservativeAdded: false,
  ownBrand: false,
  dietType: false,
  brandName: "",
  ingredients: "",
  description: "",
  howToUse: "",
  benefits: "",
  productStatus: true,
  keywords: [],
};

const ProductsMaster = () => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [productType, setProductType] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [products, setProducts] = useState([]);

  const [productImages, setProductImages] = useState([]);

  const [form, setForm] = useState(DEFAULT_FORM);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ===== ACTION MENU =====
  const actionRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const BASE_URL = import.meta.env.VITE_API_URL;
  const defaultImageId = productImages.find((img) => img.isDefault)?.id || "";

  const [keywordInput, setKeywordInput] = useState("");

  const productId = editId || localStorage.getItem("activeProductId");
  const imagesEnabled = !!productId;

  const fetchProductType = useCallback(async () => {
    try {
      const res = await getProductType();
      const raw = res?.data?.data || [];

      const formatted = raw.map((t) => ({
        code: t,
      }));

      setProductType(formatted);
    } catch (err) {
      console.log("Error Fetching Data Types:", err);
      showToast(
        "Failed to load Product Types",
        "error",
        "fetch-productType-error",
      );
    }
  }, []);

  // const fetchProducts = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       page: pagination.page,
  //       size: pagination.size,
  //       status: pagination.productStatus ?? true,
  //     };
  //     const res = await getProductList(payload);
  //     const data = res?.data?.data?.content || [];
  //     console.log(data);
  //     const total = res?.data?.data?.totalElements || 0;

  //     const mapped = data.map((row, index) => ({
  //       id: row.productId,
  //       productName: row.productName,
  //       productCode: row.productCode,
  //       productCategoryId: row.productCategoryId,
  //       productCategoryName: row.productCategoryName || row.categoryName,
  //       productType: row.productType,
  //       ingredients: row.ingredients,
  //       organicOrNot: row.organicOrNot,
  //       quality: row.quality,
  //       productStatus: row.productStatus ? "Active" : "Inactive",
  //     }));

  //     setProducts(mapped);
  //     setTotalElements(total);
  //   } catch (err) {
  //     console.error("Error fetching products:", err);
  //     showToast("Failed to fetch products", "error", "fetch-products-error");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [pagination]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const payload = {
        page: pagination.page,
        size: pagination.size,
        productStatus: true,
      };

      const res = await getProductList(payload);
      const data = res?.data?.data?.content || [];
      const total = res?.data?.data?.totalElements || 0;

      setProducts(
        data.map((row) => ({
          id: row.productId,
          productName: row.productName,
          productCode: row.productCode,
          productCategoryName: row.productCategoryName || row.categoryName,
          productType: row.productType,
          ingredients: row.ingredients,
          organicOrNot: row.organicOrNot,
          dietType: row.dietType,
          quality: row.quality,
          howToUse: row.howToUse,
          benefits: row.benefits,
          productStatus: row.productStatus ? "Active" : "Inactive",
        })),
      );
      setTotalElements(total);
    } catch (err) {
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.size]);

  const fetchCategoriesByType = async (type) => {
    if (!type) return setCategoryList([]);
    try {
      const res = await getCategoryByType(type);
      setCategoryList(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      showToast("Failed to load categories", "error", "fetch-categories-error");
      setCategoryList([]);
    }
  };

  useEffect(() => {
    fetchProductType();
  }, [fetchProductType]);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    if (form.productType) fetchCategoriesByType(form.productType);
  }, [form.productType]);

  // cleanup object URLs on unmount
  // useEffect(() => {
  //   return () => {
  //     productImages.forEach((img) => {
  //       if (img && img.file && img.url && img.url.startsWith("blob:")) {
  //         URL.revokeObjectURL(img.url);
  //       }
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const resetForm = () => {
    setForm(DEFAULT_FORM);
    setEditId(null);
    localStorage.removeItem("activeProductId");

    // revoke blob urls
    productImages.forEach((img) => {
      if (img && img.file && img.url && img.url.startsWith("blob:")) {
        URL.revokeObjectURL(img.url);
      }
    });
    setProductImages([]);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue =
      type === "checkbox"
        ? checked
        : value === "true"
          ? true
          : value === "false"
            ? false
            : value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    if (name === "productType") {
      try {
        const res = await getCategoryByType(value);
        const categories = res.data?.data || [];

        setCategoryList(categories);

        setForm((prev) => ({
          ...prev,
          productCategoryId: "",
          productCategoryName: "",
        }));
      } catch (error) {
        console.error("Error fetching categories", error);
        setCategoryList([]);
      }
    }
  };

  // const handlePageChange = (newPage) => {
  //   setPagination((prev) => ({ ...prev, page: newPage }));
  // };

  // const handlePageSizeChange = (newSize) => {
  //   setPagination((prev) => ({ ...prev, size: newSize, page: 0 }));
  // };

  // const BASE_URL = import.meta.env.VITE_API_URL;

  // const normalizeBackendImagesLocal = (backendImages = []) =>
  //   backendImages.map((img = {}) => {
  //     const rawUrl = img.imageUrl || img.thumbnailUrl || ""; // backend field names

  //     const url = rawUrl.startsWith("/")
  //       ? `${BASE_URL}${rawUrl}`
  //       : rawUrl.startsWith("http")
  //         ? rawUrl
  //         : rawUrl
  //           ? `${BASE_URL}/${rawUrl}`
  //           : "";

  //     return {
  //       id: img.productImgId, // FIX BACKEND FIELD
  //       file: null,
  //       url,
  //       isDefault: !!img.primaryImage, // backend sends primaryImage
  //     };
  //   });

  // const handleEditClick = async (row) => {
  //   try {
  //     const productId = row.productId || row.id;

  //     // 1. Load product details
  //     const res = await getProductById(productId);
  //     const data = res?.data?.data || {};

  //     setForm({
  //       ...DEFAULT_FORM,
  //       ...data,
  //     })

  //     // 2. Load images separately
  //     const imgRes = await getProductImages(productId);
  //     const images = imgRes?.data?.data || [];
  //     const normalized = normalizeBackendImages(images);

  //     setProductImages(normalized);

  //     // 3. Ensure default image
  //     if (!normalized.some((i) => i.isDefault) && normalized.length > 0) {
  //       normalized[0].isDefault = true;
  //     }

  //     setEditId(productId);
  //     localStorage.setItem("activeProductId", String(productId));
  //     setOpen(true);
  //   } catch (err) {
  //     console.error("Edit error:", err);
  //     toast.error("Failed to load product");
  //   }
  // };

  // const handleEditClick = async (row) => {
  //   try {
  //     const productId = row.productId || row.id;

  //     const res = await getProductById(productId);
  //     const data = res?.data?.data || {};

  //     // SET FORM
  //     setForm({
  //       ...DEFAULT_FORM,
  //       productId: data.productId,
  //       productName: data.productName,
  //       productCode: data.productCode,
  //       quality: data.quality,
  //       organicOrNot: data.organicOrNot,
  //       preservativeAdded: data.preservativeAdded,
  //       ingredients: data.ingredients,
  //       description: data.description,
  //       ownBrand: data.ownBrand,
  //       brandName: data.brand || "",
  //       productType: data.productCategoryType, // FIX
  //       productCategoryId: data.productCategoryId, // FIX
  //       productCategoryName: data.productCategoryName,
  //     });

  //     // LOAD CATEGORY LIST FOR THIS TYPE
  //     await fetchCategoriesByType(data.productCategoryType);

  //     // SELECT CATEGORY
  //     const cat = categoryList.find(
  //       (c) => String(c.id) === String(data.productCategoryId)
  //     );

  //     if (cat) {
  //       setForm((prev) => ({
  //         ...prev,
  //         productCategoryId: cat.id,
  //         productCategoryName: cat.name,
  //       }));
  //     }

  //     // LOAD IMAGES
  //     const imgRes = await getProductImages(productId);
  //     setProductImages(normalizeBackendImagesLocal(imgRes?.data?.data || []));

  //     setEditId(productId);
  //     setOpen(true);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to load product");
  //   }
  // };

  const handleEditClick = async (row) => {
    try {
      const productId = row.productId || row.id;

      const res = await getProductById(productId);
      const data = res?.data?.data || {};

      // SET FORM (same as before)
      setForm({
        ...DEFAULT_FORM,
        productId: data.productId,
        productName: data.productName,
        productCode: data.productCode,
        quality: data.quality,
        organicOrNot: data.organicOrNot,
        preservativeAdded: data.preservativeAdded,
        ingredients: data.ingredients,
        description: data.description,
        ownBrand: data.ownBrand,
        dietType: data.dietType,
        brandName: data.brand || "",
        benefits: data.benefits,
        howToUse: data.howToUse,
        productType: data.productCategoryType,
        productCategoryId: data.productCategoryId,
        productCategoryName: data.productCategoryName,
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
      });

      // LOAD CATEGORY LIST FOR THIS TYPE and use returned list directly
      let fetchedCategories = [];
      if (data.productCategoryType) {
        try {
          const catRes = await getCategoryByType(data.productCategoryType);
          fetchedCategories = catRes?.data?.data || [];
          setCategoryList(fetchedCategories);
        } catch (err) {
          console.warn(
            "Failed to load categories for type:",
            data.productCategoryType,
            err,
          );
          setCategoryList([]);
        }
      }

      // Use fetchedCategories (not categoryList state) to pick matching category
      const cat = fetchedCategories.find(
        (c) => String(c.id) === String(data.productCategoryId),
      );

      if (cat) {
        setForm((prev) => ({
          ...prev,
          productCategoryId: cat.id,
          productCategoryName: cat.name,
        }));
      }

      // LOAD IMAGES (use loadProductImages which we made safe)
      await loadProductImages(data.productId);

      setEditId(data.productId);
      setOpen(true);
    } catch (err) {
      console.error(err);
      showToast("Failed to load product", "error");
    }
  };

  const handleDelete = async () => {
    const id = Number(deleteId);

    if (!id || isNaN(id)) {
      showToast("Invalid Product ID", "error");
      return;
    }

    try {
      const response = await deleteProduct(id);

      if (response?.data?.status === 200) {
        showToast(
          response?.data?.msg ||
            response?.data?.message ||
            "Product deleted successfully",
          "success",
        );

        fetchProducts(); // refresh list
      } else {
        showToast(
          response?.data?.msg || "Failed to delete product. Please try again.",
          "error",
        );
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      showToast(
        error.response?.data?.msg || "Server error while deleting",
        "error",
      );
    } finally {
      setOpenDelete(false);
    }
  };

  const loadProductImages = async (productId) => {
    try {
      const res = await getProductImage(productId);
      const data = res?.data?.data || [];

      const normalized = data.map((img) => ({
        id: img.id,
        url: img.imageUrl
          ? img.imageUrl.startsWith("http")
            ? img.imageUrl
            : `${BASE_URL}${img.imageUrl}`
          : img.thumbnailUrl
            ? `${BASE_URL}${img.thumbnailUrl}`
            : "",
        isDefault: Boolean(img.primary),
      }));

      setProductImages(normalized);
    } catch (err) {
      showToast("Failed to load images", "error");
    }
  };

  const handleProductImagesChange = async (files) => {
    const formData = new FormData();

    try {
      for (const file of files) {
        // Size check
        if (file.size > 2 * 1024 * 1024) {
          throw "Image must be less than 2MB";
        }

        // Dimension check
        await new Promise((resolve, reject) => {
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);
          img.src = objectUrl;

          img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            console.log("Image resolution:", img.width, img.height);
            if (img.width < 100 || img.height < 100) {
              reject("Image must be at least 100x100");
            } else {
              resolve();
            }
          };

          img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject("Invalid image");
          };
        });

        formData.append("files", file);
      }

      await uploadProductImage(productId, formData);
      showToast("Images uploaded", "success");
      await loadProductImages(productId);
    } catch (err) {
      showToast(err, "error");
    }
  };

  const handleSetDefault = async (imageId) => {
    const pid = Number(productId);
    const iid = Number(imageId);

    if (!Number.isInteger(pid) || !Number.isInteger(iid)) {
      showToast("Invalid Product/Image ID", "error");
      return;
    }

    try {
      // ✅ ONLY UPDATE DEFAULT FLAG (NO REORDER)
      setProductImages((prev) =>
        prev.map((img) => ({
          ...img,
          isDefault: img.id === iid,
        })),
      );

      // ✅ CALL BACKEND (DATA SYNC ONLY)
      await setProductDefault(pid, iid);
      showToast("Default image updated", "success");
    } catch (err) {
      showToast("Failed to set default image", "error");
    }
  };

  const handleRemoveImage = async (imgId) => {
    const iid = Number(imgId);
    const pid = Number(productId);

    if (!Number.isInteger(pid) || !Number.isInteger(iid)) {
      showToast("Invalid Image ID", "error");
      return;
    }

    try {
      await deleteProductImage(pid, iid);
      showToast("Image deleted", "success");
      await loadProductImages(pid);
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  };

  const handleActivate = async (row) => {
    try {
      await activateMasterEntity("PRODUCT_MASTER", row.id);
      showToast("Product Activated Successfully", "success");
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Failed to activate Product", "error");
    }
  };

  const handleProductDetailsSave = async () => {
    if (
      !form.productName.trim() ||
      !form.productType ||
      !form.productCategoryId ||
      !form.quality.trim() ||
      form.organicOrNot === null ||
      form.preservativeAdded === null ||
      !form.ingredients.trim() ||
      !form.description.trim()
    ) {
      showToast("Please fill all fields", "warning");
      return;
    }

    const exists = products.some(
      (item) =>
        item.productName.toLowerCase() ===
          form.productName.trim().toLowerCase() &&
        item.productCategoryName === form.productCategoryName,
    );

    if (!editId && exists) {
      showToast("This Product already exists!", "warning");
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(form.productName.trim())) {
      showToast("Only letters allowed in Product Name", "warning");
      return;
    }

    const uniqueKeywords = new Set(
      form.keywords.map((k) => k.trim().toLowerCase()),
    );

    if (uniqueKeywords.size !== form.keywords.length) {
      showToast("Duplicate Keywords not allowed", "warning");
      return;
    }

    try {
      const payload = {
        productId: editId || null, // 🔥 MUST be inside body
        productCode: form.productCode,
        productName: form.productName.trim(),
        productType: form.productType,
        productCategoryId: form.productCategoryId,
        productCategoryName: form.productCategoryName,
        quality: form.quality.trim(),
        organicOrNot: form.organicOrNot,
        preservativeAdded: form.preservativeAdded,
        ownBrand: form.ownBrand,
        brand: form.brandName,
        howToUse: form.howToUse,
        benefits: form.benefits,
        dietType: form.dietType,
        ingredients: form.ingredients.trim(),
        description: form.description.trim(),
        productStatus: form.productStatus,
        keywords: form.keywords,
      };

      const res = editId
        ? await updateProduct(payload) // ✅ UPDATE
        : await addProduct(payload); // ✅ ADD

      const ok = res?.status === 200 || res?.data?.status === 200;

      if (ok) {
        showToast("Product Details Saved Successfully", "success");
        fetchProducts();
        setOpen(false);
      } else {
        showToast("Failed to save Product Details", "error");
      }
    } catch (err) {
      console.error("Product Details Save Error:", err);
      showToast("Failed to save Product Details", "error");
    }
  };

  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    {
      field: "productCode",
      header: "Product Code",
    },
    {
      field: "productName",
      header: "Product Name",
    },
    {
      field: "productCategoryName",
      header: "Category Name",
    },
    {
      field: "ingredients",
      header: "Ingredients",
    },
    {
      header: "Organic",
      body: (row) => (row.organicOrNot ? "Yes" : "No"),
    },
    {
      header: "Status",
      body: (row) => (
        <span
          style={{
            color: row.productStatus === "Active" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {row.productStatus}
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

  const header = (
    <div className="flex justify-content-between align-items-center p-3">
      {/* CLEAR BUTTON */}
      <PrimeButton
        icon="pi pi-filter-slash"
        label="Clear"
        outlined
        size="small"
        onClick={() => {
          setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
          });
          setGlobalFilter("");
        }}
      />

      {/* SEARCH INPUT */}
      <IconField iconPosition="left" className="search-field">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => {
            const value = e.target.value;

            setFilters({
              global: {
                value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });

            setGlobalFilter(value);
          }}
          placeholder="Keyword Search"
          className="p-inputtext-sm"
        />
      </IconField>
    </div>
  );

  function SortableImage({ img, index, handleRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: img.id, animateLayoutChanges: () => false });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      width: 90,
      height: 90,
      borderRadius: 6,
      overflow: "hidden",
      position: "relative",
      border: img.isDefault ? "2px solid #4caf50" : "1px solid #ccc",
      cursor: "grab",
    };
    return (
      <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <img
          src={img.url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* DEFAULT BADGE */}
        {img.isDefault && (
          <Box
            sx={{
              position: "absolute",
              top: 4,
              left: 4,
              background: "green",
              color: "white",
              fontSize: "10px",
              px: "6px",
              py: "2px",
              borderRadius: "6px",
              fontWeight: "600",
            }}
          >
            DEFAULT
          </Box>
        )}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            background: "rgba(0,0,0,0.6)",
            color: "white",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemove(img.id);
          }}
        >
          <ClearOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  // --- put these near the top of ProductsMaster, after your useState lines ---
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setProductImages((prev) => {
        const oldIndex = prev.findIndex((img) => img.id === active.id);
        const newIndex = prev.findIndex((img) => img.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex);
      });
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
          <strong>Product Master</strong>
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
        value={products}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        header={header}
        globalFilterFields={["productName", "productCode", "status"]}
        pagination={pagination}
        totalRecords={totalElements}
        loading={loading}
        enablePagination
        onPageChange={(data) =>
          setPagination((prev) => ({
            ...prev,
            page: data.page,
            size: data.size,
            first: data.first,
          }))
        }
      />

      {/* ACTION MENU */}
      <OverlayPanel ref={actionRef}>
        {selectedRow?.productStatus === "Inactive" ? (
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
                handleEditClick(selectedRow);
                actionRef.current.hide();
              }}
            >
              <BorderColorTwoToneIcon sx={{ mr: 1 }} />
              Edit
            </MenuItem>

            <MenuItem
              onClick={() => {
                setDeleteId(selectedRow.id);
                setOpenDelete(true);
                actionRef.current.hide();
              }}
            >
              <DeleteOutlineTwoToneIcon sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </OverlayPanel>

      <GlobalModal
        open={open}
        handleClose={() => setOpen(false)}
        title={editId ? "Edit Product" : "Add Product"}
      >
        <Card
          sx={{
            p: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            backgroundColor: "#f5f1ff",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            <strong>Product Details</strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <TextField
                  select
                  label="Product Type"
                  name="productType"
                  value={form.productType || ""}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      productType: selectedType,
                      productCategoryId: "",
                      productCategoryName: "",
                    }));
                    fetchCategoriesByType(selectedType);
                  }}
                  sx={{ width: 350 }}
                >
                  {productType.map((t) => {
                    const label = TYPE_LABELS[t.code] || t.code;
                    return (
                      <MenuItem key={t.code} value={t.code}>
                        {label}
                      </MenuItem>
                    );
                  })}
                </TextField>

                <Autocomplete
                  disablePortal
                  options={categoryList}
                  getOptionLabel={(option) => option?.name ?? ""}
                  value={
                    categoryList.find(
                      (cat) =>
                        String(cat.id) === String(form.productCategoryId),
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    setForm((prev) => ({
                      ...prev,
                      productCategoryId: newValue ? newValue.id : "",
                      productCategoryName: newValue ? newValue.name : "",
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category Name"
                      variant="outlined"
                      sx={{ width: 350 }}
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <TextField
                  label="Product Name"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  sx={{ width: 270 }}
                />
                <TextField
                  label="Quality"
                  name="quality"
                  value={form.quality}
                  onChange={handleChange}
                  sx={{ width: 350 }}
                />
              </Stack>

              <Stack direction="row" spacing={10}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <strong>Organic</strong>
                  </FormLabel>
                  <RadioGroup
                    row
                    name="organicOrNot"
                    value={form.organicOrNot}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <strong>Preservative Added</strong>
                  </FormLabel>
                  <RadioGroup
                    row
                    name="preservativeAdded"
                    value={form.preservativeAdded}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={10}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <strong>Own Brand</strong>
                  </FormLabel>
                  <RadioGroup
                    row
                    name="ownBrand"
                    value={form.ownBrand}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    <strong>Diet Type</strong>
                  </FormLabel>
                  <RadioGroup
                    row
                    name="dietType"
                    value={form.dietType}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Veg"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Non Veg"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              {!form.ownBrand && (
                <TextField
                  label="Brand Name"
                  name="brandName"
                  value={form.brandName}
                  onChange={handleChange}
                />
              )}
              <TextField
                label="Ingredients"
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Usage Instructions"
                name="howToUse"
                value={form.howToUse}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Benefits"
                name="benefits"
                value={form.benefits}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Stack>

            <Stack spacing={2}>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Enter keyword"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    sx={{ width: 300, mt: 3 }}
                  />

                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ height: 40, mt: 4 }}
                    onClick={() => {
                      if (keywordInput.trim() === "") return;

                      setForm((prev) => ({
                        ...prev,
                        keywords: [...prev.keywords, keywordInput.trim()],
                      }));

                      setKeywordInput("");
                    }}
                  >
                    Add
                  </Button>
                </Box>

                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {form.keywords.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        background: "#e0e0e0",
                        px: 2,
                        py: 1,
                        borderRadius: "20px",
                        fontSize: "14px",
                        height: 32,
                      }}
                    >
                      {item}

                      <IconButton
                        size="small"
                        sx={{ ml: 1, p: 0.5 }}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            keywords: prev.keywords.filter(
                              (_, i) => i !== index,
                            ),
                          }))
                        }
                      >
                        <ClearOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </CardContent>
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleProductDetailsSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </Stack>
        </Card>

        {/* MAIN IMAGE */}
        <Card
          sx={{
            mt: 3,
            p: 2,
            background: imagesEnabled ? "#f5f1ff" : "#eeeeee",
            borderRadius: 3,
            opacity: imagesEnabled ? 1 : 0.5,
            pointerEvents: imagesEnabled ? "auto" : "none",
          }}
        >
          <Typography variant="h6" mb={2}>
            <strong>Product Images</strong>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={!imagesEnabled}
              onClick={() =>
                document.getElementById("product-img-input").click()
              }
              sx={{ width: "fit-content" }}
            >
              Choose Files
            </Button>

            {productImages.length > 0 && (
              <TextField
                select
                size="small"
                sx={{ width: 240 }}
                value={defaultImageId}
                onChange={(e) => handleSetDefault(e.target.value)}
              >
                {productImages.map((img, idx) => (
                  <MenuItem key={img.id} value={img.id}>
                    Image {idx + 1} (ID: {img.id})
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Stack>

          <Box
            sx={{
              mt: 2,
              p: 2,
              border: "2px dashed #bdbdbd",
              minHeight: 140,
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() =>
              imagesEnabled &&
              document.getElementById("product-img-input").click()
            }
          >
            {productImages.length === 0 ? (
              <>
                <Typography>Select or drag images</Typography>
                <Typography fontSize={12}>JPG / PNG allowed</Typography>
              </>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={productImages.map((i) => i.id)}
                  strategy={rectSortingStrategy}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {productImages.map((img) => (
                      <SortableImage
                        key={img.id}
                        img={img}
                        handleRemove={handleRemoveImage}
                      />
                    ))}
                  </Box>
                </SortableContext>
              </DndContext>
            )}

            <input
              id="product-img-input"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) handleProductImagesChange(files);
                e.target.value = null;
              }}
            />
          </Box>
        </Card>
      </GlobalModal>

      <GlobalDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure want to delete this Product?"
      />
    </Box>
  );
};

export default ProductsMaster;
