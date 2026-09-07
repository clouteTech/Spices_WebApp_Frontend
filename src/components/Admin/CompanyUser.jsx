import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { OverlayPanel } from "primereact/overlaypanel";
import Table from "./productManagement/Table/Table";
import GlobalModal from "../../ui/GlobalModal";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button as PrimeButton } from "primereact/button";

const CompanyUser = () => {
  const actionRef = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Dummy users
  // const users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@gmail.com",
  //     role: "Admin",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Keerthana",
  //     email: "keerthana@gmail.com",
  //     role: "Manager",
  //     status: "Inactive",
  //   },
  // ];

  // ✅ Columns
  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "70px" },
    },

    {
      field: "name",
      header: "User",
      body: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#534c7c",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {row.name[0]}
          </div>

          <div>
            <div style={{ fontWeight: 500 }}>{row.name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{row.email}</div>
          </div>
        </div>
      ),
    },

    {
      field: "role",
      header: "Role",
      body: (row) => {
        const colors = {
          Admin: "#1976d2",
          Manager: "#ed6c02",
          Staff: "#9c27b0",
        };

        return (
          <span
            style={{
              background: "#f4f6f8",
              padding: "4px 10px",
              borderRadius: "10px",
              fontSize: "12px",
              color: colors[row.role],
              fontWeight: 600,
            }}
          >
            {row.role}
          </span>
        );
      },
    },

    {
      header: "Status",
      body: (row) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            background: row.status === "Active" ? "#e6f4ea" : "#fdecea",
            color: row.status === "Active" ? "#2e7d32" : "#d32f2f",
            fontWeight: 600,
          }}
        >
          {row.status}
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
    },
  ];

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      // EDIT
      setUsers((prev) =>
        prev.map((u) => (u.id === editId ? { ...formData, id: editId } : u)),
      );
    } else {
      // ADD
      setUsers((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    // Reset
    setOpenModal(false);
    setEditId(null);
    setFormData({
      id: null,
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  // ✅ Simple header (same like SizeForm style)
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
          placeholder="Keyword Search"
          className="p-inputtext-sm"
        />
      </IconField>
    </div>
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header (Top) */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Company Users</strong>
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditId(null);
            setFormData({
              name: "",
              email: "",
              role: "",
              status: "Active",
            });
            setOpenModal(true);
          }}
        >
          Add User
        </Button>
      </Stack>

      {/* Table */}
      <Table
        value={users}
        columns={columns}
        header={header}
        globalFilter={search}
        pagination={{ size: 10, first: 0 }}
        totalRecords={users.length}
      />

      {/* Action Menu */}
      <OverlayPanel ref={actionRef}>
        <MenuItem
          onClick={() => {
            setFormData(selectedRow);
            setEditId(selectedRow.id);
            setOpenModal(true);
            actionRef.current.hide();
          }}
        >
          <BorderColorTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            setDeleteId(selectedRow.id);
            actionRef.current.hide();
            handleDelete(); // optional direct delete
          }}
        >
          <DeleteOutlineTwoToneIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </OverlayPanel>

      <GlobalModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="Add Company User"
        actions={
          <>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              {editId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            select
            label="Role"
            fullWidth
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </TextField>
        </Stack>
      </GlobalModal>
    </Box>
  );
};

export default CompanyUser;
