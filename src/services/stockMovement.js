import instance from "./adminApi";

export const getStockMovementList = (payload) =>
  instance.post("/company/stock-movementlist", payload);
