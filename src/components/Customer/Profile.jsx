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

import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GlobalModal from "../../ui/GlobalModal"

const CustomerProfile = () => {
  const user = {
    name: "rahul v",
    email: "cloute.rahulv@gmail.com",
  };

  const [addresses, setAddresses] = useState([]);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const [addressData, setAddressData] = useState({
    isDefault: false,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveAddress = () => {
    setAddresses([...addresses, addressData]);
    setOpenAddressModal(false);
    setAddressData({
      isDefault: false,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      phone: "",
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Profile
      </Typography>

      {/* Profile Card */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{user.name}</Typography>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Box>

        <Typography color="text.secondary" mt={2}>
          Email
        </Typography>
        <Typography>{user.email}</Typography>
      </Card>

      {/* Address Card */}
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
      </Card>

      {/* ADD ADDRESS MODAL */}
      <GlobalModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        title="Add address"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="isDefault"
                checked={addressData.isDefault}
                onChange={handleChange}
              />
            }
            label="This is my default address"
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="First name"
              name="firstName"
              value={addressData.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              value={addressData.lastName}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="Address"
            name="address"
            value={addressData.address}
            onChange={handleChange}
          />

          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={addressData.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={addressData.state}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="PIN code"
              name="pinCode"
              value={addressData.pinCode}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="Phone"
            name="phone"
            value={addressData.phone}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={saveAddress} sx={{ mt: 2 }}>
            Save Address
          </Button>
        </Box>
      </GlobalModal>
    </Box>
  );
};

export default CustomerProfile;
