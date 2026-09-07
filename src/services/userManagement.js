import instance from "./adminApi";

export const customerUser = (payload) =>
  instance.post("/company/customerlist",{payload});