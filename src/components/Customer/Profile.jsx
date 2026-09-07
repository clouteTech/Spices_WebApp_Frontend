// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     const saved = sessionStorage.getItem("userProfile");
//     if (saved) {
//       setProfile(JSON.parse(saved));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     if (!profile.name || !profile.email || profile.phone) {
//       toast.error("Please fill all the required fields");
//       return;
//     }
//     sessionStorage.setItem("userProfile", JSON.stringify(profile));
//     toast.success("Profile Saved Successfully");
//   };

//   return (
//     <Container maxWidth="sm" sx={{ pt: 10, pb: 5 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Customer Profile
//         </Typography>
//         <Box component="form" noValidate autoComplete="off">
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             value={profile.name}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Phone"
//             type="tel"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Pincode"
//             type="number"
//             name="pincode"
//             value={profile.pincode}
//             onChange={handleChange}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 3 }}
//             onClick={handleSave}
//           >
//             Save Profile
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Profile;

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";

// const CustomerProfile = () => {
//   const [profile, setProfile] = useState({
//     firstName: "Keerthana",
//     lastName: "Gurumoorthy",
//     gender: "",
//     email: "keerthana@example.com",
//     phone: "+91 95855 74201",
//   });

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   return (
//     <Grid container spacing={3} sx={{ mt: 2 }}>
//       {/* Sidebar */}
//       <Grid item xs={12} md={3}>
//         <Card sx={{ p: 2 }}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <Avatar sx={{ width: 64, height: 64, mb: 1 }}>
//               <PersonIcon fontSize="large" />
//             </Avatar>
//             <Typography variant="h6">Hello, {profile.firstName}</Typography>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Account Settings
//           </Typography>
//           <Typography color="primary">Profile Information</Typography>
//           <Typography>Manage Addresses</Typography>
//           <Typography>PAN Card Information</Typography>

//           <Divider sx={{ my: 2 }} />

//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Payments
//           </Typography>
//           <Typography>Gift Cards</Typography>
//           <Typography>Saved UPI</Typography>
//           <Typography>Saved Cards</Typography>
//         </Card>
//       </Grid>

//       {/* Profile Info Section */}
//       <Grid item xs={12} md={9}>
//         <Card>
//           <CardContent>
//             <Box display="flex" justifyContent="space-between" mb={2}>
//               <Typography variant="h6">Personal Information</Typography>
//               <Button variant="outlined" size="small">
//                 Edit
//               </Button>
//             </Box>

//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   value={profile.firstName}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   value={profile.lastName}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="subtitle2">Your Gender</Typography>
//                 <RadioGroup
//                   row
//                   name="gender"
//                   value={profile.gender}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="Male"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     value="Female"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                 </RadioGroup>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   name="email"
//                   value={profile.email}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Mobile Number"
//                   name="phone"
//                   value={profile.phone}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default CustomerProfile;

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GlobalModal from "../../ui/GlobalModal";
import { useToast } from "../../context/ToastContext";
import {
  addCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  addAddress,
  updateAddress,
  getAddressList,
  deleteAddress,
} from "../../services/customer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerProfile = () => {
  /* ---------------- PROFILE STATE ---------------- */
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const { showToast } = useToast();

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editAddressId, setEditAddressId] = useState(null);

  /* ---------------- ADDRESS STATE ---------------- */
  const [addresses, setAddresses] = useState([]);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const [addressData, setAddressData] = useState({
    isDefault: false,
    businessAddress: true,
    companyName: "",
    receiverName: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    receiverPhone: "",
    gstNo: "",
  });

  const resetAddressForm = () => {
    setAddressData({
      isDefault: false,
      businessAddress: false,
      receiverName: "",
      address_1: "",
      address_2: "",
      state: "",
      pincode: "",
      country: "",
      receiverPhone: "",
    });
  };

  const loadCustomer = async () => {
    try {
      const res = await getCustomer();

      console.log("API response:", res.data.data);

      // backend response structure
      const customer = res.data?.data;
      console.log("customer:", customer);

      if (!customer) {
        alert("No customer found");
        return;
      }

      setUser({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        mobileNumber: customer.mobileNumber || "",
      });

      setProfileData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        mobileNumber: customer.mobileNumber || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load customer");
    }
  };

  const loadAddresses = async () => {
    try {
      const res = await getAddressList();

      console.log("API response:", res.data.data);

      // 🔥 THIS LINE FIXES EVERYTHING
      const data = res?.data?.data;
      console.log("data:", data);

      // Ensure addresses is ALWAYS an array
      const addressList = Array.isArray(data) ? data : data ? [data] : [];

      setAddresses(addressList);
    } catch (err) {
      console.error("Error loading addresses:", err);
      setAddresses([]);
    }
  };

  useEffect(() => {
    loadCustomer();
    loadAddresses();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveProfile = async () => {
    try {
      const payload = {
        firstName: profileData.firstName.split(" ")[0],
        lastName: profileData.lastName.split(" ")[0],
        mobileNumber: profileData.mobileNumber,
        email: profileData.email,
      };

      await updateCustomer(payload);
      setOpenProfileModal(false);
      loadCustomer();
      showToast("Profile Updated Successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to save profile", "error");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveAddress = async () => {
    try {
      // 🔒 Frontend validation
      if (!addressData.receiverName?.trim()) {
        showToast("Receiver name is required", "warning");
        return;
      }

      if (!addressData.receiverPhone?.trim()) {
        showToast("Receiver phone number is required", "warning");
        return;
      }

      if (addressData.businessAddress && !addressData.gstNo?.trim()) {
        showToast("GST number is required for business address", "warning");
        return;
      }

      const payload = {
        receiverName: addressData.receiverName,
        receiverPhone: addressData.receiverPhone,
        address_1: addressData.address_1 || "",
        address_2: addressData.address_2 || "",
        city: addressData.city || "",
        state: addressData.state || "",
        pincode: addressData.pincode || "",
        country: addressData.country || "India",
        defaultAddress: addressData.isDefault,
        businessAddress: addressData.businessAddress,
        gstNo: addressData.businessAddress ? addressData.gstNo : null,
        status:"true",
      };

      if (editAddressId) {
        await updateAddress({ addressId:editAddressId, ...payload });
        showToast("Address updated successfully", "success");
      } else {
        await addAddress(payload);
        showToast("Address added successfully", "success");
      }

      setOpenAddressModal(false);
      setEditAddressId(null);
      resetAddressForm();
      loadAddresses();
    } catch (err) {
      console.error(err);
      showToast("Failed to save address", "error");
    }
  };

  const handleEditAddress = (addr) => {
    setAddressData({
      receiverName: addr.receiverName,
      receiverPhone: addr.receiverPhone,
      address_1: addr.address_1,
      address_2: addr.address_2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country,
      isDefault:addr.defaultAddress,
      businessAddress: addr.businessAddress,
      gstNo: addr.gstNo || "",
    });

    setEditAddressId(addr.addressId);
    setOpenAddressModal(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      showToast("Address deleted Successfully", "success");
      loadAddresses();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete address", "error");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Profile
      </Typography>

      {/* PROFILE CARD */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            {profileData?.firstName} {profileData?.lastName}
          </Typography>
          <IconButton size="small" onClick={() => setOpenProfileModal(true)}>
            <EditIcon />
          </IconButton>
        </Box>

        <Typography color="text.secondary" mt={2}>
          Email
        </Typography>
        <Typography>{user.email}</Typography>

        <Typography color="text.secondary" mt={2}>
          Phone Number
        </Typography>
        <Typography>{profileData.mobileNumber}</Typography>
      </Card>

      {/* ADDRESS CARD */}
      <Card sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Addresses</Typography>
          <Button onClick={() => setOpenAddressModal(true)}>+ Add</Button>
        </Box>

        <Divider />

        {addresses.length === 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              display: "flex",
              gap: 1,
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
            <Typography>No addresses added</Typography>
          </Box>
        )}

        {addresses.length > 0 &&
          // addresses.map((addr, index) => (
          //   <Card key={index} sx={{ p: 2, mt: 2 }}>
          //     <Typography fontWeight={600}>
          //       {addr.receiverName}
          //       {addr.isDefault && " (Default)"}
          //     </Typography>
          //     <Typography>
          //       {addr.address_1}, {addr.address_2}, {addr.city}, {addr.state} -{" "}
          //       {addr.pincode}
          //     </Typography>
          //     <Typography>Phone: {addr.receiverPhone}</Typography>
          //   </Card>
          // ))}
          addresses.map((addr, index) => (
            <Card
              key={index}
              sx={{
                p: 2,
                mt: 2,
                border: addr.defaultAddress
                  ? "2px solid #4caf50"
                  : "1px solid #e0e0e0",
                backgroundColor: addr.defaultAddress ? "#f1f8e9" : "#fff",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight={600}>
                      {addr.receiverName}
                    </Typography>

                    {addr.defaultAddress && (
                      <Box
                        sx={{
                          backgroundColor: "#e8f5e9",
                          color: "#2e7d32",
                          fontSize: "12px",
                          px: 1,
                          py: 0.3,
                          borderRadius: "4px",
                          fontWeight: 500,
                        }}
                      >
                        Default Address
                      </Box>
                    )}
                  </Box>

                  <Typography>
                    {addr.address_1}, {addr.address_2}
                  </Typography>

                  <Typography>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </Typography>

                  <Typography>Phone: {addr.receiverPhone}</Typography>
                </Box>

                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEditAddress(addr)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteAddress(addr.addressId)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
      </Card>

      {/* EDIT PROFILE MODAL */}
      <GlobalModal
        open={openProfileModal}
        handleClose={() => setOpenProfileModal(false)}
        title="Edit Profile"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={saveProfile}>
              Save
            </Button>
          </>
        }
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Stack spacing={1} direction="row">
            <TextField
              label="FirstName"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              sx={{ width: 350 }}
            />
            <TextField
              label="LastName"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              sx={{ width: 350 }}
            />
          </Stack>
          <TextField
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            fullWidth
          />

          <TextField
            label="Phone"
            name="mobileNumber"
            value={profileData.mobileNumber}
            onChange={handleProfileChange}
            disabled
          />
        </Box>
      </GlobalModal>

      {/* ADD ADDRESS MODAL */}
      <GlobalModal
        open={openAddressModal}
        handleClose={() => setOpenAddressModal(false)}
        title={editAddressId ? "Edit Address" : "Add Address"}
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={saveAddress}>
              {editAddressId ? "Update" : "Save"}
            </Button>
          </>
        }
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="isDefault"
                checked={addressData.isDefault}
                onChange={handleAddressChange}
              />
            }
            label="This is my default address"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="businessAddress"
                checked={addressData.businessAddress}
                onChange={handleAddressChange}
              />
            }
            label="This is a business address"
          />

          {addressData.businessAddress && (
            <>
              <TextField
                label="GST Number"
                name="gstNo"
                value={addressData.gstNo}
                onChange={handleAddressChange}
                fullWidth
              />
              <TextField
                label="Company Name"
                name="companyName"
                value={addressData.companyName}
                onChange={handleAddressChange}
                fullWidth
              />
            </>
          )}

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Receiver Name"
              name="receiverName"
              value={addressData.receiverName}
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              label="Phone number"
              name="receiverPhone"
              value={addressData.receiverPhone}
              onChange={handleAddressChange}
            />
          </Box>

          <TextField
            label="Address Line1"
            name="address_1"
            value={addressData.address_1}
            onChange={handleAddressChange}
          />

          <TextField
            label="Address Line2"
            name="address_2"
            value={addressData.address_2}
            onChange={handleAddressChange}
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={addressData.city}
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={addressData.state}
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              label="PIN Code"
              name="pincode"
              value={addressData.pincode}
              onChange={handleAddressChange}
            />
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={addressData.country}
              onChange={handleAddressChange}
            />
          </Box>

          {/* <Button variant="contained" onClick={saveAddress}>
            Save Address
          </Button> */}
        </Box>
      </GlobalModal>
    </Box>
  );
};

export default CustomerProfile;
