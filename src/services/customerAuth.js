import api from "./api";

export const sendOtp = (mobileNumber) =>
  api.post("/auth/customer/login/send-otp",{mobileNumber});

export const verifyOtp = (mobileNumber, oneTimePasscode) =>
  api.post("/auth/customer/login/verify-otp",{mobileNumber,oneTimePasscode});