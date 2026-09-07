import instance from "./adminApi";

export const getProductByShelfLife = (shelfLife) =>
  instance.post("/company/products/shelflife", null, {
    params: { shelfLife: Number(shelfLife) },
  });
  
export const getPackageTypeByProduct = (productId, shelfLife) =>
  instance.post(`/company/products/${productId}/package-types`, null, {
    params: { shelfLife },
  });

export const getSizeByPackage = (productId, packageTypeId, shelfLife) =>
  instance.post(
    `/company/products/${productId}/package-types/${packageTypeId}/sizes`,
    null,
    { params: { shelfLife } }
  );

export const getProductPriceBySize = (
  productId,
  packageTypeId,
  sizeId,
  shelfLife
) =>
  instance.post(
    `/company/products/${productId}/package-types/${packageTypeId}/sizes/${sizeId}/price`,
    null,
    { params: { shelfLife } }
  );

export const addBatch = (payload) =>
  instance.post("/company/addbatch", payload);
