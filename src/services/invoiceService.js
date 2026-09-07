import instance from "./adminApi";

export const getInvoices = (payload) => instance.post("/company/invoices",payload);

export const getInvoiceById = (invoiceId)=>instance.get(`/company/invoice/${invoiceId}`);