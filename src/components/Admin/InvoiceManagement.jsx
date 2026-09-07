import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Stack } from "@mui/material";
import Table from "./productManagement/Table/Table";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button as PrimeButton } from "primereact/button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { PDFViewer } from "@react-pdf/renderer";
import GlobalModal from "../../ui/GlobalModal";
import InvoicePDF from "../Customer/InvoicePDF";
import { getInvoices,getInvoiceById } from "../../services/invoiceService";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    first: 0,
  });
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [open, setOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ✅ Dummy Data (for design)
  // const fetchInvoices = useCallback(async () => {
  //   setLoading(true);

  //   const dummy = [
  //     {
  //       id: 1,
  //       invoiceNo: "INV-001",
  //       orderNo: "ORD-001",
  //       customerName: "Rahul",
  //       subTotal: 200,
  //       totalTax: 10,
  //       totalAmount: 210,
  //       invoiceDate: "2026-03-30",
  //       paymentId: "pay_123",
  //     },
  //   ];

  //   setInvoices(dummy);
  //   setTotalElements(dummy.length);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchInvoices();
  // }, [fetchInvoices]);

  useEffect(()=>{
    const fetchInvoices = async()=>{
      setLoading(true);
      try{
        const response = await getInvoices({
          customerName: globalFilter || null,
          invoiceNo: null,
          fromDate:"2026-01-01",
          toDate:"2026-12-31",
          page:pagination.page,
          size:pagination.size,
        });
        const data = response?.data?.data;

        setInvoices(data?.content || []);
        setTotalElements(data?.totalElements||0);
      }catch(error){
        console.error("Error fetching Invoices:",error);
      }finally{
        setLoading(false)
      }
    };
    fetchInvoices();
  },[pagination.page,pagination.size,globalFilter]);

  // ✅ Columns (Same like Size Master)
  const columns = [
    {
      header: "S.No",
      body: (_, options) => options.rowIndex + 1,
      style: { width: "80px" },
    },
    { field: "invoiceNo", header: "Invoice No" },
    { field: "orderNo", header: "Order No" },
    { field: "customerName", header: "Customer" },
    { field: "totalAmount", header: "Total" },
    { field: "invoiceDate", header: "Date" },

    {
      header: "Status",
      body: () => <span style={{ color: "green", fontWeight: 600 }}>Paid</span>,
    },

    {
      header: "Action",
      body: (row) => (
        <IconButton
          color="primary"
          onClick={async()=>{
            setLoading(true);
            try{
              const response = await getInvoiceById(row.invoiceId);

              const fullData = response?.data?.data;

              setSelectedInvoice(fullData);
              setOpen(true);
            }catch(error){
              console.error("Error fetching invoice Details: ",error);
            }finally{
              setLoading(false);
            }
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

      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={(e) => {
            const value = e.target.value;
            setFilters({
              global: { value, matchMode: FilterMatchMode.CONTAINS },
            });
            setGlobalFilter(value);
          }}
          placeholder="Search Invoice..."
        />
      </IconField>
    </div>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          <strong>Invoices List</strong>
        </Typography>
      </Stack>

      <Table
        value={invoices}
        columns={columns}
        filters={filters}
        header={header}
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

      <GlobalModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedInvoice(null);
        }}
        title={`Invoice Preview - ${selectedInvoice?.invoiceNo || ""}`}
        maxWidth={900}
      >
        {selectedInvoice && (
          <div
            style={{
              height: "75vh",
              border: "1px solid #eee",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <PDFViewer width="100%" height="100%">
              <InvoicePDF data={selectedInvoice} />
            </PDFViewer>
          </div>
        )}
      </GlobalModal>
    </Box>
  );
};

export default InvoiceManagement;
