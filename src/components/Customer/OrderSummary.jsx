import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { getAddressList, getCustomer } from "../../services/customer";
import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../services/customer";
import { placeOrderApi } from "../../services/cartService";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GlobalModal from "../../ui/GlobalModal";
import { Icon } from "@iconify/react";
import { initiatePaymentApi } from "../../services/payment";
import { useToast } from "../../context/ToastContext";

const OrderSummary = ({ nextStep }) => {
  const location = useLocation();
  const { showToast } = useToast();

  // Receive data from Cart page
  // const {
  //   profile = {},
  //   orderedItems = [],
  //   subtotal = 0,
  // } = location.state || {};

  const {
    orderedItems = [],
    cartItemIds = [],
    subtotal = 0,
    tax = 0,
    deliveryFee = 0,
    total = 0,
  } = location.state || {};

  console.log("Ordered Items:", orderedItems);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);

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

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const loadAddresses = async () => {
    try {
      const res = await getAddressList();

      // 🔥 THIS LINE FIXES EVERYTHING
      const data = res?.data?.data;
      console.log("data:", data);

      // Ensure addresses is ALWAYS an array
      const addressList = Array.isArray(data) ? data : data ? [data] : [];

      setAddresses(addressList);

      const defaultAddress = addressList.find(
        (addr) => addr.defaultAddress === true,
      );

      if (defaultAddress) {
        setBillingAddress({
          firstName: defaultAddress.receiverName?.split(" ")[0] || "",
          lastName: defaultAddress.receiverName?.split(" ")[1] || "",
          company: defaultAddress.company || "",
          address_1: defaultAddress.address_1 || "",
          address_2: defaultAddress.address_2 || "",
          city: defaultAddress.city || "",
          state: defaultAddress.state || "",
          pincode: defaultAddress.pincode || "",
          phone: defaultAddress.receiverPhone || "",
        });
      }
    } catch (err) {
      console.error("Error loading addresses:", err);
      setAddresses([]);
    }
  };

  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!selectedAddress) {
        showToast("Please select a delivery address", "error");
        return;
      }
      if (!sameBillingAddress && !selectedBillingAddress) {
        showToast("Please select a billing address", "error");
        return;
      }

      console.log("cartItemIds:", cartItemIds); // 👈 IMPORTANT

      let payload = {};

      if (sameBillingAddress) {
        payload = {
          shippingAddressId: selectedAddress.addressId,
          sameAsShipping: true,
          cartItemIds: cartItemIds,
        };
      } else {
        payload = {
          shippingAddressId: selectedAddress.addressId,
          billingAddressId: selectedBillingAddress.addressId,
          sameAsShipping: false,
          cartItemIds: cartItemIds,
        };
      }

      console.log("Final Payload:", payload);

      const res = await placeOrderApi(payload);

      console.log("Order Response:", res.data);

      nextStep({
        orderId: res.data.data.orderId,
        orderNo: res.data.data.orderNo,
        amount: res.data.data.amount,
        paymentId: res.data.data.paymentId,
      });
    } catch (error) {
      console.error(error);
      showToast("Failed to place order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // const handleSaveAddress = (newAddress) => {
  //   setAddresses([...addresses, newAddress]);
  //   setSelectedAddress(newAddress);
  //   setShowNewAddress(false);
  // };

  const handleAddressChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      isDefault: addr.isDefault,
      businessAddress: addr.businessAddress,
      gstNo: addr.gstNo || "",
    });

    setEditAddressId(addr.addressId);
    setOpenAddressModal(true);
  };

  // const handleDeleteAddress = async (id) => {
  //   try {
  //     await deleteAddress(id);
  //     loadAddresses();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete address");
  //   }
  // };

  const saveAddress = async () => {
    try {
      // 🔒 Frontend validation
      if (!addressData.receiverName?.trim()) {
        alert("Receiver name is required");
        return;
      }

      if (!addressData.receiverPhone?.trim()) {
        alert("Receiver phone number is required");
        return;
      }

      if (addressData.businessAddress && !addressData.gstNo?.trim()) {
        alert("GST number is required for business address");
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
        isDefault: addressData.isDefault,
        businessAddress: addressData.businessAddress,
        gstNo: addressData.businessAddress ? addressData.gstNo : null,
        companyName: addressData.businessAddress
          ? addressData.companyName
          : null,
      };

      if (editAddressId) {
        await updateAddress({ addressId: editAddressId, ...payload });
      } else {
        await addAddress(payload);
      }

      setOpenAddressModal(false);
      setEditAddressId(null);
      resetAddressForm();
      loadAddresses();
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await getCustomer();
        setProfile(customerRes.data.data);

        const addressRes = await getAddressList();

        const data = addressRes?.data?.data;
        const addressList = Array.isArray(data) ? data : data ? [data] : [];

        setAddresses(addressList);

        if (addressList.length > 0) {
          const defaultAddr =
            addressList.find((a) => a.defaultAddress === true) ||
            addressList[0];

          setSelectedAddress(defaultAddr);
          setShowNewAddress(false);
        } else {
          setShowNewAddress(true);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 6 }}>
      <Container maxWidth={false}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Review Your Order
        </Typography>

        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Customer Info */}
            {/* <Card sx={{ p: 3, mb: 3, transition: "none" }}> */}
            <Card
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 1,
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={1}>
                Customer Details
              </Typography>

              <Typography variant="body2">
                <strong>Name:</strong> {profile?.firstName} {profile?.lastName}
              </Typography>

              <Typography variant="body2">
                <strong>Phone:</strong> {profile?.mobileNumber}
              </Typography>

              <Typography variant="body2">
                <strong>Email:</strong> {profile?.email}
              </Typography>
            </Card>

            {/* <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Shipping Address
              </Typography>

              {addresses.length > 0 && (
                <>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Select Shipping Address
                  </Typography>

                  {addresses.map((address, index) => (
                    <Box
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowNewAddress(false);
                      }}
                      sx={{
                        border:
                          selectedAddress === address
                            ? "2px solid #5D4037"
                            : "1px solid #ddd",
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                      }}
                    >
                      <Typography fontWeight="bold">{address.name}</Typography>
                      <Typography variant="body2">
                        {address.street}, {address.city}
                      </Typography>
                      <Typography variant="body2">{address.pincode}</Typography>
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    onClick={() => setShowNewAddress(true)}
                    sx={{ mt: 2 }}
                  >
                    + Add New Address
                  </Button>
                </>
              )} */}

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Shipping Address
              </Typography>

              {addresses.length > 0 ? (
                <Box
                  sx={{
                    maxHeight: 260,
                    overflowY: "auto",
                    pr: 1,
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#cfcfcf",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <RadioGroup
                    value={selectedAddress?.addressId || ""}
                    onChange={(e) => {
                      const selected = addresses.find(
                        (addr) => addr.addressId === Number(e.target.value),
                      );
                      setSelectedAddress(selected);
                    }}
                  >
                    {addresses.map((address) => (
                      <Box
                        key={address.addressId}
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: 4,
                          p: 1.8,
                          mb: 1.8,
                        }}
                      >
                        <FormControlLabel
                          value={address.addressId}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography fontWeight={600}>
                                {address.receiverName}
                                {address.defaultAddress && " (Default)"}
                              </Typography>

                              <Typography>
                                {address.address_1}, {address.address_2}
                              </Typography>

                              <Typography>
                                {address.city}, {address.state} -{" "}
                                {address.pincode}
                              </Typography>

                              <Typography>
                                Phone: {address.receiverPhone}
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                </Box>
              ) : (
                <Typography color="text.secondary">
                  No address found. Please add a new address.
                </Typography>
              )}

              <Button
                variant="outlined"
                sx={{ mt: 2, borderRadius: 3 }}
                onClick={() => setOpenAddressModal(true)}
              >
                Add Delivery Address
              </Button>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Billing Address
              </Typography>

              <RadioGroup
                value={sameBillingAddress ? "same" : "different"}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "same") {
                    setSameBillingAddress(true);
                  } else {
                    setSameBillingAddress(false);
                  }
                }}
              >
                <FormControlLabel
                  value="same"
                  control={<Radio />}
                  label="Same as shipping address"
                />
                <FormControlLabel
                  value="different"
                  control={<Radio />}
                  label="Use different Billing Address"
                />
              </RadioGroup>
              {!sameBillingAddress && (
                <>
                  {addresses.length > 0 ? (
                    <Box
                      sx={{
                        maxHeight: "260px", // 👈 force string
                        height: "260px", // 👈 ADD THIS
                        overflowY: "auto",
                        pr: 1,
                        border: "1px solid #eee", // optional (for debugging)
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#cfcfcf",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <RadioGroup
                        value={selectedBillingAddress?.addressId || ""}
                        onChange={(e) => {
                          const selected = addresses.find(
                            (addr) => addr.addressId === Number(e.target.value),
                          );
                          setSelectedBillingAddress(selected);
                        }}
                      >
                        {addresses.map((address) => (
                          <Box
                            key={address.addressId}
                            sx={{
                              border: "1px solid #ddd",
                              borderRadius: 4,
                              p: 1.8,
                              mb: 1.8,
                            }}
                          >
                            <FormControlLabel
                              value={address.addressId}
                              control={<Radio />}
                              label={
                                <Box>
                                  <Typography fontWeight={600}>
                                    {address.receiverName}
                                    {address.defaultAddress && "(Default)"}
                                  </Typography>
                                  <Typography>
                                    {address.address_1},{address.address_2}
                                  </Typography>
                                  <Typography>
                                    {address.city},{address.state}-{" "}
                                    {address.pincode}
                                  </Typography>
                                  <Typography>
                                    Phone:{address.receiverPhone}
                                  </Typography>
                                </Box>
                              }
                            />
                          </Box>
                        ))}
                      </RadioGroup>
                    </Box>
                  ) : (
                    <Typography mt={2}>No address found</Typography>
                  )}
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, borderRadius: 3 }}
                    onClick={() => setOpenAddressModal(true)}
                  >
                    Add Billing Address
                  </Button>
                </>
              )}
            </Card>

            {/* {showNewAddress && (
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Add Delivery Address
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label="First Name" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Last Name" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Address1" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Address2" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="City" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="State / Country" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Postcode / ZIP" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Phone" fullWidth />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  sx={{ mt: 3, borderRadius: 3 }}
                  onClick={handleSaveAddress}
                >
                  Save Address
                </Button>
              </Card>
            )} */}

            <GlobalModal
              open={openAddressModal}
              handleClose={() => setOpenAddressModal(false)}
              title="Add Address"
              actions={
                <>
                  <Button onClick={() => setOpenAddressModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={saveAddress}>
                    Save
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
              </Box>
            </GlobalModal>

            {/* Billing Details */}
            {/* <Card sx={{ mb: 4, p: 4, borderRadius: 4 }}> */}
            {/* {(addresses.length === 0 || showNewAddress) && (
                <>
                  <Typography variant="h5" fontWeight="bold" mb={3}>
                    Billing Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField label="First Name" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label="Last Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="State / Country" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Street Address" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Apartment (optional)" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label="Town / City" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label="Postcode / ZIP" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label="Phone" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField label="Email Address" fullWidth />
                    </Grid>
                  </Grid>
                </>
              )} */}
            {/* </Card> */}

            {/* Payment Method */}
            {/* <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Payment Method
              </Typography>

              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                fullWidth
              >
                <MenuItem value="Cash On Delivery">Cash On Delivery</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Credit/Debit Card">
                  Credit / Debit Card
                </MenuItem>
              </Select>
            </Card> */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Payment Method
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f5f7fa",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography variant="body2">🔒 100% Secure Checkout</Typography>
                <Typography variant="body2">
                  All transactions are encrypted and secure.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 3,
                  }}
                >
                  <Icon icon="bxl:upi" width="50" />
                  <Icon icon="logos:visa" width="50" />
                  <Icon icon="logos:mastercard" width="50" />
                  <Icon icon="twemoji:bank" width="50" />
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                position: "sticky",
                top: 100,
              }}
            >
              <Card
                sx={{
                  p: 6,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Order Summary
                </Typography>

                {/* Products */}
                {orderedItems.map((item) => (
                  <Box
                    key={item.cartItemId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CardMedia
                        component="img"
                        image={
                          item.thumbnail?.startsWith("http")
                            ? item.thumbnail
                            : `${BASE_URL}${item.thumbnail}`
                        }
                        alt={item.productName}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          objectFit: "cover",
                          mr: 2,
                          border: "1px solid black",
                        }}
                      />

                      <Typography variant="body2">
                        {item.productName} × {item.quantity}
                      </Typography>
                    </Box>

                    <Typography variant="body2" fontWeight="bold">
                      ₹{item.total.toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>₹{subtotal.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">GST</Typography>
                  <Typography>₹{tax.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Delivery</Typography>
                  <Typography color="success.main">
                    {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    ₹{total.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#f8f8f8",
                    p: 2,
                    borderRadius: 2,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2">🚚 Estimated Delivery</Typography>

                  <Typography variant="body2" fontWeight="bold">
                    3 – 5 Business Days
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </Card>
              {/* <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Payment Method
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#f5f7fa",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">
                    🔒 100% Secure Checkout
                  </Typography>
                  <Typography variant="body2">
                    All transactions are encrypted and secure.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Icon icon="bxl:upi" width="50" />
                    <Icon icon="logos:visa" width="50" />
                    <Icon icon="logos:mastercard" width="50" />
                    <Icon icon="twemoji:bank" width="50" />
                  </Box>
                </Box>
              </Card> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderSummary;
