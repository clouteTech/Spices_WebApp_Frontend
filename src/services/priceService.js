import instance from "./api";

export const addProductPrice = (data)=>instance.post("/company/add/productprice",data);

export const getProductPrice = (priceId) =>
  instance.post("/company/get/productprice",priceId);

export const getProductPriceList = () =>
  instance.post("/company/get/productpricelist", {});

export const updateProductPrice = (data) =>
  instance.post("/company/update/productprice", data);

export const getAllProductDetails = () =>
  instance.post("/company/get/allproductdetails",{});

