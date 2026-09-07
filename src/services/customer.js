import customerApi from "./customerApi";

export const addCustomer = (data) =>
  customerApi.post("/customer/create-customer",data);

export const updateCustomer = (data) =>
  customerApi.post("/customer/update-customer",data);

export const getCustomer = () => customerApi.post("/customer/getcustomerdetails",{});

export const deleteCustomer = (customerId) =>
  customerApi.post("/customer/delete-customer",{customerId});

export const addAddress = (data) =>
  customerApi.post("/customer/add-address",data);

export const updateAddress = (data) =>
  customerApi.post("/customer/update-address",data);

export const getAddressList = () =>
  customerApi.post("/customer/list-address",{});

export const deleteAddress = (addressId) =>
  customerApi.post("/customer/delete-address",{addressId});