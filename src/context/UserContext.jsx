import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const storedRole = sessionStorage.getItem("role");
    const storedAuth = sessionStorage.getItem("isAuthenticated");
    if(storedRole && storedAuth==="true"){
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  },[]);

  useEffect(()=>{
    if(isAuthenticated){
      sessionStorage.setItem("role",role);
      sessionStorage.setItem("isAuthenticated","true");
    }else{
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("isAuthenticated");
    }
  },[role,isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ role, setRole, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
