import instance from "./api";

export const getSize = (payload) => instance.post("/company/get/sizelist",payload);

export const addSizeById = (sizeId) => instance.post("/company/get/size",{sizeId});

export const addSizes = (sizeData) => instance.post("/company/add/size",sizeData);

export const updateSize = (sizeData) => instance.post("/company/update/size",sizeData);

export const deleteSize = (sizeId) => instance.post("/company/delete/size",{sizeId});

export const getSizeDropdown = () => instance.post("/company/sizedropdownlist",{});

