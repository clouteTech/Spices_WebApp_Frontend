// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   FormControl,
//   FormLabel,
//   Radio,RadioGroup,FormControlLabel
// } from "@mui/material";
// import axios from "axios";
// import instance from "../../services/api";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

// const CompanyDetails = () => {
//   const [logo, setLogo] = useState(null);
//   const { companyId: idFromParams } = useParams();
//   const companyId = idFromParams || "1";

//   const [generalInfo, setGeneralInfo] = useState({
//     companyName: "",
//     companyEmail: "",
//     cinNumber: "",
//     companyPhoneNo: "",
//     customerSupportEmail: "",
//     customerSupportMobileNumber: "",
//     companyLogo:"",
//   });

//   const [addressInfo, setAddressInfo] = useState({
//     address_1: "",
//     address_2: "",
//     businessAddress: "",
//     gstNo: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//   });

//   useEffect(() => {
//     console.log("companyId value in useEffect:", companyId);
//     if (!companyId) return;
//     const fetchGeneralInfo = async () => {
//       try {
//         debugger;
//         console.log("Fetching company info for ID:", companyId);
//         console.log("Token used:", sessionStorage.getItem("token"));
//         const res = await instance.get(
//           `company/getcompanydetails/${companyId}`
//         );
//         console.log(res.data);
//         setGeneralInfo(res.data);
//         setAddressInfo(res.data);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error("Failed to fetch company details");
//       }
//     };
//     fetchGeneralInfo();
//   }, [companyId]);

//   // ---------- General Info Handlers ----------
//   const handleGeneralChange = (e) => {
//     const { name, value } = e.target;
//     setGeneralInfo({
//       ...generalInfo,
//       [name]: value,
//     });
//   };

//   const handleLogoChange = (e) => {
//     setLogo(e.target.files[0]);
//   };

//   const handleGeneralSubmit = async (e) => {
//     e.preventDefault();
//     if (!companyId) return;

//     try {
//       const res = await instance.put(
//         `/company/updatecompany/${companyId}`,
//         generalInfo
//       );
//       console.log("Update Success:", res.data);
//       toast.success("Company Details Updated Successfully");
//     } catch (error) {
//       console.error("Update Error:", error);
//       toast.error("Failed to Update Company Details");
//     }
//   };

//   const handleLogoUpload = async () => {
//     if (!logo || !companyId) {
//       return;
//     }
//     const formData = new FormData();
//     formData.append("companyLogo", logo);

//     try {
//       const res = await instance.post(
//         `/company/uploadlogo/${companyId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       toast.success("Logo Uploaded Successfully!");
//     } catch (error) {
//       console.error("Logo Upload Error:", error);
//       toast.error("Failed to upload logo");
//     }
//   };

//   // ---------- Address Info Handlers ----------
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setAddressInfo({
//       ...addressInfo,
//       [name]: value,
//     });
//   };

//   const handleAddressSubmit = async(e) => {
//      e.preventDefault();
//      if (!companyId) return;

//      try {
//        // Convert businessAddress to boolean if needed
//        const payload = {
//          ...addressInfo,
//          businessAddress: addressInfo.businessAddress === "yes",
//        };

//        const res = await instance.put(
//          `company/update/companyaddress/${companyId}`,
//          payload
//        );

//        console.log("Address Update Success:", res.data);
//        toast.success("Address Updated Successfully!");
//      } catch (error) {
//        console.error("Address Update Error:", error);
//        toast.error("Failed to update address");
//      }
//    };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         COMPANY DETAILS
//       </Typography>

//       {/* <Grid container spacing={2}> */}
//       {/* <Grid item xs={12} md={6}> */}
//       {/* <Paper sx={{ p: 3 }}> */}
//       {/* <Box
//               sx={{
//                 p: 3,
//                 border: "1px solid #ddd",
//                 borderRadius: 2,
//                 width: "100%",
//               }}
//             > */}
//       <Box
//         display="grid"
//         gridTemplateColumns="1fr 360px"
//         gap={3}
//         sx={{ alignItems: "start" }}
//       >
//         {/* LEFT SIDE */}
//         <Box>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               mb: 3,
//               borderRadius: 2,
//               background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               General Info
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleGeneralSubmit}
//               sx={{ display: "grid", gridTemplate: "1fr 360px" }}
//             >
//               <Grid container spacing={2} alignItems="flex-start">
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Company Name"
//                     name="companyName"
//                     value={generalInfo.companyName}
//                     onChange={handleGeneralChange}
//                     required
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Company Email"
//                     name="companyEmail"
//                     type="email"
//                     value={generalInfo.companyEmail}
//                     onChange={handleGeneralChange}
//                     // sx={{ width: 580 }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="CIN Number"
//                     name="cinNumber"
//                     value={generalInfo.cinNumber}
//                     onChange={handleGeneralChange}
//                     // sx={{ width: 580 }}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Company Phone No."
//                     name="companyPhoneNo"
//                     value={generalInfo.companyPhoneNo}
//                     onChange={handleGeneralChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Support Email"
//                     name="customerSupportEmail"
//                     value={generalInfo.customerSupportEmail}
//                     onChange={handleGeneralChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Support Mobile No."
//                     name="customerSupportMobileNumber"
//                     value={generalInfo.customerSupportMobileNumber}
//                     onChange={handleGeneralChange}
//                     // sx={{ width: 580 }}
//                     fullWidth
//                   />
//                 </Grid>
//               </Grid>

//               {/* </Box> */}
//               <Box sx={{ textAlign: "right", mt: 2 }}>
//                 <Button type="submit" variant="contained" color="secondary">
//                   Save General Info
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Box>

//         {/* </Paper> */}
//         {/* </Grid> */}
//         {/* </Grid> */}

//         {/* <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3 }}>
//             <Box
//               sx={{
//                 p: 3,
//                 border: "1px solid #ddd",
//                 borderRadius: 2,
//                 width: "100%",
//               }}
//             > */}

//         <Box>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               textAlign: "center",
//               background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Company Logo
//             </Typography>
//             <Button
//               variant="outlined"
//               component="label"
//               sx={{ borderRadius: "50px" }}
//             >
//               Upload Logo
//               <input
//                 type="file"
//                 name="companyLogo"
//                 accept="image/*"
//                 hidden
//                 onChange={handleLogoChange}
//               />
//             </Button>
//             {generalInfo.companyLogo && (
//               <Typography variant="body2" color="textSecondary">
//                 Selected: {logo.name}
//               </Typography>
//             )}
//             <Box sx={{ textAlign: "right", mt: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleLogoUpload}
//               >
//                 Save Logo
//               </Button>
//             </Box>
//           </Paper>
//         </Box>

//         <Box>
//           <Paper
//             elevation={2}
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Address Info
//             </Typography>

//             <Box component="form" onSubmit={handleAddressSubmit}>
//               <Grid container spacing={2} alignItems="flex-start">
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Address Line 1"
//                     name="address_1"
//                     value={addressInfo.address_1}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Address Line 2"
//                     name="address_2"
//                     value={addressInfo.address_2}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>

//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="GST NUMBER"
//                     name="gstNo"
//                     value={addressInfo.gstNo}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>

//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="City"
//                     name="city"
//                     value={addressInfo.city}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="State"
//                     name="state"
//                     value={addressInfo.state}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Pincode"
//                     name="pincode"
//                     value={addressInfo.pincode}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//                 <Grid size={{ xs: 5.8 }}>
//                   <TextField
//                     label="Country"
//                     name="country"
//                     value={addressInfo.country}
//                     onChange={handleAddressChange}
//                     fullWidth
//                     // sx={{ width: 580 }}
//                   />
//                 </Grid>
//               </Grid>

//               <Box sx={{ textAlign: "right", mt: 2 }}>
//                 <Button type="submit" variant="contained" color="secondary">
//                   Save Address Info
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CompanyDetails;

import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button, Box, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import {
  getCompanyDetails,
  updateCompanyDetails,
} from "../../services/company";

const CompanyDetails = () => {
  const { showToast } = useToast();
  const { companyId: idFromParams } = useParams();
  const companyId = idFromParams || "1"; // fallback for now

  const [logo, setLogo] = useState(null);

  const [upiQrFile, setUpiQrFile] = useState(null);

  // const [generalInfo, setGeneralInfo] = useState({
  //   companyName: "",
  //   companyEmail: "",
  //   cinNumber: "",
  //   companyPhoneNo: "",
  //   customerSupportEmail: "",
  //   customerSupportMobileNumber: "",
  //   companyLogo: "",
  // });

  // const [addressInfo, setAddressInfo] = useState({
  //   address_1: "",
  //   address_2: "",
  //   gstNo: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  //   country: "",
  //   businessAddress: false,
  // });

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyEmail: "",
    companyPhoneNo: "",
    cinNumber: "",
    customerSupportEmail: "",
    customerSupportMobileNumber: "",

    address_1: "",
    address_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gstNo: "",
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    upiId: "",
    upiQrImage: "",
  });

  // -------------------- Fetch Company Data --------------------
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await getCompanyDetails();

        if (res.data.status === 200) {
          setCompanyForm({
            companyName: res.data.data.companyName || "",
            companyEmail: res.data.data.companyEmail || "",
            companyPhoneNo: res.data.data.companyPhoneNo || "",
            cinNumber: res.data.data.cinNumber || "",
            customerSupportEmail: res.data.data.customerSupportEmail || "",
            customerSupportMobileNumber:
              res.data.data.customerSupportMobileNumber || "",

            address_1: res.data.data.address_1 || "",
            address_2: res.data.data.address_2 || "",
            city: res.data.data.city || "",
            state: res.data.data.state || "",
            pincode: res.data.data.pincode || "",
            country: res.data.data.country || "",
            gstNo: res.data.data.gstNo || "",
          });
        }
      } catch {
        showToast("Failed to load company details");
      }
    };

    fetchCompany();
  }, []);

  // -------------------- Handlers --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankChange = (e) => {
    setBankInfo({ ...bankInfo, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleQrChange = (e) => setUpiQr(e.target.files[0]);

  // -------------------- Submit Handlers --------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateCompanyDetails(companyForm);

      if (res.data.status === 200) {
        showToast("Company details updated successfully", "success");
      }
    } catch {
      showToast("Failed to update company details", "error");
    }
  };

  const handleLogoUpload = async () => {
    if (!logo) {
      toast.error("Please select a logo file first");
      return;
    }
    const formData = new FormData();
    formData.append("companyLogo", logo);

    try {
      const res = await instance.post(
        `/company/uploadlogo/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (res.data.status === 200) {
        toast.success("Logo Uploaded Successfully!");
      } else {
        toast.error(res.data.msg || "Failed to upload logo");
      }
    } catch (error) {
      console.error("Logo Upload Error:", error);
      toast.error("Failed to upload logo");
    }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...bankInfo };

      const res = await instance.put(
        `/company/update/bankdetails/${companyId}`,
        payload,
      );

      if (res.data.status === 200) {
        toast.success("Bank Details Updated Successfully!");
      } else {
        toast.error(res.data.msg || "Failed to update bank details");
      }
    } catch (error) {
      console.error("Bank Update Error:", error);
      toast.error("Failed to update bank details");
    }
  };

  const handleQrUpload = async () => {
    if (!upiQrFile) {
      toast.error("Please select a QR image first");
      return;
    }

    const formData = new FormData();
    formData.append("upiQrImage", upiQrFile);

    try {
      const res = await instance.post(
        `/company/uploadupi/${companyId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.data.status === 200) {
        toast.success("UPI QR Uploaded Successfully!");
      } else {
        toast.error(res.data.msg || "Failed to upload QR");
      }
    } catch (error) {
      console.error("QR Upload Error:", error);
      toast.error("Failed to upload QR");
    }
  };

  // -------------------- UI --------------------
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        COMPANY DETAILS
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="grid"
        gridTemplateColumns="1fr 360px"
        gap={3}
        sx={{ alignItems: "start" }}
      >
        {/* ---------------- LEFT SIDE ---------------- */}
        <Box>
          {/* -------- General Info -------- */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              <strong>General Info</strong>
            </Typography>

            <Grid container spacing={2}>
              {[
                { label: "Company Name", name: "companyName" },
                { label: "Company Email", name: "companyEmail", type: "email" },
                { label: "CIN Number", name: "cinNumber" },
                { label: "Company Phone No.", name: "companyPhoneNo" },
                { label: "Support Email", name: "customerSupportEmail" },
                {
                  label: "Support Mobile No.",
                  name: "customerSupportMobileNumber",
                },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    value={companyForm[field.name] || ""}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>

            {/* -------- Address Info -------- */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                <strong>Address Info</strong>
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {[
                { label: "Address Line 1", name: "address_1" },
                { label: "Address Line 2", name: "address_2" },
                { label: "GST Number", name: "gstNo" },
                { label: "City", name: "city" },
                { label: "State", name: "state" },
                { label: "Pincode", name: "pincode" },
                { label: "Country", name: "country" },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={companyForm[field.name] || ""}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Save Company Details
              </Button>
            </Box>
          </Paper>

          {/* -------- Bank Details (SEPARATE) -------- */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              mt: 3,
              background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Bank Details
            </Typography>

            <Grid container spacing={2}>
              {[
                { label: "Bank Name", name: "bankName" },
                { label: "Account Holder Name", name: "accountHolderName" },
                { label: "Account Number", name: "accountNumber" },
                { label: "IFSC Code", name: "ifscCode" },
                { label: "Branch", name: "branch" },
                { label: "UPI ID", name: "upiId" },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={bankInfo[field.name] || ""}
                    onChange={handleBankChange}
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="contained" onClick={handleBankSubmit}>
                Save Bank Details
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <Box>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              textAlign: "center",
              background: "linear-gradient(135deg, #e7e1e6ff, #d3bdd4ff)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Company Logo
            </Typography>

            <Button variant="outlined" component="label">
              Upload Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoChange}
              />
            </Button>

            {logo && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {logo.name}
              </Typography>
            )}

            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="contained" onClick={handleLogoUpload}>
                Save Logo
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
