import instance from "./adminApi";

export const uploadProductImage = (productId, formData) =>
  instance.post(
    `/products/${productId}/images/productmaster/addimages`,
    formData,
  );

export const getProductImage = (productId) =>
  instance.get(`/products/${productId}/images/productmaster/listimages`);

export const setProductDefault = (productId, imageId) =>
  instance.put(`/products/${productId}/images/productmaster/primaryimages/${imageId}`);

export const deleteProductImage = (productId, imageId) =>
  instance.delete(`/products/${productId}/images/productmaster/deleteimage/${imageId}`);
