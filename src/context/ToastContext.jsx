import { createContext,useContext } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({children})=>{
  const showToast = (msg,type = "info",id)=>{
    toast[type](msg,{toastId:id});
  };
  return(
    <ToastContext.Provider value={{showToast}}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = ()=>useContext(ToastContext);