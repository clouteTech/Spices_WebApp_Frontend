import React from "react";
import {
  Container,
  Card,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Button,
} from "@mui/material";

import logo2 from "../../assets/logo2.png";
import InvoicePDF from "./InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Invoice = ({ data }) => {


  const formatAddress = (address) => {
    if (!address) return {};

    const parts = address.split(",").map((item) => item.trim());

    const [name, phone, line1, line2, city, statePincode, country] = parts;

    let state = "";
    let pincode = "";

    if (statePincode) {
      const splitState = statePincode.split("-");
      state = splitState[0]?.trim();
      pincode = splitState[1]?.trim();
    }

    return {
      name,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
      country,
    };
  };
  
  const invoiceNumber = data.invoiceNo || "";
  const currentDate = data?.invoiceDate || new Date().toLocaleDateString();
  const customerName = data?.customerName || "";
  const customerPhone = data?.customerPhone || "";
  const shippingAddressRaw = data?.shippingAddress || "";
  const billingAddressRaw = data?.billingAddress || "";
  const shipping = formatAddress(shippingAddressRaw);
  const billing = formatAddress(billingAddressRaw);
  const processItems = data?.items || [];
  const subTotal = data?.subTotal || 0;
  const taxAmount = data?.taxAmount || 0;
  const total = data?.totalAmount || 0;

  const isSameState = billing.state === shipping.state;
  let cgstTotal = 0;
  let sgstTotal = 0;
  let igstTotal = 0;

  if(isSameState){
    cgstTotal = (taxAmount/2).toFixed(2);
    sgstTotal = (taxAmount/2).toFixed(2);
    igstTotal = "0.00";
  }else{
    igstTotal = taxAmount.toFixed(2);
    cgstTotal = "0.00";
    sgstTotal = "0.00";
  }

  const downloadInvoicePDF = () => {
    alert("PDF download will be connected later");
  };

  // const billingAddress = profile.billingAddressLine1
  //   ? {
  //       line1: profile.billingAddressLine1,
  //       line2: profile.billingAddressLine2,
  //       line3: profile.billingAddressLine3,
  //     }
  //   : {
  //       line1: profile.addressLine1,
  //       line2: profile.addressLine2,
  //       line3: profile.addressLine3,
  //     };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 4 }}>
        {/* HEADER */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <img src={logo2} alt="logo2" width="130" />

          <Box textAlign="right">
            <Typography>
              <strong>Invoice No:</strong> {invoiceNumber}
            </Typography>

            <Typography>
              <strong>Date:</strong> {currentDate}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* CUSTOMER DETAILS */}

        <Typography variant="h6" gutterBottom>
          Customer Details
        </Typography>

        <Typography>
          <strong>Name:</strong> {customerName}
        </Typography>

        <Typography>
          <strong>Phone:</strong> {customerPhone}
        </Typography>

        <Typography>
          <strong>GSTIN:</strong> 29ABCDE1JJKDS
        </Typography>

        {/* ADDRESSES */}

        <Box display="flex" justifyContent="space-between" mt={1} gap={2}>
          {/* SHIPPING ADDRESS */}
          {/* <Box>
            <Typography variant="subtitle1">
              <strong>Shipping Address</strong>
            </Typography>
            <Typography>{profile.addressLine1}</Typography>
            <Typography>{profile.addressLine2}</Typography>
            <Typography>{profile.addressLine3}</Typography>
          </Box> */}

          {/* BILLING ADDRESS */}
          <Box sx={{width:"50%"}}>
            <Typography variant="subtitle1">
              <strong>Billing Address</strong>
            </Typography>
            <Typography>{billing.name}</Typography>
            <Typography>
              {billing.line1},{billing.line2}
            </Typography>
            <Typography>
              {billing.city},{billing.state}-{billing.pincode}
            </Typography>
            <Typography>{billing.country}</Typography>
            <Typography>{billing.phone}</Typography>
          </Box>
          <Box sx={{width:"50%"}}>
            <Typography variant="subtitle1">
              <strong>Shipping Address</strong>
            </Typography>
            <Typography>{shipping.name}</Typography>
            <Typography>
              {shipping.line1},{shipping.line2}
            </Typography>
            <Typography>
              {shipping.city},{shipping.state}-{shipping.pincode}
            </Typography>
            <Typography>{shipping.country}</Typography>
            <Typography>{shipping.phone}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* PRODUCTS TABLE */}

        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Package Type</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Taxable</TableCell>
              {isSameState ? (
                <>
                  <TableCell>CGST</TableCell>
                  <TableCell>SGST</TableCell>
                </>
              ) : (
                <TableCell>IGST</TableCell>
              )}
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {processItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.packageType}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>₹{item.unitPrice}</TableCell>
                <TableCell>₹{item.unitPrice * item.quantity}</TableCell>
                {isSameState ? (
                  <>
                    <TableCell>₹{(item.taxAmount / 2).toFixed(2)}</TableCell>
                    <TableCell>₹{(item.taxAmount / 2).toFixed(2)}</TableCell>
                  </>
                ) : (
                  <TableCell>₹{item.taxAmount.toFixed(2)}</TableCell>
                )}
                <TableCell>₹{item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 3 }} />

        {/* GST SUMMARY */}

        <Box display="flex" justifyContent="flex-end">
          <Box textAlign="right">
            <Typography>
              <strong>Taxable Total:</strong> ₹{subTotal}
            </Typography>

            <Typography>
              <strong>CGST(2.5%):</strong> ₹{cgstTotal}
            </Typography>

            <Typography>
              <strong>SGST(2.5%):</strong> ₹{sgstTotal}
            </Typography>

            {/* <Typography>
              <strong>IGST:</strong> ₹{igstTotal}
            </Typography> */}

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6">
              <strong>Grand Total: ₹{total}</strong>
            </Typography>
          </Box>
        </Box>

        {/* DOWNLOAD BUTTON */}

        <Box mt={4} textAlign="center">
          <PDFDownloadLink
            document={<InvoicePDF data={data} />}
            fileName={`invoice-${invoiceNumber}.pdf`}
          >
            {({ loading }) => (
              <Button variant="contained" color="primary">
                {loading ? "Generating PDF..." : "Download Invoice PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </Box>
      </Card>
    </Container>
  );
};

export default Invoice;
