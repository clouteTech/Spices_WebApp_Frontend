import instance from "./api";

export const uploadProductImages = (productId, formData) =>
  instance.post(`/products/${productId}/images/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getProductImages = (productId) =>
  instance.get(`/products/${productId}/images`);

export const setPrimaryImage = (productId, imageId) =>
  instance.put(`/products/${productId}/images/${imageId}/primary`);

export const deleteProductImage = (productId, imageId) =>
  instance.delete(`/products/${productId}/images/${imageId}`);
