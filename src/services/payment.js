import customerApi from "./customerApi";

export const initiatePaymentApi = (orderId) =>
  customerApi.post(`/payment/initiate/${orderId}`);

export const confirmPaymentApi = (data) =>
  customerApi.post("/payment/confirm", data);
