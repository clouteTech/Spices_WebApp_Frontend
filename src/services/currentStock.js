import instance from "./adminApi";

export const getActiveBatchProductsApi = (page = 0, size = 10) =>
  instance.post("/company/getactivebatchproducts", null, {
    params: { page, size },
  });