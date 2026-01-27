import { createContext, useContext, useRef } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastIdRef = useRef(null); // 🔥 ONE toast id

  const showToast = (msg, type = "info") => {
    if (toastIdRef.current) {
      // ✅ update existing toast
      toast.update(toastIdRef.current, {
        render: msg,
        type,
        autoClose: 3000,
      });
    } else {
      // ✅ create toast only once
      toastIdRef.current = toast(msg, {
        type,
        autoClose: 3000,
        onClose: () => {
          toastIdRef.current = null;
        },
      });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
