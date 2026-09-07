import React, { useEffect, useState } from "react";
import Table from "./Table/Table";
import { Tag } from "primereact/tag";
import { Box, Typography, Stack } from "@mui/material";

const CurrentStock = () => {
  const [data, setData] = useState([]);
  const [moveData, setMoveData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [pagination, setPagination] = useState({
    first: 0,
    size: 10,
    page: 0,
  });

  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [globalFilter, categoryFilter, statusFilter, data]);

  const fetchStock = async () => {
    const result = [
      {
        id: 1,
        productName: "Black Pepper",
        category: "Black Pepper",
        categoryCode: "P001",
        productType: "Raw Spices",
        batchNo: "BA001",
        availableQty: 80,
        totalQty: 100,
        mrpPrice: 120,
        sellingPrice: 100,
        discount: "17%",
        size: "100g",
        updatedAt: "21-04-2026 10:30 AM",
      },
      {
        id: 2,
        productName: "Cardamom",
        category: "Cardamom",
        categoryCode: "P007",
        productType: "Raw Spices",
        batchNo: "BA001",
        availableQty: 25,
        totalQty: 60,
        mrpPrice: 200,
        sellingPrice: 180,
        discount: "10%",
        size: "50g",
        updatedAt: "21-04-2026 10:10 AM",
      },
      {
        id: 3,
        productName: "Cinnamon Stick",
        category: "Cinnamon Stick",
        categoryCode: "P002",
        productType: "Raw Spices",
        batchNo: "BA001",
        availableQty: 40,
        totalQty: 80,
        mrpPrice: 110,
        sellingPrice: 95,
        discount: "14%",
        size: "100g",
        updatedAt: "21-04-2026 09:50 AM",
      },
      {
        id: 4,
        productName: "Chilli Powder",
        category: "Chilli Powder",
        categoryCode: "P004",
        productType: "Powdered Spices",
        batchNo: "BA001",
        availableQty: 70,
        totalQty: 100,
        mrpPrice: 80,
        sellingPrice: 65,
        discount: "18%",
        size: "100g",
        updatedAt: "21-04-2026 09:30 AM",
      },
      {
        id: 5,
        productName: "Turmeric Powder",
        category: "Turmeric Powder",
        categoryCode: "P005",
        productType: "Powdered Spices",
        batchNo: "BA001",
        availableQty: 50,
        totalQty: 90,
        mrpPrice: 90,
        sellingPrice: 70,
        discount: "22%",
        size: "100g",
        updatedAt: "21-04-2026 09:00 AM",
      },
      {
        id: 6,
        productName: "Chicken Masala",
        category: "Chicken Masala",
        categoryCode: "P010",
        productType: "Blended Spices",
        batchNo: "BA001",
        availableQty: 15,
        totalQty: 50,
        mrpPrice: 150,
        sellingPrice: 130,
        discount: "13%",
        size: "100g",
        updatedAt: "21-04-2026 08:45 AM",
      },
    ];

    setData(result);
    setFilteredData(result);
  };

  // 🔥 STATUS LOGIC
  const getStatus = (row) => {
    if (row.availableQty === 0) return "OUT_OF_STOCK";
    if (row.availableQty < 10) return "LOW_STOCK";
    return "ACTIVE";
  };

  
  // 🎨 STATUS TAG
  const statusBody = (row) => {
    const status = getStatus(row);

    const severityMap = {
      ACTIVE: "success",
      LOW_STOCK: "warning",
      OUT_OF_STOCK: "danger",
    };

    return <Tag value={status} severity={severityMap[status]} />;
  };

  // 🔥 FILTER LOGIC
  const applyFilters = () => {
    let temp = [...data];

    // 🔍 Search
    if (globalFilter) {
      temp = temp.filter(
        (item) =>
          item.productName.toLowerCase().includes(globalFilter.toLowerCase()) ||
          item.batchNo.toLowerCase().includes(globalFilter.toLowerCase()),
      );
    }

    // 📦 Category filter
    if (categoryFilter) {
      temp = temp.filter((item) => item.category === categoryFilter);
    }

    // 🚦 Status filter
    if (statusFilter) {
      temp = temp.filter((item) => getStatus(item) === statusFilter);
    }

    setFilteredData(temp);
  };

  // 🔥 COLUMNS
  const columns = [
    { field: "productName", header: "Product", sortable: true },
    { field: "category", header: "Category" },
    { field: "batchNo", header: "Batch No" },
    { field: "availableQty", header: "Available Qty", sortable: true },
    { field: "totalQty", header: "Total Qty" },
    { header: "Status", body: statusBody },
    { field: "updatedAt", header: "Last Updated" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* 🔝 HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Current Stock</strong>
        </Typography>
      </Stack>

      {/* 🔍 FILTERS */}
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Black Pepper">Black Pepper</option>
          <option value="Cardamom">Cardamom</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="LOW_STOCK">LOW STOCK</option>
          <option value="OUT_OF_STOCK">OUT OF STOCK</option>
        </select>
      </Stack>

      {/* 🔥 TABLE */}
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <Table
          value={filteredData}
          columns={columns}
          loading={false}
          pagination={pagination}
          totalRecords={filteredData.length}
          globalFilter={globalFilter}
          onPageChange={(p) => setPagination(p)}
        />
      </Box>
    </Box>
  );
};

export default CurrentStock;
