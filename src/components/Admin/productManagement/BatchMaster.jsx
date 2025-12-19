import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import GlobalModal from "../../../ui/GlobalModal";
import Table from "./Table/Table";

const BatchMaster = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
      keywords:[]
    });

  // 🔹 Dummy pagination (VERY IMPORTANT to avoid error)
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  const [keywordInput, setKeywordInput] = useState("");

  // 🔹 Dummy table data
  const rows = [
    {
      id: 1,
      serialNo: 1,
      batchNo: "BP0424A",
      productName: "Black Pepper Premium",
      qtyInStock: 50,
      expiryDate: "2026-04-14",
      batchStatus: 1,
    },
  ];

  const columns = [
    { field: "serialNo", headerName: "S.No", width: 80 },
    { field: "batchNo", headerName: "Batch No", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "qtyInStock", headerName: "Quantity", flex: 1 },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1 },
    {
      field: "batchStatus",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
      ),
    },
    {
      
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Batch Master</strong>
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Batch
        </Button>
      </Stack>

      {/* TABLE */}
      <Table
        rows={rows}
        columns={columns}
        pagination={pagination}
        totalElements={rows.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        loading={false}
      />

      {/* ADD FORM (UI ONLY) */}
      <GlobalModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Add Batch"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained">Save</Button>
          </>
        }
      >
        <Stack spacing={2}>
          <TextField label="Batch No" fullWidth />
          <Stack spacing={2}>
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Enter Product"
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
                              (_, i) => i !== index
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

          <TextField
            type="date"
            label="Manufactured Date"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            label="Expiry Date"
            InputLabelProps={{ shrink: true }}
          />

          <TextField label="Quantity" type="number" fullWidth />
        </Stack>
      </GlobalModal>
    </Box>
  );
};

export default BatchMaster;
