// import instance from "./adminApi";

// export const uploadProductPriceImages = (priceId, formData) =>
//   instance.post(`/products/${priceId}/images/add`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const getProductPriceImages = (priceId) =>
//   instance.get(`/products/${priceId}/images`);

// export const setPrimaryPriceImage = (priceId, imageId) =>
//   instance.put(`/products/${priceId}/images/${imageId}/primary`);

// export const deleteProductPriceImage = (priceId, imageId) =>
//   instance.delete(`/products/${priceId}/images/${imageId}`);

import instance from "./adminApi";

export const uploadProductPriceImages = (priceId, formData) =>
  instance.post(`/products/${priceId}/images/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getProductPriceImages = (priceId) =>
  instance.get(`/products/${priceId}/images`);

export const setPrimaryPriceImage = (priceId, imageId) =>
  instance.put(`/products/${priceId}/images/${imageId}/primary`);

export const deleteProductPriceImage = (priceId, imageId) =>
  instance.delete(`/products/${priceId}/images/${imageId}`);
