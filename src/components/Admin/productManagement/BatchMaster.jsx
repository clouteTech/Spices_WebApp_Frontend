import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Paper,
  MenuItem,
} from "@mui/material";
import Table from "./Table/Table";
import {
  getPackageTypeByProduct,
  getSizeByPackage,
  getProductPriceBySize,
  addBatch,
  getProductByShelfLife,
} from "../../../services/batchService";

const BatchMaster = () => {
  const [productsList, setProductsList] = useState([]);
  const [batchRows, setBatchRows] = useState([]);
  const [batchCount, setBatchCount] = useState(1);

  const [batchInfo, setBatchInfo] = useState({
    batchNo: "",
    shelfLife: "",
    manufacturedDate: "",
    expiryDate: "",
    createdBy: "Admin", // or logged-in user
    createdAt: new Date().toISOString().slice(0, 16),
  });

  const calculateExpiryDate = (mfgDate, shelfLife) => {
    if (!mfgDate || !shelfLife) return "";
    const date = new Date(mfgDate);
    date.setMonth(date.getMonth() + Number(shelfLife));

    return date.toISOString().split("T")[0];
  };

  const handleGetProductDetails = async () => {
    if (!batchInfo.shelfLife) {
      alert("Please enter Shelf Life");
      return;
    }

    try {
      const res = await getProductByShelfLife(batchInfo.shelfLife);

      const list = res?.data?.data || [];

      const formatted = list.map((item) => ({
        ...item,
        combinedLabel: `${item.productName} - ${item.productCategory} - ${item.productType}`,
      }));

      // 🔥 THIS is what table dropdown uses
      setProductsList(formatted);

      // clear old rows
      setBatchRows([]);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch products");
    }
  };

  // Create empty row
  const createEmptyRow = () => ({
    id: `${Date.now()}-${Math.random()}`,
    productId: "",
    packageTypeId: "",
    sizeId: "",
    productPriceId: null,
    quantity: "",
    manufacturedDate: "",
    expiryDate: "",

    // dropdown data per row
    packageTypes: [],
    sizeTypes: [],
  });

  // Add multiple rows dynamically
  const handleAddBatch = () => {
    if (!batchCount || batchCount <= 0) return;

    const newRows = Array.from({ length: batchCount }, () => createEmptyRow());

    setBatchRows((prev) => [...prev, ...newRows]);
  };

  const handleSubmitBatch = async () => {
    // 1️⃣ Basic validation
    if (!batchInfo.batchNo) {
      alert("Please enter Batch No");
      return;
    }

    if (!batchInfo.manufacturedDate || !batchInfo.expiryDate) {
      alert("Manufactured Date or Expiry Date missing");
      return;
    }

    if (batchRows.length === 0) {
      alert("Please add at least one product row");
      return;
    }

    // 2️⃣ Row-level validation
    for (let i = 0; i < batchRows.length; i++) {
      const row = batchRows[i];

      if (row.productPriceId == null || !row.quantity) {
        alert(`Please fill all fields in row ${i + 1}`);
        return;
      }
    }

    // 3️⃣ FINAL PAYLOAD (✅ CORRECT)
    const payload = {
      batchNo: batchInfo.batchNo,
      manufacturedDate: batchInfo.manufacturedDate, // ✅ from form
      expiryDate: batchInfo.expiryDate, // ✅ auto-calculated
      products: batchRows.map((row) => ({
        productPriceId: row.productPriceId,
        quantity: Number(row.quantity),
      })),
    };

    console.log("🚀 FINAL PAYLOAD:", payload);

    // 4️⃣ API call
    try {
      await addBatch(payload);
      alert("Batch saved successfully ✅");

      // reset
      setBatchRows([]);
      setBatchInfo((prev) => ({
        ...prev,
        batchNo: "",
        shelfLife: "",
        manufacturedDate: "",
        expiryDate: "",
      }));
    } catch (err) {
      alert("Failed to save batch ❌");
    }
  };

  // Table columns
  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "70px" },
    },
    {
      header: "Product Name",
      body: (row, options) => (
        <TextField
          select
          size="small"
          value={row.productId != null ? String(row.productId) : ""}
          onChange={async (e) => {
            const productId = Number(e.target.value);

            console.log(
              "✅ Product selected:",
              productId,
              "rowIndex:",
              options.rowIndex
            );

            try {
              const res = await getPackageTypeByProduct(productId,batchInfo.shelfLife);
              const packageTypes = res?.data?.data || [];

              setBatchRows((prev) => {
                const updated = [...prev];
                updated[options.rowIndex] = {
                  ...updated[options.rowIndex],
                  productId,
                  packageTypeId: "",
                  sizeId: "",
                  productPriceId: null,
                  packageTypes,
                  sizeTypes: [],
                };

                console.log(
                  "🧾 Row after product select:",
                  updated[options.rowIndex]
                );

                return updated;
              });
            } catch (err) {
              console.error("Failed to load package types", err);
            }
          }}
          sx={{ width: 260 }}
        >
          {productsList.map((p) => (
            <MenuItem key={p.productId} value={String(p.productId)}>
              {p.combinedLabel}
            </MenuItem>
          ))}
        </TextField>
      ),
    },

    {
      header: "Package Type",
      body: (row) => (
        <TextField
          select
          size="small"
          sx={{ width: 180 }}
          value={row.packageTypeId != null ? String(row.packageTypeId) : ""}
          disabled={!row.productId}
          onChange={async (e) => {
            const packageTypeId = Number(e.target.value);
            const productId = row.productId;

            try {
              // 🔥 Fetch sizes ONLY when package is selected
              const res = await getSizeByPackage(productId, packageTypeId,batchInfo.shelfLife);
              const list = res?.data?.data || [];

              // ✅ Normalize size data
              const sizeTypes = list.map((s) => ({
                sizeId: s.sizeId ?? s.id, // 🔥 FIX
                label: `${s.sizeType} - ${s.size}`,
                productPriceId: s.productPriceId,
              }));

              // ✅ SAFE UPDATE USING row.id
              setBatchRows((prev) =>
                prev.map((r) =>
                  r.id === row.id
                    ? {
                        ...r,
                        packageTypeId,
                        sizeId: "",
                        productPriceId: null, // reset size
                        sizeTypes,
                      }
                    : r
                )
              );
            } catch (error) {
              console.error("Failed to load sizes", error);
            }
          }}
        >
          {row.packageTypes.map((pkg) => (
            <MenuItem key={pkg.packageTypeId} value={String(pkg.packageTypeId)}>
              {/* ✅ SAFE LABEL */}
              {pkg.type || pkg.packageType}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      header: "Size",
      body: (row) => (
        <TextField
          select
          size="small"
          sx={{ width: 160 }}
          disabled={!row.packageTypeId || row.sizeTypes.length === 0}
          value={row.sizeId || ""} // ✅ string only
          // onChange={async (e) => {
          //   const sizeId = e.target.value; // ✅ convert only for API

          //   console.log("✅ Size selected (number):", sizeId);

          //   if (!sizeId) return; // safety

          //   try {
          //     const res = await getProductPriceBySize(
          //       row.productId,
          //       row.packageTypeId,
          //       sizeId
          //     );

          //     const productPriceId = res?.data?.data?.productPriceId;

          //     console.log("🔥 productPriceId from API:", productPriceId);

          //     setBatchRows((prev) =>
          //       prev.map((r) =>
          //         r.id === row.id
          //           ? {
          //               ...r,
          //               sizeId: sizeId, // ✅ STORE STRING
          //               productPriceId, // ✅ STORE NUMBER
          //             }
          //           : r
          //       )
          //     );
          //   } catch (error) {
          //     console.error("❌ Failed to fetch product price", error);
          //   }
          // }}

          onChange={async (e) => {
            const sizeId = Number(e.target.value);

            // safety check
            if (!row.productId || !row.packageTypeId || !sizeId) {
              console.warn("Missing IDs for price fetch");
              return;
            }

            try {
              // 🔥 FINAL PRICE CALL
              const res = await getProductPriceBySize(
                row.productId,
                row.packageTypeId,
                sizeId,
                batchInfo.shelfLife
              );

              const productPriceId = res?.data?.data?.priceId;

              console.log("🔥 ProductPriceId:", productPriceId);

              if (!productPriceId) return;

              setBatchRows((prev) =>
                prev.map((r) =>
                  r.id === row.id
                    ? {
                        ...r,
                        sizeId,
                        productPriceId, // 🔑 RESULT OF ALL 3 IDS
                      }
                    : r
                )
              );
            } catch (error) {
              console.error("❌ Failed to fetch product price", error);
            }
          }}
        >
          {row.sizeTypes.map((s) => (
            <MenuItem key={s.sizeId} value={String(s.sizeId)}>
              {s.label}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      header: "Quantity",
      body: (row, options) => (
        <TextField
          type="number"
          size="small"
          value={row.quantity ?? ""}
          onChange={(e) => {
            const updated = [...batchRows];
            updated[options.rowIndex] = {
              ...updated[options.rowIndex],
              quantity: e.target.value,
            };
            setBatchRows(updated);
          }}
        />
      ),
    },
    // {
    //   header: "Mfg Date",
    //   body: (row) => (
    //     <TextField
    //       type="date"
    //       size="small"
    //       value={row.manufacturedDate || ""}
    //       onChange={(e) => {
    //         const value = e.target.value;

    //         setBatchRows((prev) =>
    //           prev.map((r) =>
    //             r.id === row.id ? { ...r, manufacturedDate: value } : r
    //           )
    //         );
    //       }}
    //       InputLabelProps={{ shrink: true }}
    //     />
    //   ),
    // },
    // {
    //   header: "Expiry Date",
    //   body: (row, options) => (
    //     <TextField
    //       type="date"
    //       size="small"
    //       value={row.expiryDate || ""}
    //       onChange={(e) => {
    //         const value = e.target.value;

    //         setBatchRows((prev) =>
    //           prev.map((r) =>
    //             r.id === row.id ? { ...r, expiryDate: value } : r
    //           )
    //         );
    //       }}
    //       InputLabelProps={{ shrink: true }}
    //     />
    //   ),
    // },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Stack spacing={2} alignItems="flex-start" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Add Batch
        </Typography>

        <Paper
          sx={{
            p: 3,
            maxWidth: 900,
            boxShadow: 6,
            position: "relative",
          }}
        >
          <Stack spacing={2}>
            {/* Row 1 */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Batch No"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.batchNo}
                onChange={(e) =>
                  setBatchInfo((prev) => ({
                    ...prev,
                    batchNo: e.target.value,
                  }))
                }
              />

              <TextField
                label="Shelf Life (month)"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.shelfLife}
                onChange={(e) => {
                  const shelfLife = e.target.value;

                  setBatchInfo((prev) => ({
                    ...prev,
                    shelfLife,
                    expiryDate: calculateExpiryDate(
                      prev.manufacturedDate,
                      shelfLife
                    ),
                  }));
                }}
              />

              <TextField
                label="MFG Date"
                type="date"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.manufacturedDate}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const mfgDate = e.target.value;
                  setBatchInfo((prev) => ({
                    ...prev,
                    manufacturedDate: mfgDate,
                    expiryDate: calculateExpiryDate(mfgDate, prev.shelfLife),
                  }));
                }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.expiryDate || ""}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Stack>

            {/* Row 2 */}
            <Stack direction="row" spacing={2}>
              <TextField
                label="Created By"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.createdBy}
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Created At"
                type="datetime-local"
                size="small"
                sx={{ width: 200 }}
                value={batchInfo.createdAt}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 3, borderRadius: 4 }}
              onClick={handleGetProductDetails}
              disabled={!batchInfo.shelfLife}
            >
              Get Product Details
            </Button>
          </Stack>
        </Paper>
      </Stack>

      {/* Controls */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField
          type="number"
          label="No. of Batches"
          size="small"
          value={batchCount === 0 ? "" : batchCount}
          onChange={(e) => {
            const value = e.target.value;
            setBatchCount(value === "" ? "" : parseInt(value, 10));
          }}
          inputProps={{ min: 1 }}
          sx={{ width: 180 }}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 4 }}
          onClick={handleAddBatch}
        >
          Add Product Rows
        </Button>
      </Stack>

      {/* Table */}
      <Table
        value={batchRows}
        columns={columns}
        loading={false}
        enablePagination={false}
      />
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmitBatch}
          sx={{ borderRadius: 4 }}
        >
          Submit Batch
        </Button>
      </Stack>
    </Box>
  );
};

export default BatchMaster;

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Stack,
//   Typography,
//   TextField,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import GlobalDataGrid from "../../../ui/GlobalDataGrid";
// import {
//   getAllProductDetails,
//   getPackageTypeByProduct,
//   getSizeByPackage,
//   getProductPriceBySize,
//   addBatch,
// } from "../../../services/batchService";

// const BatchMaster = () => {
//   const [productsList, setProductsList] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [batchCount, setBatchCount] = useState(1);

//   const [batchInfo, setBatchInfo] = useState({
//     batchNo: "",
//     createdBy: "Admin",
//     createdAt: new Date().toISOString().slice(0, 16),
//   });

//   /* ================= LOAD PRODUCTS ================= */

//   useEffect(() => {
//     getAllProductDetails().then((res) => {
//       const list = res?.data?.data || [];
//       setProductsList(
//         list.map((p) => ({
//           ...p,
//           label: `${p.productName} - ${p.productCategory}`,
//         }))
//       );
//     });
//   }, []);

//   /* ================= ROW HANDLING ================= */

//   const createRow = () => ({
//     id: `${Date.now()}-${Math.random()}`,
//     productId: "",
//     packageTypeId: "",
//     sizeId: "",
//     productPriceId: null,
//     quantity: "",
//     manufacturedDate: "",
//     expiryDate: "",
//     packageTypes: [],
//     sizeTypes: [],
//   });

//   const addRows = () => {
//     const newRows = Array.from({ length: batchCount }, createRow);
//     setRows((p) => [...p, ...newRows]);
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async () => {
//     if (!batchInfo.batchNo) {
//       alert("Batch No required");
//       return;
//     }

//     const invalid = rows.find(
//       (r) =>
//         r.productPriceId == null ||
//         !r.quantity ||
//         !r.manufacturedDate ||
//         !r.expiryDate
//     );

//     if (invalid) {
//       alert("Please complete all rows");
//       return;
//     }

//     const payload = {
//       batchNo: batchInfo.batchNo,
//       products: rows.map((r) => ({
//         productPriceId: r.productPriceId,
//         quantity: Number(r.quantity),
//         manufacturedDate: r.manufacturedDate,
//         expiryDate: r.expiryDate,
//       })),
//     };

//     await addBatch(payload);
//     alert("Batch created successfully ✅");

//     setRows([]);
//     setBatchInfo((p) => ({ ...p, batchNo: "" }));
//   };

//   /* ================= TABLE COLUMNS ================= */

//   const columns = [
//     {
//       header: "Product",
//       width: "250px",
//       render: (row) => (
//         <TextField
//           select
//           size="small"
//           value={row.productId}
//           onChange={async (e) => {
//             const productId = Number(e.target.value);
//             const res = await getPackageTypeByProduct(productId);

//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id
//                   ? {
//                       ...r,
//                       productId,
//                       packageTypeId: "",
//                       sizeId: "",
//                       productPriceId: null,
//                       quantity: "",
//                       manufacturedDate: "",
//                       expiryDate: "",
//                       packageTypes: res.data.data,
//                       sizeTypes: [],
//                     }
//                   : r
//               )
//             );
//           }}
//         >
//           {productsList.map((p) => (
//             <MenuItem key={p.productId} value={p.productId}>
//               {p.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       ),
//     },
//     {
//       header: "Package",
//       width: "180px",
//       render: (row) => (
//         <TextField
//           select
//           size="small"
//           disabled={!row.productId}
//           value={row.packageTypeId}
//           onChange={async (e) => {
//             const packageTypeId = Number(e.target.value);
//             const res = await getSizeByPackage(row.productId, packageTypeId);

//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id
//                   ? {
//                       ...r,
//                       packageTypeId,
//                       sizeId: "",
//                       productPriceId: null,
//                       sizeTypes: res.data.data,
//                     }
//                   : r
//               )
//             );
//           }}
//         >
//           {row.packageTypes.map((p) => (
//             <MenuItem key={p.packageTypeId} value={p.packageTypeId}>
//               {p.packageType}
//             </MenuItem>
//           ))}
//         </TextField>
//       ),
//     },
//     {
//       header: "Size",
//       width: "160px",
//       render: (row) => (
//         <TextField
//           select
//           size="small"
//           disabled={!row.packageTypeId}
//           value={row.sizeId}
//           onChange={async (e) => {
//             const sizeId = Number(e.target.value);
//             const res = await getProductPriceBySize(
//               row.productId,
//               row.packageTypeId,
//               sizeId
//             );

//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id
//                   ? {
//                       ...r,
//                       sizeId,
//                       productPriceId: res.data.data.priceId,
//                     }
//                   : r
//               )
//             );
//           }}
//         >
//           {row.sizeTypes.map((s) => (
//             <MenuItem key={s.sizeId} value={s.sizeId}>
//               {`${s.sizeType} - ${s.size}`}
//             </MenuItem>
//           ))}
//         </TextField>
//       ),
//     },
//     {
//       header: "Qty",
//       width: "120px",
//       render: (row) => (
//         <TextField
//           type="number"
//           size="small"
//           value={row.quantity}
//           onChange={(e) =>
//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id ? { ...r, quantity: e.target.value } : r
//               )
//             )
//           }
//         />
//       ),
//     },
//     {
//       header: "MFG Date",
//       width: "160px",
//       render: (row) => (
//         <TextField
//           type="date"
//           size="small"
//           value={row.manufacturedDate}
//           onChange={(e) =>
//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id ? { ...r, manufacturedDate: e.target.value } : r
//               )
//             )
//           }
//         />
//       ),
//     },
//     {
//       header: "EXP Date",
//       width: "160px",
//       render: (row) => (
//         <TextField
//           type="date"
//           size="small"
//           value={row.expiryDate}
//           onChange={(e) =>
//             setRows((prev) =>
//               prev.map((r) =>
//                 r.id === row.id ? { ...r, expiryDate: e.target.value } : r
//               )
//             )
//           }
//         />
//       ),
//     },
//   ];

//   /* ================= UI ================= */

//   return (
//     <Box p={4}>
//       <Typography variant="h5" mb={3}>
//         Batch Master
//       </Typography>

//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Stack direction="row" spacing={2}>
//           <TextField
//             label="Batch No"
//             size="small"
//             value={batchInfo.batchNo}
//             onChange={(e) =>
//               setBatchInfo((p) => ({ ...p, batchNo: e.target.value }))
//             }
//           />
//           <TextField
//             label="Created By"
//             size="small"
//             value={batchInfo.createdBy}
//             InputProps={{ readOnly: true }}
//           />
//           <TextField
//             label="Created At"
//             type="datetime-local"
//             size="small"
//             value={batchInfo.createdAt}
//             InputLabelProps={{ shrink: true }}
//             InputProps={{ readOnly: true }}
//           />
//         </Stack>
//       </Paper>

//       <Stack direction="row" spacing={2} mb={2}>
//         <TextField
//           type="number"
//           label="No. of Rows"
//           size="small"
//           value={batchCount}
//           onChange={(e) => setBatchCount(Number(e.target.value))}
//         />
//         <Button variant="contained" onClick={addRows}>
//           Add Rows
//         </Button>
//       </Stack>

//       <GlobalDataGrid columns={columns} rows={rows} />

//       <Stack alignItems="flex-end" mt={3}>
//         <Button variant="contained" color="success" onClick={handleSubmit}>
//           Submit Batch
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default BatchMaster;
