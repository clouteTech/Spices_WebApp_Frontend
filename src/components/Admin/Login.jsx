import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postUserLogin } from "../../services/auth-service";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setRole, setIsAuthenticated } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // const adminUser={
  //   //   email:"admin@123",
  //   //   password:"admin123",
  //   //   role:"admin",
  //   // };
  //   // if(email===adminUser.email&& password===adminUser.password){
  //   //   localStorage.setItem("role","admin");
  //   //   toast.success("Admin Loggedin Successfully");
  //   //   navigate
  //   // }else{
  //   //   toast.error("Invalid admin Information");
  //   // }
  //   //   try {
  //   //     const response = await postUserLogin(formData);
  //   //     if (response.data.userType === "Root_User") {
  //   //       setRole("admin");
  //   //       setIsAuthenticated(true);
  //   //       sessionStorage.setItem("role", "admin");
  //   //       sessionStorage.setItem("isAuthenticated", "true");
  //   //       sessionStorage.setItem("token", response.data.token);
  //   //       document.cookie = `token=${encodeURIComponent(
  //   //         response.data.token
  //   //       )}; path=/;`;
  //   //       console.log("API Response:", response.data);
  //   //       toast.success("Admin Logged in Successfully");
  //   //       navigate("/admin/dashboard");
  //   //     } else {
  //   //       toast.error("Invalid Admin Credentials");
  //   //     }
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //     toast.error("Login failed");
  //   //   }
  //   // };

  //   // useEffect(() => {
  //   //   document.cookie = "token=";
  //   // }, []);

  //   try {
  //     const response = await postUserLogin(formData);
  //     console.log("Full login response:", response);

  //     const userData = response.data;
  //     console.log("userData:", userData);

  //     if (userData?.userType === "Root_User") {
  //       console.log("checking response");
  //       setRole("admin");
  //       setIsAuthenticated(true);
  //       sessionStorage.setItem("role", "admin");
  //       sessionStorage.setItem("isAuthenticated", "true");
  //       sessionStorage.setItem("token", userData.token);

  //       toast.success("Admin Logged in Successfully");
  //       navigate("/admin/dashboard");
  //     } else {
  //       toast.error("Invalid Admin Credentials");
  //     }
  //   } catch (error) {
  //     console.error("Login API Error:", error);
  //     toast.error("Login failed");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await postUserLogin(formData);
      const userData = response.data;

      if (userData?.userType === "Root_User") {
        // 🔑 ONE LINE DOES EVERYTHING
        login("admin", userData.token);

        toast.success("Admin Logged in Successfully");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid Admin Credentials");
      }
    } catch (error) {
      console.error("Login API Error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 400, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Admin Panel
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              variant="outlined"
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { Button } from "primereact/button";
// import { Checkbox } from "primereact/checkbox";
// import { postUserLogin } from "../../services/auth-service";
// import { useUser } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [remember, setRemember] = useState(false);
//   const { setRole, setIsAuthenticated } = useUser();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login Data:", formData, remember);
//     try {
//       const response = await postUserLogin(formData);
//       console.log("Full login response:", response);

//       const userData = response.data;
//       console.log("userData:", userData);

//       if (userData?.userType === "Root_User") {
//         console.log("checking response");
//         setRole("admin");
//         setIsAuthenticated(true);
//         sessionStorage.setItem("role", "admin");
//         sessionStorage.setItem("isAuthenticated", "true");
//         sessionStorage.setItem("token", userData.token);

//         toast.success("Admin Logged in Successfully");
//         navigate("/admin/dashboard");
//       } else {
//         toast.error("Invalid Admin Credentials");
//       }
//     } catch (error) {
//       console.error("Login API Error:", error);
//       toast.error("Login failed");
//     }
//   };

//   return (
//     <div className="surface-ground flex align-items-center justify-content-center min-h-screen">
//       <div
//         className="surface-card py-8 px-5 sm:px-8"
//         style={{
//           width: "30rem",
//           borderRadius: "12px",
//         }}
//       >
//         {/* HEADER */}
//         <div className="text-center mb-5">
//           <img
//             src="/demo/images/login/avatar.png"
//             alt="avatar"
//             height="50"
//             className="mb-4"
//           />
//           <div className="text-900 text-3xl font-medium mb-3">Admin Login</div>
//           <span className="text-600 font-medium">Sign in to continue</span>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit}>
//           {/* EMAIL */}
//           <label className="block text-900 text-xl font-medium mb-2">
//             Email
//           </label>
//           <InputText
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email address"
//             className="w-full mb-4"
//             style={{ padding: "1rem" }}
//           />

//           {/* PASSWORD */}
//           <label className="block text-900 font-medium text-xl mb-2">
//             Password
//           </label>
//           <Password
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             toggleMask
//             className="w-full mb-4"
//             inputClassName="w-full p-3"
//           />

//           {/* REMEMBER + FORGOT */}
//           <div className="flex align-items-center justify-content-between mb-5">
//             <div className="flex align-items-center">
//               <Checkbox
//                 inputId="remember"
//                 checked={remember}
//                 onChange={(e) => setRemember(e.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="remember">Remember me</label>
//             </div>

//             <span className="font-medium cursor-pointer text-primary">
//               Forgot password?
//             </span>
//           </div>

//           {/* BUTTON */}
//           <Button
//             type="submit"
//             label="Sign In"
//             className="w-full p-3 text-xl"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
