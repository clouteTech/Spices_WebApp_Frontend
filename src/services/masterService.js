import instance from "./api";

export const getProductList = (payload) =>
  instance.post("/company/get/productlist", payload);

export const getProductById = (productId) =>
  instance.post("/company/get/product", { productId });

export const addProduct = (data) => instance.post("/company/add-product", data);

export const updateProduct = (data) =>
  instance.post("/company/update/product", data);

export const deleteProduct = (productId) =>
  instance.post("/company/delete/product", { productId });
