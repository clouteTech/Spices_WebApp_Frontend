import instance from "./api";

export const addProductPrice = (data)=>instance.post("/company/add/productprice",data);

export const getProductPrice = (priceId) =>
  instance.post("/company/get/productprice",{priceId});

export const getProductPriceList = (data) =>
  instance.post("/company/get/productpricelist", data);

export const updateProductPrice = (data) =>
  instance.post("/company/update/productprice", data);

export const getAllProductDetails = () =>
  instance.post("/company/get/allproductdetails",{});

export const deleteProductPrice = (priceId) =>
  instance.post("/company/delete/productprice",{priceId});

