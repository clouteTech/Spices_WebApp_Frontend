import api from "./api";

export const getProductDetails = (priceId) => api.post("/company/individualproductdetails",{priceId});

