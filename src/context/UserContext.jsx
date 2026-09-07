// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [role, setRole] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(()=>{
//     const storedRole = sessionStorage.getItem("role");
//     const storedAuth = sessionStorage.getItem("isAuthenticated");
//     if(storedRole && storedAuth==="true"){
//       setRole(storedRole);
//       setIsAuthenticated(true);
//     }
//   },[]);

//   useEffect(()=>{
//     if(isAuthenticated){
//       sessionStorage.setItem("role",role);
//       sessionStorage.setItem("isAuthenticated","true");
//     }else{
//       sessionStorage.removeItem("role");
//       sessionStorage.removeItem("isAuthenticated");
//     }
//   },[role,isAuthenticated]);

//   return (
//     <UserContext.Provider
//       value={{ role, setRole, isAuthenticated, setIsAuthenticated }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 🔹 Who is logged in?
  const [role, setRole] = useState(null); // "admin" | "customer" | null

  // 🔹 Is user logged in?
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔁 Restore login on page refresh
  useEffect(() => {
    // 1️⃣ ADMIN → sessionStorage
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken) {
      setRole("admin");
      setIsAuthenticated(true);
      return; // stop here
    }

    // 2️⃣ CUSTOMER → localStorage
    const customerToken = sessionStorage.getItem("customerToken");
    if (customerToken) {
      setRole("customer");
      setIsAuthenticated(true);
    }
  }, []);

  // 🔑 Login (used by BOTH admin & customer)
  const login = (userRole, token) => {
    if (userRole === "admin") {
      sessionStorage.setItem("adminToken", token);
    }

    if (userRole === "customer") {
      sessionStorage.setItem("customerToken", token);
    }

    setRole(userRole);
    setIsAuthenticated(true);
  };

  // 🚪 Logout
  const logout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("customerToken");
    sessionStorage.removeItem("customerId");

    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [role, setRole] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token =
//       sessionStorage.getItem("adminToken") ||
//       localStorage.getItem("customerToken");

//     if (!token) return;

//     const decoded = jwtDecode(token);
//     const roles = decoded.roles || [];

//     if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPERADMIN")) {
//       setRole("admin");
//     } else {
//       setRole("customer");
//     }

//     setIsAuthenticated(true);
//   }, []);

//   const login = (userRole, token) => {
//     if (userRole === "admin") {
//       sessionStorage.setItem("adminToken", token);
//     } else {
//       localStorage.setItem("customerToken", token);
//     }

//     const decoded = jwtDecode(token);
//     const roles = decoded.roles || [];

//     setRole(
//       roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPERADMIN")
//         ? "admin"
//         : "customer",
//     );

//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("adminToken");
//     localStorage.removeItem("customerToken");
//     setRole(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <UserContext.Provider value={{ role, isAuthenticated, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

