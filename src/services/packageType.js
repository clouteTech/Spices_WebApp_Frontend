import instance from "./api";

export const getPackageList = (payload) =>
  instance.post("/company/get/packagetypelist",payload);

export const getPackageById = (packageTypeById) =>
  instance.post("/company/get/packagetype",packageTypeById);

export const addPackageType = (data) => instance.post("/company/add/packagetype",data);

export const updatePackageType = (data) => instance.post("/company/update/packagetype",data);

export const deletePackageType = (packageTypeById) =>
  instance.post("/company/delete/packagetype",packageTypeById);