// import axios from "axios";

// const customerApi = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// customerApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("customerToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default customerApi;

import axios from "axios";

const customerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customerApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("customerToken"); // ✅ FIXED

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default customerApi;
