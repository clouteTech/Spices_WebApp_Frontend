import axios from "axios";

// export function getCookieByName(cookiename) {
//   const cookiestring = RegExp(`${cookiename}=[^;]`).exec(document.cookie);

//   return decodeURIComponent(
//     cookiestring ? cookiestring?.toString().replace(/^[^=]+./, "") : ""
//   );
// }

// export const deleteCookie = (name) => {
//   document.ccokie = name + "=";
// };

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ correct key
});

// Add request interceptor
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // 👈 read from sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
