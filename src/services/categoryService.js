import instance from "./api";

export const getCategoryList = (params) =>
  instance.post("/company/get/categorylist", params);

export const getCategoriesById = (categoryId) =>
  instance.post(`/company/get/category`, { categoryId });

export const addCategory = (data) =>
  instance.post("/company/add/category", data);

export const updateCategory = (categoryId, data) =>
  instance.post(`/company/update/category`, { categoryId, ...data });

export const deleteCategory = (categoryId) =>
  instance.post(`/company/delete/category`, { categoryId });

// export const deleteCategory = (categoryId) => {
//   return instance.post(
//     "/company/delete/category",
//     { categoryId }, // plain object, not wrapped in `data`
//     {
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// };

export const getProductType = () => instance.post(`/company/get/alltypes`, {});

export const getCategoryByType = (typeName) =>
  instance.post(`/company/get/categorybytype`, { typeName });
