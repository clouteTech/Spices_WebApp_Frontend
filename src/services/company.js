import instance from "./adminApi";

export const getCompanyDetails = () =>
  instance.post("/company/getcompanydetails", {});

export const updateCompanyDetails = (payload) =>
  instance.post("/company/updatecompany",payload);

// export const getBankDetails
