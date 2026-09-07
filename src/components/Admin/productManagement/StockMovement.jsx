import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import Table from "./Table/Table";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button as PrimeButton } from "primereact/button";
import { getStockMovementList } from "../../../services/stockMovement";

const StockMovement = () => {
  const [stockMovement, setStockMovement] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });

  const [totalElements, setTotalElements] = useState(0);

  const [globalFilter, setGlobalFilter] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const header = (
    <div className="flex justify-content-between align-items-center p-3">
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
          placeholder="Search Stock Movement"
          className="p-inputtext-sm"
        />
      </IconField>
    </div>
  );

  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    {
      field: "productName",
      header: "Product",
      style: { minWidth: "200px" },
    },
    {
      field: "productType",
      header: "Type",
      style: { minWidth: "50px" },
    },
    {
      field: "productCategory",
      header: "Category",
      style: { minWidth: "150px" },
      body: (row) => (
        <span
          style={{
            backgroundColor: "#e0f2fe",
            color: "#0369a1",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        >
          {row.productCategory}
        </span>
      ),
    },
    {
      field: "batchNo",
      header: "Batch No",
      style: { minWidth: "120px" },
    },
    {
      field: "orderNumber",
      header: "Order No",
      style: { minWidth: "150px" },
    },
    {
      field: "invoiceNo",
      header: "Invoice No",
      style: { minWidth: "150px" },
    },
    {
      header: "Type",
      // style: { minWidth: "120px" },
      body: (row) => (
        <span
          style={{
            backgroundColor: row.movementType === "IN" ? "#dcfce7" : "#fee2e2",
            color: row.movementType === "IN" ? "#166534" : "#991b1b",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {row.movementType}
        </span>
      ),
    },
    {
      header: "Quantity",
      style: { minWidth: "10px" },

      body: (row) => (
        <span
          style={{
            color: row.movementType === "IN" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {row.movementType === "IN" ? "+ " : "- "}
          {row.quantity}
        </span>
      ),
    },
    {
      header: "Reason",
      // style: { minWidth: "100px" },

      body: (row) => (
        <span
          style={{
            backgroundColor: row.reason === "ORDER" ? "#fee2e2" : "#dcfce7",
            color: row.reason === "ORDER" ? "#991b1b" : "#166534",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {row.reason}
        </span>
      ),
    },
    {
      header: "Date",
      style: { minWidth: "120px" },
      body: (row) => (
        <span style={{ color: "#64748b" }}>
          {row.createdAt ? new Date(row.createdAt).toLocaleString() : "-"}
        </span>
      ),
    },
  ];

  const productMap = {
    "Green Cardamom": {
      productType: "Raw Spice",
      productCategory: "Whole",
    },
    Cloves: {
      productType: "Raw Spice",
      productCategory: "Whole",
    },
  };

  // useEffect(() => {
  //   const data = [
  //     {
  //       id: 1,
  //       productName: "Green Cardamom",
  //       batchNo: "BA001",
  //       orderNumber: "ORD-123",
  //       movementType: "OUT",
  //       quantity: 2,
  //       createdAt: new Date(),
  //     },
  //     {
  //       id: 2,
  //       productName: "Cloves",
  //       batchNo: "BA002",
  //       orderNumber: "ORD-456",
  //       movementType: "IN",
  //       quantity: 5,
  //       createdAt: new Date(),
  //     },
  //   ];

  //   const mapped = data.map((item) => ({
  //     ...item,
  //     productType: productMap[item.productName]?.productType || "-",
  //     productCategory: productMap[item.productName]?.productCategory || "-",
  //     reason: item.movementType === "OUT" ? "ORDER" : "RETURN",
  //   }));

  //   setStockMovement(mapped);
  // }, []);

  const fetchStockMovements = async () => {
    setLoading(true);

    const payload = {
      search: globalFilter,
      page: pagination.page,
      size: pagination.size,
    };

    try {
      const res = await getStockMovementList(payload);

      console.log("API DATA 👉", res.data);

      const content = res?.data?.data?.content || [];

      // 🔥 map extra fields (optional)
      const mapped = content.map((item) => ({
        ...item,
        reason: item.movementType === "OUT" ? "ORDER" : "RETURN",
      }));

      setStockMovement(mapped);
      setTotalElements(res?.data?.data?.totalElements || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockMovements();
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPagination((prev) => ({ ...prev, page: 0 }));
      fetchStockMovements();
    }, 500);

    return () => clearTimeout(delay);
  }, [globalFilter]);

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Stock Movement</strong>
        </Typography>
      </Stack>

      {/* 🔥 SCROLL WRAPPER */}
      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table
          value={stockMovement}
          columns={columns}
          filters={filters}
          header={header}
          globalFilterFields={[
            "productName",
            "batchNo",
            "orderNumber",
            "movementType",
          ]}
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
      </Box>
    </Box>
  );
};

export default StockMovement;
