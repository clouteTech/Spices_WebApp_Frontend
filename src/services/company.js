import instance from "./api";

export const getCompanyDetails = () =>
  instance.post("/company/getcompanydetails", {});

export const updateCompanyDetails = (payload) =>
  instance.post("/company/updatecompany", { payload });
