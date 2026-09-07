import instance from "./adminApi";

export const getBatchList = () => instance.post("/company/getbatchlist", {});

export const updateBatchProduct = (payload) =>
  instance.post("/company/batch-product/update", payload);

export const deleteBatchProduct = (batchProductId) =>
  instance.delete(`/company/deletebatchproduct/${batchProductId}`);

export const updateBatchProductStatus = (batchProductId, statusId) =>
  instance.post(`/company/batchproduct/${batchProductId}/status/${statusId}`);

export const refreshBatchStatus = () => instance.post("/company/refreshStatus");