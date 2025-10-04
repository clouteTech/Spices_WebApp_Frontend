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

  const handleLogin = async (e) => {
    e.preventDefault();
    // const adminUser={
    //   email:"admin@123",
    //   password:"admin123",
    //   role:"admin",
    // };
    // if(email===adminUser.email&& password===adminUser.password){
    //   localStorage.setItem("role","admin");
    //   toast.success("Admin Loggedin Successfully");
    //   navigate
    // }else{
    //   toast.error("Invalid admin Information");
    // }
    //   try {
    //     const response = await postUserLogin(formData);
    //     if (response.data.userType === "Root_User") {
    //       setRole("admin");
    //       setIsAuthenticated(true);
    //       sessionStorage.setItem("role", "admin");
    //       sessionStorage.setItem("isAuthenticated", "true");
    //       sessionStorage.setItem("token", response.data.token);
    //       document.cookie = `token=${encodeURIComponent(
    //         response.data.token
    //       )}; path=/;`;
    //       console.log("API Response:", response.data);
    //       toast.success("Admin Logged in Successfully");
    //       navigate("/admin/dashboard");
    //     } else {
    //       toast.error("Invalid Admin Credentials");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     toast.error("Login failed");
    //   }
    // };

    // useEffect(() => {
    //   document.cookie = "token=";
    // }, []);

    try {
      const response = await postUserLogin(formData);
      console.log("Full login response:", response);

      if (response?.userType === "Root_User") {
        setRole("admin");
        setIsAuthenticated(true);
        sessionStorage.setItem("role", "admin");
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("token", response.token);

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
