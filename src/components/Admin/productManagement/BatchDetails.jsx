// import React, { useState, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Tag } from "primereact/tag";
// import { Toast } from "primereact/toast";

// const BatchDetails = () => {
//   const toast = useRef(null);

//   // UI-only mock data
//   const [batches] = useState([
//     {
//       batchId: 1,
//       batchNo: "BATCH-001",
//       createdDate: "2025-01-10",
//       status: "ACTIVE",
//       products: [
//         { productName: "Black Pepper", quantity: 20, status: "INSTOCK" },
//         { productName: "Turmeric", quantity: 15, status: "LOWSTOCK" },
//       ],
//     },
//     {
//       batchId: 2,
//       batchNo: "BATCH-002",
//       createdDate: "2025-01-15",
//       status: "INACTIVE",
//       products: [
//         { productName: "Cinnamon", quantity: 0, status: "OUTOFSTOCK" },
//       ],
//     },
//   ]);

//   const [expandedRows, setExpandedRows] = useState(null);

//   const onRowExpand = (e) => {
//     toast.current.show({
//       severity: "info",
//       summary: "Batch Expanded",
//       detail: e.data.batchNo,
//     });
//   };

//   const onRowCollapse = (e) => {
//     toast.current.show({
//       severity: "success",
//       summary: "Batch Collapsed",
//       detail: e.data.batchNo,
//     });
//   };

//   const rowExpansionTemplate = (batch) => (
//     <div className="p-3">
//       <h5>Products in Batch {batch.batchNo}</h5>

//       <DataTable value={batch.products || []}>
//         <Column field="productName" header="Product" />
//         <Column field="quantity" header="Quantity" />
//         <Column field="mrp" header="MRP" />
//         <Column field="sellingPrice" header="Selling Price" />
//         <Column field="manufacturedDate" header="MFG Date" />
//         <Column field="expiryDate" header="Expiry Date" />
//         <Column
//           field="status"
//           header="Status"
//           body={(row) => <Tag value={row.status} />}
//         />
//       </DataTable>
//     </div>
//   );

//   return (
//     <div className="card">
//       <Toast ref={toast} />

//       <DataTable
//         value={batches}
//         dataKey="batchId"
//         expandedRows={expandedRows}
//         onRowToggle={(e) => setExpandedRows(e.data)}
//         onRowExpand={onRowExpand}
//         onRowCollapse={onRowCollapse}
//         rowExpansionTemplate={rowExpansionTemplate}
//         className="custom-datatable"
//       >
//         <Column expander />
//         <Column field="batchNo" header="Batch No" />
//         <Column field="createdBy" header="Created By" />
//         <Column field="createdDate" header="Created Date" />
//         <Column
//           field="status"
//           header="Status"
//           body={(row) => <Tag value={row.status} />}
//         />
//       </DataTable>
//     </div>
//   );
// };

// export default BatchDetails;

import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  IconButton,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import {
  getBatchList,
  updateBatchProduct,
  deleteBatchProduct,
  updateBatchProductStatus,
  refreshBatchStatus,
} from "../../../services/batchDetails";
import GlobalModal from "../../../ui/GlobalModal";
import Table from "./Table/Table";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { OverlayPanel } from "primereact/overlaypanel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdateIcon from "@mui/icons-material/Update";
import { Dropdown } from "primereact/dropdown";

const TYPE_LABELS = {
  PS: "Powdered Spices",
  RS: "Raw Spices",
  BS: "Blended Spices",
};

const BatchDetails = () => {
  const toast = useRef(null);

  const [batches, setBatches] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  const [moveData, setMoveData] = useState([]);
  const [step, setStep] = useState(1);

  // const fetchBatchList = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await getBatchList();

  //     // 👇 IMPORTANT: backend data mapping
  //     const batchList = res?.data?.data?.content || [];

  //     const formatted = batchList.map((batch) => ({
  //       ...batch,
  //       products: batch.products.map((p) => ({
  //         ...p,
  //         manufacturedDate: p.manufacturedDate || "",
  //         expiryDate: p.expiryDate || "",
  //       })),
  //     }));

  //     setBatches(formatted);
  //   } catch (error) {
  //     console.error("Error fetching batch list", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchBatchList = async () => {
    try {
      setLoading(true);

      const res = await getBatchList();

      // ✅ CORRECT: paginated content
      const batchList = res?.data?.data?.content || [];

      const formatted = batchList.map((batch) => ({
        ...batch,
        products: Array.isArray(batch.products) ? batch.products : [],
      }));

      setBatches(formatted);
    } catch (error) {
      console.error("Error fetching batch list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchList();
  }, []);

  /* ---------------- EDITORS ---------------- */

  const textEditor = (options) => (
    <InputText
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );

  const numberEditor = (options) => (
    <InputNumber
      value={options.value}
      onValueChange={(e) => options.editorCallback(e.value)}
    />
  );

  const dateEditor = (options) => (
    <TextField
      type="date"
      size="small"
      value={options.value || ""}
      onChange={(e) => options.editorCallback(e.target.value)}
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  );

  const formatDateTime = (value) => {
    if (!value) return "";

    const date = new Date(value);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleMoveQtyChange = (value, row) => {
    const updated = moveData.map((item) =>
      item.batchProductId === row.batchProductId
        ? { ...item, moveQty: Number(value) }
        : item,
    );

    setMoveData(updated);
  };

  const moveColumns = [
    { field: "productName", header: "Product" },
    { field: "size", header: "Size" },
    { field: "availableQty", header: "Available Qty" },
    { field: "sellingPrice", header: "Selling" },
    {
      header: "Move Qty",
      body: (row) => (
        <input
          type="number"
          value={row.moveQty}
          onChange={(e) => handleMoveQtyChange(e.target.value, row)}
          style={{ width: "80px" }}
        />
      ),
    },
  ];

  /* --------- ROW SAVE HANDLER (IMPORTANT) --------- */

  // const onProductRowEditComplete = async (batchId, e) => {
  //   const updatedRow = e.newData;

  //   const payload = {
  //     batchProductId: updatedRow.batchProductId,
  //     quantity: updatedRow.quantity,
  //     manufacturedDate: updatedRow.manufacturedDate
  //       ? updatedRow.manufacturedDate.toISOString().split("T")[0]
  //       : null,
  //     expiryDate: updatedRow.expiryDate
  //       ? updatedRow.expiryDate.toISOString().split("T")[0]
  //       : null,
  //   };

  //   try {
  //     await updateBatchProduct(payload);

  //     setBatches((prevBatches) =>
  //       prevBatches.map((batch) =>
  //         batch.batchId === batchId
  //           ? {
  //               ...batch,
  //               products: batch.products.map((p) =>
  //                 p.batchProductId === updatedRow.batchProductId
  //                   ? updatedRow
  //                   : p
  //               ),
  //             }
  //           : batch
  //       )
  //     );

  //     toast.current.show({
  //       severity: "success",
  //       summary: "Updated",
  //       detail: "Batch product updated successfully",
  //     });
  //   } catch (error) {
  //     console.error("Update Failed", error);

  //     toast.current.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: "Failed to update Batch Product",
  //     });
  //   }
  // };

  const onProductRowEditComplete = async (batchId, e) => {
    const updatedRow = e.newData;

    const payload = {
      batchProductId: updatedRow.batchProductId,
      quantity: updatedRow.quantity,
      manufacturedDate: updatedRow.manufacturedDate || null,
      expiryDate: updatedRow.expiryDate || null,
    };

    try {
      await updateBatchProduct(payload);

      setBatches((prev) =>
        prev.map((batch) =>
          batch.batchId === batchId
            ? {
                ...batch,
                products: batch.products.map((p) =>
                  p.batchProductId === updatedRow.batchProductId
                    ? updatedRow
                    : p,
                ),
              }
            : batch,
        ),
      );

      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "Batch product updated successfully",
      });
    } catch (error) {
      console.error("Update Failed", error);

      const backendMessage =
        error?.response?.data?.msg || // 👈 THIS IS THE KEY
        "Failed to update Batch Product";

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: backendMessage,
        life: 4000,
      });
    }
  };

  const handleStatusChange = async (batchId, rowData, newStatus) => {
    try {
      await updateBatchProductStatus(rowData.batchProductId, newStatus);

      // update UI after success
      setBatches((prev) =>
        prev.map((batch) =>
          batch.batchId === batchId
            ? {
                ...batch,
                products: batch.products.map((p) =>
                  p.batchProductId === rowData.batchProductId
                    ? { ...p, batchStatus: newStatus }
                    : p,
                ),
              }
            : batch,
        ),
      );

      toast.current.show({
        severity: "success",
        summary: "Status Updated",
        detail: "Product status updated successfully",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error?.response?.data?.msg || "Failed to update status",
      });
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);

      // 1️⃣ Call backend refresh logic
      await refreshBatchStatus();

      // 2️⃣ Collapse expanded rows (clean UX)
      setExpandedRows(null);

      // 3️⃣ Reload batch list
      await fetchBatchList();

      toast.current.show({
        severity: "success",
        summary: "Refreshed",
        detail: "Batch status refreshed successfully",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error?.response?.data?.msg || "Failed to refresh batch status",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (batchId, batchProductId) => {
    try {
      await deleteBatchProduct(batchProductId);

      setBatches((prev) =>
        prev.map((batch) =>
          batch.batchId === batchId
            ? {
                ...batch,
                products: batch.products.filter(
                  (p) => p.batchProductId !== batchProductId,
                ),
              }
            : batch,
        ),
      );

      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Batch product deleted successfully",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error?.response?.data?.msg || "Failed to delete batch product",
      });
    }
  };

  const STATUS_OPTIONS = [
    { label: "ACTIVE", value: 1, severity: "success" },
    { label: "EXPIRED", value: 2, severity: "warning" },
    { label: "BLOCKED", value: 3, severity: "danger" },
    { label: "SOLD OUT", value: 4, severity: "info" },
    { label: "CLOSED", value: 5, severity: "warning" },
  ];

  const statusEditor = (options) => {
    const isExpired = options.rowData.batchStatus === 2;
    const isSoldOut = options.rowData.batchStatus === 4;

    return (
      <Dropdown
        value={options.value}
        options={STATUS_OPTIONS}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => {
          options.editorCallback(e.value);
          handleStatusChange(options.rowData.batchId, options.rowData, e.value);
        }}
        placeholder="Select Status"
        disabled={isExpired || isSoldOut} // ✅ CORRECT
        style={{ width: "100%" }}
      />
    );
  };

  const formatDate = (value) => {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}-${m}-${y}`; // DD-MM-YYYY
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={STATUS_OPTIONS}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Select Status"
        showClear
        style={{ width: "100%" }}
      />
    );
  };

  const getStatusMeta = (status) => {
    return (
      STATUS_OPTIONS.find((s) => s.value === status) || {
        label: "UNKNOWN",
        severity: "secondary",
      }
    );
  };

  const handleMoveClick = (batchProducts = []) => {
    const updated = batchProducts.map((item) => ({
      ...item,
      moveQty: 0,
    }));

    setMoveData(updated);
    setStep(1);
    setOpenMove(true);
  };

  const dummyProducts = [
    {
      batchProductId: 1,
      batchNo: "BA001",
      productName: "Turmeric Powder",
      size: "100g",
      availableQty: 50,
    },
  ];
  /* --------- EXPANDED ROW TEMPLATE --------- */

  const rowExpansionTemplate = (batch, options) => {
    const batchIndex = options.rowIndex;

    return (
      <div className="p-3">
        <h5>Products in Batch {batch.batchNo}</h5>

        {/* <DataTable
          value={batch.products}
          editMode="row"
          dataKey="batchProductId"
          onRowEditComplete={(e) => onProductRowEditComplete(batch.batchId, e)}
          filterDisplay="menu"
          scrollable
          scrollHeight="250px"
          scrollDirection="both"
          tableStyle={{ minWidth: "900px" }}
        > */}
        {/* <Box sx={{ width: "100%", overflowX: "auto" }}> */}
        <DataTable
          value={batch.products}
          editMode="row"
          dataKey="batchProductId"
          onRowEditComplete={(e) => onProductRowEditComplete(batch.batchId, e)}
          filterDisplay="menu"
          scrollable
          scrollHeight="250px"
          scrollDirection="horizontal"
          tableStyle={{ minWidth: "1000px", width: "max-content" }}
        >
          <Column
            field="productName"
            header="Product"
            filter
            showFilterMenu
            showFilterMatchModes
            style={{ minWidth: "180px" }}
          />
          <Column
            field="categoryType"
            header="Product Type"
            style={{ minWidth: "130px" }}
            body={(rowData) =>
              TYPE_LABELS[rowData.categoryType] || rowData.categoryType
            }
          />
          <Column
            field="categoryName"
            header="Product Category"
            style={{ minWidth: "150px" }}
          />
          <Column
            header="Size"
            body={(rowData) => `${rowData.size}${rowData.sizeType}`}
          />
          <Column
            field="quantity"
            header="Quantity"
            body={(rowData) => (
              <div style={{ textAlign: "center", width: "100%" }}>
                {rowData.quantity}
              </div>
            )}
          />
          <Column field="mrp" header="MRP" style={{ minWidth: "80px" }} />
          <Column
            field="sellingPrice"
            header="Selling Price"
            style={{ minWidth: "120px" }}
            body={(rowData) => (
              <div style={{ textAlign: "center", width: "100%" }}>
                {rowData.sellingPrice}
              </div>
            )}
          />
          <Column field="discount" header="Discount" />
          <Column
            field="packageType"
            header="Package Type"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="availableQty"
            header="Available Qty"
            style={{ minWidth: "130px" }}
          />
          <Column
            field="totalQty"
            header="Total Qty"
            style={{ minWidth: "140px" }}
          />

          {/* <Column
            field="manufacturedDate"
            header="Mfg Date"
            body={(row) => formatDate(row.manufacturedDate)} // 👈 normal view
            editor={dateEditor} // 👈 edit view
          />

          <Column
            field="expiryDate"
            header="Expiry Date"
            body={(row) => formatDate(row.expiryDate)}
            editor={dateEditor}
            dataType="date"
            filter
            showFilterMenu
            filterMatchMode="dateIs"
          /> */}

          {/* ✅ STATUS DROPDOWN */}
          <Column
            field="batchStatus"
            header="Status"
            body={(row) => {
              const status = getStatusMeta(row.batchStatus);
              return <Tag value={status.label} severity={status.severity} />;
            }}
            filter
            showFilterMenu
            filterElement={statusFilterTemplate}
            editor={statusEditor}
          />

          <Column
            header="Action"
            body={(rowData) => {
              const opRef = React.createRef();

              return (
                <Box display="flex" alignItems="center" gap={1}>
                  {/* Primary action */}
                  {/* <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      e.stopPropagation();
                      handleMoveClick;
                    }}
                  >
                    Move
                  </Button> */}

                  {/* Menu button */}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      opRef.current.toggle(e);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  {/* Overlay menu */}
                  <OverlayPanel ref={opRef} style={{ width: 140 }}>
                    <Stack spacing={1}>
                      <Button
                        startIcon={<CompareArrowsIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveClick([rowData]);
                        }}
                      >
                        Move
                      </Button>

                      <Button
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        color="error"
                        onClick={() =>
                          deleteProduct(batch.batchId, rowData.batchProductId)
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </OverlayPanel>
                </Box>
              );
            }}
          />

          {/* <Column
            header="Action"
            body={(rowData) => (
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveClick(dummyProducts); // 🔥 USE DUMMY
                }}
              >
                Move
              </Button>
            )}
          /> */}

          {/* <Column rowEditor headerStyle={{ width: "6rem" }} />

          <Column
            header=""
            body={(rowData) => (
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProduct(batch.batchId, rowData.batchProductId);
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            )}
          /> */}
        </DataTable>
        {/* </Box> */}
      </div>
    );
  };

  return (
    <div className="card">
      <Toast ref={toast} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Batch List
        </Typography>

        <IconButton
          onClick={handleRefresh}
          disabled={loading}
          sx={{
            backgroundColor: "#00bcd4",
            color: "#fff",
            width: 40,
            height: 40,
            "&:hover": {
              backgroundColor: "#0097a7",
            },
          }}
        >
          <UpdateIcon />
        </IconButton>
      </Box>

      <DataTable
        value={batches}
        dataKey="batchId"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        className="custom-datatable"
        loading={loading}
      >
        <Column expander style={{ width: "3rem" }} />
        <Column field="batchNo" header="Batch No" />

        <Column field="shelfLife" header="Shelf Life" />

        <Column
          field="manufacturedDate"
          header="MFG Date"
          body={(row) => formatDate(row.manufacturedDate)} // 👈 normal view
          editor={dateEditor} // 👈 edit view
        />

        <Column
          field="expiryDate"
          header="Expiry Date"
          body={(row) => formatDate(row.expiryDate)}
          editor={dateEditor}
          dataType="date"
        />

        <Column field="createdBy" header="Created By" />
        <Column
          header="Created At"
          body={(row) => formatDateTime(row.createdAt)}
        />

        <Column
          field="batchStatus"
          header="Status"
          body={(row) => {
            const status = getStatusMeta(row.batchStatus);
            return (
              <Tag value={status.label} severity={status.severity} rounded />
            );
          }}
          editor={statusEditor}
        />
      </DataTable>
      <GlobalModal
        open={openMove}
        handleClose={() => setOpenMove(false)}
        title="Move Stock to Current Inventory"
        actions={
          <>
            <Button onClick={() => setOpenMove(false)}>Cancel</Button>

            {step === 2 && <Button onClick={() => setStep(1)}>Back</Button>}

            {step === 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  const hasInvalid = moveData.some(
                    (item) => item.moveQty > item.availableQty,
                  );

                  if (hasInvalid) {
                    alert("Move qty exceeds available qty");
                    return;
                  }

                  setStep(2);
                }}
              >
                Continue
              </Button>
            )}

            {step === 2 && (
              <Button variant="contained" color="success">
                Confirm Move
              </Button>
            )}
          </>
        }
      >
        {/* {step === 1 && (
          <Table
            value={moveData}
            columns={moveColumns}
            enablePagination={false}
          />
        )} */}

        {step === 1 && moveData.length > 0 && (
          <Box sx={{ width: "100%" }}>
            <Stack spacing={1.5}>
              {/* Product Name */}
              <Typography variant="h6" fontWeight={600}>
                {moveData[0].productName}
              </Typography>

              {/* Info */}
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Category</Typography>
                <Typography sx={{ minWidth: 120, textAlign: "right" }}>
                  {moveData[0].category ?? "N/A"}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Type</Typography>
                <Typography>{moveData[0].productType ?? "N/A"}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Size</Typography>
                <Typography>{moveData[0].size}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Available Qty</Typography>
                <Typography fontWeight={600} color="success.main">
                  {moveData[0].availableQty}
                </Typography>
              </Box>

              {/* Divider */}
              <Box sx={{ borderTop: "1px solid #eee", my: 1 }} />

              {/* Input */}
              <TextField
                label="Move Quantity"
                type="number"
                size="small"
                value={moveData[0].moveQty}
                onChange={(e) =>
                  handleMoveQtyChange(e.target.value, moveData[0])
                }
                sx={{ width: 350 }}
                inputProps={{
                  min: 0,
                  max: moveData[0].availableQty,
                }}
              />
            </Stack>
          </Box>
        )}

        {step === 2 && (
          <Stack spacing={1}>
            <Typography variant="h6">Confirm Movement</Typography>

            {moveData.filter((item) => item.moveQty > 0).length === 0 ? (
              <Typography>No items selected</Typography>
            ) : (
              moveData
                .filter((item) => item.moveQty > 0)
                .map((item) => (
                  <Typography key={item.batchProductId}>
                    {item.productName} → <b>{item.moveQty}</b>
                  </Typography>
                ))
            )}
          </Stack>
        )}
      </GlobalModal>
    </div>
  );
};

export default BatchDetails;
