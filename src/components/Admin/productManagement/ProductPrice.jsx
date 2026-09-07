import React, { useEffect, useState, useCallback, useRef } from "react";
import Table from "./Table/Table";
import { OverlayPanel } from "primereact/overlaypanel";
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
import GlobalModal, { GlobalDeleteModal } from "../../../ui/GlobalModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {
  addProductPrice,
  getProductPrice,
  getProductPriceList,
  updateProductPrice,
  getAllProductDetails,
  deleteProductPrice,
} from "../../../services/priceService";
import {
  uploadProductPriceImages,
  getProductPriceImages,
  setPrimaryPriceImage,
  deleteProductPriceImage,
} from "../../../services/priceImageService";
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
import { activateMasterEntity } from "../../../services/activate";
import { getSizeDropdown } from "../../../services/size";
import { getPackageDropdown } from "../../../services/packageType";
import { useToast } from "../../../context/ToastContext";
import { Card, CardContent, Divider } from "@mui/material";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import { Button as PrimeButton } from "primereact/button";

const TYPE_LABELS = {
  PS: "Powdered Spices",
  RS: "Raw Spices",
  BS: "Blended Spices",
};

const ProductPrice = () => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState([]);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    mrpPrice: "",
    discount: "",
    sellingPrice: "",
    shelfLife: "",
    gst: "",
    productId: "",
    sizeId: "",
    packageTypeId: "",
    storageInstructions: "",
  });
  const [productList, setProductList] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activePriceId, setActivePriceId] = useState(null);
  const actionRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [editRow, setEditRow] = useState(null);
  const isManualProductChange = useRef(false);
  const isEditMode = useRef(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const priceId =
    editId != null
      ? Number(editId)
      : activePriceId != null
        ? Number(activePriceId)
        : null;
  const imagesEnabled = Boolean(priceId);

  const fetchProducts = async () => {
    try {
      const res = await getAllProductDetails();
      const list = res?.data?.data || [];

      console.log("PRODUCT API DATA:", list);

      const updated = list.map((item) => ({
        id: String(item.productId),
        combinedLabel: `${item.productName}-${item.productCategory}-${item.productType}`,
      }));
      console.log("PRODUCT LIST MAPPED:", updated);
      setProductList(updated);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSizeList = async (productId) => {
    if (!productId) return;

    try {
      const res = await getSizeDropdown({
        productId: Number(productId),
      });

      const list = res?.data?.data || [];

      setSizeList(
        list.map((s) => ({
          id: String(s.sizeId),
          label: `${s.size} ${s.sizeType}`,
        })),
      );
    } catch (error) {
      showToast("Failed to load size list", "error");
    }
  };

  const fetchPackageList = async (productId) => {
    if (!productId) return;

    try {
      const res = await getPackageDropdown({
        productId: Number(productId),
      });

      console.log("PACKAGE LIST:", packageList);
      console.log("PACKAGE VALUE:", form.packageTypeId);

      const list = res?.data?.data || [];

      setPackageList(
        list.map((p) => ({
          id: String(p.packageTypeId),
          label: p.packageTypeName,
        })),
      );
    } catch {
      showToast("Failed to load package list", "error");
    }
  };

  // useEffect(() => {
  //   console.log("EDIT ROW:", editRow);
  //   console.log("PRODUCT LIST LENGTH:", productList.length);
  //   console.log("SIZE LIST LENGTH:", sizeList.length);
  //   console.log("PACKAGE LIST LENGTH:", packageList.length);
  //   if (!editRow) return;
  //   if (!productList.length || !sizeList.length) return;

  //   const mrp = Number(editRow.mrpPrice) || 0;
  //   const discount = Number(editRow.discount) || 0;
  //   const sellingPrice = mrp - (mrp * discount) / 100;

  //   setForm({
  //     productId: String(editRow.productId),
  //     sizeId: String(editRow.sizeId),
  //     packageTypeId: editRow.packageTypeId ? String(editRow.packageTypeId) : "",
  //     mrpPrice: String(mrp),
  //     discount: String(discount),
  //     sellingPrice: sellingPrice.toFixed(2),
  //     shelfLife: String(editRow.shelfLife),
  //     gst: String(editRow.gst),
  //   });

  //   setEditId(editRow.priceId);
  // }, [editRow, productList, sizeList, packageList]);

  const fetchProductList = useCallback(async () => {
    try {
      const response = await getProductPriceList({
        page: pagination.page,
        size: pagination.size,
        productPriceStatus: true,
      });

      const data = response?.data?.data?.content || [];
      console.log(data);
      const total = response?.data?.data?.totalElements || 0;
      const totalPages = response?.data?.data?.totalPages || 0;
      const startIndex = pagination.page * pagination.size;

      // const mapped = data.map((item, index) => ({
      //   id: index + 1,
      //   priceId: item.priceId,

      //   // ✅ IDS (THIS FIXES EDIT)
      //   productId: item.productId || item.product_id,
      //   sizeId: item.sizeId || item.size_id,
      //   packageTypeId: item.packageTypeId || item.package_type_id,

      //   // ✅ PRODUCT INFO
      //   productName: item.productName,
      //   productCategory: item.productCategory,

      //   // 🔥 backend key is producttype (NOT productType)
      //   productType: item.productType,

      //   // ✅ SIZE (FIXES "undefined")
      //   size: item.sizeType
      //     ? `${item.size}${item.sizeType}`
      //     : String(item.size),

      //   // ✅ PACKAGE
      //   packageType: item.packageType,

      //   // ✅ PRICING (backend uses mrp)
      //   mrpPrice: item.mrp,
      //   discount: item.discount,
      //   gst: item.gst,

      //   // 🔥 backend key is productPriceStatus
      //   productPriceStatus: item.productPriceStatus,

      //   shelfLife: item.shelfLife,

      //   sellingPrice: (item.mrp - (item.mrp * item.discount) / 100).toFixed(2),
      // }));

      const mapped = data.map((item, index) => ({
        id: pagination.page * pagination.size + index + 1,
        priceId: item.priceId,

        productId: item.productId || item.product_id,
        sizeId: item.sizeId || item.size_id,
        packageTypeId: item.packageTypeId || item.package_type_id,

        productName: item.productName,
        productCategory: item.productCategory,
        productType: TYPE_LABELS[item.productType]
          ? `${TYPE_LABELS[item.productType]} (${item.productType})`
          : item.productType,

        size: item.sizeType ? `${item.size} ${item.sizeType}` : item.size,

        packageType: item.packageType,

        mrpPrice: item.mrp,
        discount: item.discount,
        gst: item.gst,
        shelfLife: item.shelfLife,
        sellingPrice: item.sellingPrice,
        storageInstructions: item.storageInstructions,
        productPriceStatus: item.productPriceStatus ? "Active" : "Inactive",
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
    {
      field: "id",
      header: "S.No",
      style: { width: "80px" },
    },
    {
      field: "productName",
      header: "Product Name",
      style: { minWidth: "200px" },
    },
    {
      field: "productCategory",
      header: "Product Category",
      style: { minWidth: "200px" },
    },
    {
      field: "productType",
      header: "Product Type",
      style: { minWidth: "200px" },
    },
    {
      field: "size",
      header: "Size",
      style: { minWidth: "150px" },
    },
    {
      field: "mrpPrice",
      header: "MRP",
      body: (row) => `₹${row.mrpPrice}`,
      style: { minWidth: "100px" },
    },
    {
      field: "discount",
      header: "Discount",
      body: (row) => `${row.discount}%`,
      style: { minWidth: "100px" },
    },
    {
      field: "gst",
      header: "GST",
      body: (row) => `${row.gst}%`,
      style: { minWidth: "100px" },
    },
    {
      field: "sellingPrice",
      header: "Selling Price",
      body: (row) => `₹${row.sellingPrice}`,
      style: { minWidth: "150px" },
    },
    {
      field: "packageType",
      header: "Package Type",
      style: { minWidth: "150px" },
    },
    {
      field: "shelfLife",
      header: "Shelf Life",
      style: { minWidth: "150px" },
      body: (row) => `${row.shelfLife} month${row.shelfLife > 1 ? "s" : ""}`,
    },
    {
      header: "Status",
      body: (row) => (
        <span
          style={{
            color: row.productPriceStatus === "Active" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {row.productPriceStatus}
        </span>
      ),
    },
    {
      header: "Actions",
      style: { minWidth: "120px" },
      body: (rowData) => (
        <div onClick={(e) => e.stopPropagation()}>
          <IconButton
            size="small"
            onClick={(e) => {
              if (!actionRef.current) return;

              setSelectedRow(rowData); // ✅ SAME AS PackageType
              actionRef.current.toggle(e); // ✅ SAME AS PackageType
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
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

  // const handleEditClick = async (row) => {
  //   if (!row) return;

  //   setOpen(true);

  //   await fetchProducts();
  //   await fetchSizeList(row.productId);
  //   await fetchPackageList(row.productId);

  //   const mrp = Number(row.mrpPrice) || 0;
  //   const discount = Number(row.discount) || 0;
  //   const sellingPrice = mrp - (mrp * discount) / 100;

  //   setForm({
  //     productId: String(row.productId),
  //     sizeId: String(row.sizeId),
  //     packageTypeId: String(row.packageTypeId),
  //     mrpPrice: String(mrp),
  //     discount: String(discount),
  //     sellingPrice: sellingPrice.toFixed(2),
  //     shelfLife: String(row.shelfLife),
  //     gst: String(row.gst),
  //   });

  //   setEditId(row.priceId);
  // };

  // const handleEditClick = async (row) => {
  //   try {
  //     const res = await getProductPrice(row.priceId);

  //     const priceData = res?.data?.data;

  //     setForm({
  //       priceId: priceData.priceId,
  //       productId: priceData.productId,
  //       sizeId: priceData.sizeId,
  //       packageTypeId: priceData.packageTypeId,

  //       mrpPrice: priceData.mrp,
  //       discount: priceData.discount,
  //       gst: priceData.gst,
  //       shelfLife: priceData.shelfLife,
  //       sellingPrice: priceData.sellingPrice,
  //       productPriceStatus: priceData.productPriceStatus,
  //       packageType: priceData.packageType,
  //       size: priceData.size,
  //       sizeType: priceData.sizeType,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleEditClick = async (row) => {
  //   try {
  //     setLoading(true);

  //     const res = await getProductPrice(row.priceId);
  //     const priceData = res?.data?.data;

  //     // Load dependent dropdowns using PRODUCT ID
  //     await fetchSizeList(priceData.productId);
  //     await fetchPackageList(priceData.productId);

  //     // Set pre-selected INDIVIDUAL IDS
  //     setForm({
  //       productId: String(priceData.productId),
  //       sizeId: String(priceData.sizeId),
  //       packageTypeId: String(priceData.packageTypeId),

  //       mrpPrice: String(priceData.mrp),
  //       discount: String(priceData.discount),
  //       sellingPrice: String(priceData.sellingPrice),
  //       shelfLife: String(priceData.shelfLife),
  //       gst: String(priceData.gst),
  //       productPriceStatus: priceData.productPriceStatus,
  //     });

  //     setEditId(priceData.priceId);
  //     setOpen(true);
  //   } catch (error) {
  //     toast.error("Failed to load price details");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //  const handleEditClick = async (rowData) => {
  //    try {
  //      setLoading(true);

  //      const res = await getProductPrice(rowData.priceId);
  //      const priceData = res?.data?.data;

  //      if (!priceData) {
  //        toast.error("Invalid price data");
  //        return;
  //      }

  //      // 1️⃣ Load products first
  //      await fetchProducts();

  //      // 2️⃣ Load dependent lists
  //      await Promise.all([
  //        fetchSizeList(priceData.productId),
  //        fetchPackageList(priceData.productId),
  //      ]);

  //      // 3️⃣ Set form AFTER lists are ready
  //      setForm({
  //        productId: priceData.productId ? String(priceData.productId) : "",
  //        sizeId: priceData.sizeId ? String(priceData.sizeId) : "",
  //        packageTypeId: priceData.packageTypeId
  //          ? String(priceData.packageTypeId)
  //          : "",
  //        mrpPrice: String(priceData.mrp ?? ""),
  //        discount: String(priceData.discount ?? ""),
  //        sellingPrice: String(priceData.sellingPrice ?? ""),
  //        shelfLife: String(priceData.shelfLife ?? ""),
  //        gst: String(priceData.gst ?? ""),
  //      });

  //      setEditId(priceData.priceId);
  //      setOpen(true);
  //    } catch (error) {
  //      console.error(error);
  //      toast.error("Failed to load price details");
  //    } finally {
  //      setLoading(false);
  //    }
  //  };

  const handleEditClick = async (rowData) => {
    try {
      setLoading(true);

      isEditMode.current = true;

      // 🔑 IMPORTANT
      isManualProductChange.current = false;

      const res = await getProductPrice(rowData.priceId);
      const priceData = res?.data?.data;

      await fetchProducts();
      await Promise.all([
        fetchSizeList(priceData.productId),
        fetchPackageList(priceData.productId),
      ]);

      setForm({
        productId: String(priceData.productId),
        sizeId: String(priceData.sizeId),
        packageTypeId: priceData.packageTypeId
          ? String(priceData.packageTypeId)
          : "",
        mrpPrice: String(priceData.mrp ?? ""),
        discount: String(priceData.discount ?? ""),
        sellingPrice: String(priceData.sellingPrice ?? ""),
        shelfLife: String(priceData.shelfLife ?? ""),
        gst: String(priceData.gst ?? ""),
        storageInstructions: String(priceData.storageInstructions ?? ""),
      });

      await loadProductImages(priceData.priceId);

      setEditId(priceData.priceId);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductPrice(deleteId);
      showToast("Price deleted successfully", "Success");
      fetchProductList();
    } catch {
      showToast("Failed to delete price", "error");
    } finally {
      setOpenDelete(false);
      setDeleteId(null);
    }
  };

  const handleActivate = async (row) => {
    try {
      await activateMasterEntity("PRODUCT_PRICE", row.id);
      showToast("Package Activated Successfully", "success");
      fetchProductList();
    } catch (err) {
      console.error(err);
      showToast("Failed to activate Product", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ mark manual product change
    if (name === "productId") {
      isManualProductChange.current = true;
    }

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "mrpPrice" || name === "discount") {
        const mrp = parseFloat(updatedForm.mrpPrice) || 0;
        const discount = parseFloat(updatedForm.discount) || 0;

        updatedForm.sellingPrice = (mrp - (mrp * discount) / 100).toFixed(2);
      }

      return updatedForm;
    });
  };

  useEffect(() => {
    // ❌ skip during edit
    if (isEditMode.current) return;

    // ✅ run only for manual product change
    if (!isManualProductChange.current) return;

    fetchSizeList(form.productId);
    fetchPackageList(form.productId);

    setForm((prev) => ({
      ...prev,
      sizeId: "",
      packageTypeId: "",
    }));

    isManualProductChange.current = false;
  }, [form.productId]);

  useEffect(() => {
    return () => {
      productImages.forEach((img) => {
        if (img && img.file && img.url && img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const handleSave = async () => {
  //   if (
  //     !form.productId ||
  //     !form.sizeId ||
  //     !form.packageTypeId ||
  //     !form.mrpPrice ||
  //     !form.discount ||
  //     !form.gst ||
  //     !form.shelfLife
  //   ) {
  //     showToast("Please fill all required fields", "warning");
  //     return;
  //   }
  //   try {
  //     const payload = {
  //       priceId: editId || undefined, // 🔑 for edit
  //       mrp: parseFloat(form.mrpPrice),
  //       discount: parseFloat(form.discount),
  //       sellingPrice: parseFloat(form.sellingPrice),
  //       shelfLife: Number(form.shelfLife),
  //       productId: Number(form.productId),
  //       sizeId: Number(form.sizeId),
  //       packageTypeId: Number(form.packageTypeId),
  //       gst: Number(form.gst),
  //     };

  //     if (editId) {
  //       await updateProductPrice(payload);
  //       showToast("Price Updated Successfully", "success");
  //     } else {
  //       await addProductPrice(payload);
  //       showToast("Price Added Successfully", "success");
  //     }

  //     setOpen(false);
  //     setEditId(null);
  //     fetchProductList();
  //   } catch (error) {
  //     showToast("Error saving price", "error");
  //   }
  // };

  const handleSave = async () => {
    if (
      !form.productId ||
      !form.sizeId ||
      !form.packageTypeId ||
      !form.mrpPrice ||
      !form.discount ||
      !form.gst ||
      !form.shelfLife ||
      !form.storageInstructions.trim()
    ) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    const mrp = Number(form.mrpPrice);
    const discount = Number(form.discount);
    const gst = Number(form.gst);
    const shelfLife = Number(form.shelfLife);

    if (mrp <= 0) {
      showToast("MP must be greater than 0", "warning");
      return;
    }

    if (discount < 0 || discount > 100) {
      showToast("Discount must be between 0 and 100", "warning");
      return;
    }

    if (gst < 0 || gst > 100) {
      showToast("GST must be between 0 and 100", "warning");
    }

    if (shelfLife <= 0) {
      showToast("Shelf Life must be valid", "warning");
      return;
    }

    const exists = price.some(
      (item) =>
        item.productId === Number(form.productId) &&
        item.sizeId === Number(form.sizeId) &&
        item.packageTypeId === Number(form.packageTypeId),
    );

    if (!editId && exists) {
      showToast("This variant already exists!", "warning");
      return;
    }

    try {
      const payload = {
        mrp: Number(form.mrpPrice),
        discount: parseFloat(form.discount),
        gst: Number(form.gst),
        shelfLife: Number(form.shelfLife),
        productId: Number(form.productId),
        sizeId: Number(form.sizeId),
        packageTypeId: Number(form.packageTypeId),
        sellingPrice: parseFloat(form.sellingPrice),
        storageInstructions: form.storageInstructions.trim(),
      };

      if (editId) {
        payload.priceId = editId;
        await updateProductPrice(payload);
        showToast("Price Updated Successfully", "success");
      } else {
        const res = await addProductPrice(payload);

        const newPriceId =
          res?.data?.data?.priceId || res?.data?.data?.id || res?.data?.priceId;

        if (newPriceId) {
          // setPrice(Number(newPriceId));
          setEditId(Number(newPriceId));
        }

        showToast(
          "Price Added Successfully. You can upload images now.",
          "success",
        );
      }

      fetchProductList();
    } catch (error) {
      console.error("SAVE PRICE ERROR:", error?.response?.data || error);
      showToast("Error saving price", "error");
    }
  };

  useEffect(() => {
    if (priceId) {
      loadProductImages(priceId);
    }
  }, [priceId]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const loadProductImages = async (priceId) => {
    try {
      const res = await getProductPriceImages(priceId);
      const data = res?.data?.data || [];

      const normalized = data.map((img) => {
        const rawId = img.productImgId ?? img.id;

        return {
          id: rawId, // ❗ DO NOT force Number here
          url: img.imageUrl?.startsWith("http")
            ? img.imageUrl
            : `${BASE_URL}${img.imageUrl}`,
          isDefault: Boolean(img.primaryImage),
        };
      });

      console.log("Loaded images:", normalized);
      setProductImages(normalized);
    } catch (err) {
      console.error(err);
      showToast("Failed to load images", "error");
    }
  };

  const handleProductImagesChange = async (files) => {
    if (!priceId) {
      showToast("Save product first", "warning");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    try {
      await uploadProductPriceImages(priceId, formData);
      showToast("Images uploaded", "success");

      // 🔁 ALWAYS reload from backend
      await loadProductImages(priceId);
    } catch (err) {
      showToast("Upload failed", "error");
    }
  };

  const handleSetDefault = async (imageId) => {
    const pid = Number(priceId);
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
      await setPrimaryPriceImage(pid, iid);
      showToast("Default image updated", "success");
    } catch (err) {
      showToast("Failed to set default image", "error");
    }
  };

  const handleRemoveImage = async (imgId) => {
    const iid = Number(imgId);
    const pid = Number(priceId);

    if (!Number.isInteger(pid) || !Number.isInteger(iid)) {
      showToast("Invalid Image ID", "error");
      return;
    }

    try {
      await deleteProductPriceImage(pid, iid);
      showToast("Image deleted", "success");
      await loadProductImages(pid);
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  };

  const defaultImageId =
    productImages.find((img) => img.isDefault)?.id ??
    productImages[0]?.id ??
    "";

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
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          <strong>Product Price</strong>
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setForm({
              mrpPrice: "",
              discount: "",
              sellingPrice: "",
              shelfLife: "",
              gst: "",
              productId: "",
              sizeId: "",
              packageTypeId: "",
              storageInstructions: "",
            });

            setEditId(null); // 🔥 clear edit
            setActivePriceId(null); // 🔥 clear priceId
            setProductImages([]); // 🔥 clear images

            isEditMode.current = false; // 🔥 reset mode

            fetchProducts();
            setOpen(true);
          }}
        >
          Add Price
        </Button>
      </Stack>
      <Table
        value={price}
        columns={columns}
        pagination={pagination}
        totalRecords={totalElements}
        totalPages={totalPages}
        loading={loading}
        enablePagination
        header={header}
        filters={filters} // ✅ ADD THIS
        globalFilter={globalFilter} // ✅ ADD THIS
        onPageChange={(data) =>
          setPagination({
            page: data.page,
            size: data.size,
            first: data.first,
          })
        }
      />

      <OverlayPanel ref={actionRef}>
        {selectedRow?.productPriceStatus === "Inactive" ? (
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
        title={editId ? "Edit Price" : "Add Price"}
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
            <strong>Product Price Details</strong>
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <CardContent>
            <Stack spacing={3}>
              <TextField
                select
                label="Products"
                name="productId"
                value={form.productId ?? ""}
                onChange={handleChange}
              >
                {productList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.combinedLabel}
                  </MenuItem>
                ))}
              </TextField>

              <Stack spacing={2} direction="row">
                <TextField
                  select
                  label="Product Size"
                  disabled={!form.productId}
                  name="sizeId"
                  value={form.sizeId ?? ""}
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
                  label="Shelf Life"
                  name="shelfLife"
                  value={form.shelfLife ?? ""}
                  onChange={handleChange}
                  sx={{ width: 350 }}
                />
                <TextField
                  select
                  label="Package Type"
                  name="packageTypeId"
                  disabled={!form.productId}
                  value={form.packageTypeId ?? ""}
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
                <TextField
                  label="GST"
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                />
              </Stack>
              <TextField
                label="Storage Instructions"
                name="storageInstructions"
                value={form.storageInstructions}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Stack>
          </CardContent>
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </Stack>
        </Card>
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
        onConfirm={handleDeleteConfirm}
        title="Delete Price"
        message="Are you sure you want to delete this price?"
      />
    </Box>
  );
};

export default ProductPrice;
