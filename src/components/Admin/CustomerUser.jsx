import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import Table from "./productManagement/Table/Table";
import CustomerStats from "./CustomerStats";
import { customerUser } from "../../services/userManagement";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button as PrimeButton } from "primereact/button";

const CustomerUser = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  // {
  //   customerId: 1,
  //   firstName: "Rahul",
  //   lastName: "V",
  //   contactEmail: "rahul@gmail.com",
  //   mobileNumber: "9876543210",
  //   userActive: true,
  //   createdAt: "2026-03-24T15:23:48.253963",
  //   totalOrders: 12,
  //   totalAddresses: 3,
  // },
  // {
  //   customerId: 2,
  //   firstName: "Keerthana",
  //   lastName: "G",
  //   contactEmail: "keerthu@gmail.com",
  //   mobileNumber: "9876500000",
  //   userActive: false,
  //   createdAt: "2026-03-25T10:20:00.000000",
  //   totalOrders: 5,
  //   totalAddresses: 2,
  // },
  // {
  //   customerId: 3,
  //   firstName: "Ragu",
  //   lastName: "V",
  //   contactEmail: "ragu@gmail.com",
  //   mobileNumber: "9894563555",
  //   userActive: true,
  //   createdAt: "2026-03-30T19:18:10.283027",
  //   totalOrders: 0,
  //   totalAddresses: 1,
  // },
  const [globalFilter, setGlobalFilter] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setTabIndex(0);
    setOpenDialog(true);
  };

  const getCustomer = async () => {
    setLoading(true);
    const payload = {
      search: globalFilter,
      customerStatus: true,
      profileCompleted: true,
      createdFrom: "",
      createdTo: "",
      page: pagination.page,
      size: pagination.size,
    };

    try {
      const res = await customerUser(payload);

      console.log("FULL RESPONSE 👉", res);
      console.log("DATA 👉", res.data);
      console.log("INNER DATA 👉", res.data?.data);
      console.log("CUSTOMERS 👉", res.data?.data?.content);

      setCustomers(res?.data?.data?.content || []);
      setTotalRecords(res?.data?.data?.totalElements || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [pagination.page, pagination.size]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPagination((prev) => ({ ...prev, page: 0 }));
      getCustomer();
    }, 500);

    return () => clearTimeout(delay);
  }, [globalFilter]);

  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    {
      field: "firstName",
      header: "Name",
      body: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: "contactEmail",
      header: "Email",
    },
    {
      field: "mobileNumber",
      header: "Mobile",
    },
    {
      field: "totalOrders",
      header: "Orders",
    },
    {
      field: "totalAddresses",
      header: "Addresses",
    },
    {
      field: "userActive",
      header: "Status",
      body: (row) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            color: row.userActive ? "#2e7d32" : "#d32f2f",
            backgroundColor: row.userActive ? "#e8f5e9" : "#ffebee",
          }}
        >
          {row.userActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "createdAt",
      header: "Created Date",
      body: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Action",
      body: (row) => (
        <IconButton
          color="primary"
          onClick={() => {
            handleView(row);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

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
    <Box sx={{ p: 3 }}>
      {/* 🔥 Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1,
          mb: 3,
        }}
      >
        <CustomerStats customers={customers} />
      </Box>

      {/* 🔍 Search */}
      {/* <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search customers..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Box> */}

      {/* 📊 Table */}
      <Table
        value={customers}
        columns={columns}
        loading={false}
        pagination={pagination}
        totalRecords={customers?.length || 0}
        onPageChange={setPagination}
        globalFilter={globalFilter}
        header={header}
        dataKey="customerId"
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 1,
            marginLeft: "240px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            borderBottom: "1px solid #eee",
            pb: 2,
          }}
        >
          Customer Details
        </DialogTitle>

        <DialogContent>
          {/* Tabs */}
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            sx={{
              mb: 3,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: "600",
                fontSize: "14px",
                color: "#666",
              },
              "& .Mui-selected": {
                color: "#354f69  !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "linear-gradient(90deg, #354f69, #42a5f5)",
                height: "3px",
                borderRadius: "3px",
              },
            }}
          >
            <Tab label="Customer Info" />
            <Tab label="Orders" />
          </Tabs>

          {/* TAB 1 */}
          {tabIndex === 0 && (
            <Box
              sx={{
                mt: 2,
                p: 3,
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #f0f0f0",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
              >
                👤 Customer Information
              </Typography>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#888" }}>
                    Full Name
                  </Typography>
                  <Typography sx={{ fontWeight: "600", fontSize: "15px" }}>
                    {selectedCustomer?.firstName} {selectedCustomer?.lastName}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#888" }}>
                    Email
                  </Typography>
                  <Typography fontWeight="bold">
                    {selectedCustomer?.contactEmail}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#888" }}>
                    Mobile
                  </Typography>
                  <Typography sx={{ fontWeight: "600", fontSize: "15px" }}>
                    {selectedCustomer?.mobileNumber}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary">Status</Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: selectedCustomer?.userActive
                        ? "#e6f4ea"
                        : "#fdecea",
                      color: selectedCustomer?.userActive
                        ? "#2e7d32"
                        : "#d32f2f",
                    }}
                  >
                    ● {selectedCustomer?.userActive ? "Active" : "Inactive"}
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontSize: "13px", color: "#888" }}>
                    📍 Address
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      background: "#fafafa",
                      border: "1px solid #eee",
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedCustomer?.address
                      ? selectedCustomer.address
                      : "No address available"}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* TAB 2 */}
          {tabIndex === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📦 Orders
              </Typography>

              {/* Each Order Card */}
              {[1, 2, 3].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: "14px",
                    background: "#ffffff",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* Left */}
                  <Box>
                    <Typography fontWeight="bold">
                      Order #ORD-10{index}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      12 Apr 2026
                    </Typography>
                    <Typography sx={{ mt: 1 }}>₹1200</Typography>
                  </Box>

                  {/* Right */}
                  <Box sx={{ textAlign: "right" }}>
                    {/* Status */}
                    <Box
                      sx={{
                        mb: 1,
                        px: 2,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "inline-block",
                        color: index % 2 === 0 ? "#2e7d32" : "#ed6c02",
                        backgroundColor:
                          index % 2 === 0 ? "#e8f5e9" : "#fff3e0",
                      }}
                    >
                      {index % 2 === 0 ? "Paid" : "Pending"}
                    </Box>

                    {/* Button */}
                    <br />
                    <button
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        border: "none",
                        background:
                          "linear-gradient(45deg, #354f69ff, #42a5f5)",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      View Invoice
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CustomerUser;
