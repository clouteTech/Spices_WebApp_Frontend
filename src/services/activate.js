import instance from "./api";

export const activateMasterEntity = (entity, id) =>
  instance.post("/company/activate-masterentity", {
    entity,
    id,
  });
