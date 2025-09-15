import { createContext,useContext,useState } from "react";

const UserContext=createContext();

export const UserProvider = ({children})=>{
  const [role,setRole]=useState("customer");
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  return(
    <UserContext.Provider value={{role,setRole,isAuthenticated,setIsAuthenticated}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser=()=>useContext(UserContext);