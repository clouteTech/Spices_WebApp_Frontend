import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";
import { sendOtp, verifyOtp } from "../../services/customerAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const CustomerLogin = () => {
  const { showToast } = useToast();
  const { login } = useUser();
  const otpRefs = useRef([]);
  const { mergeGuestCart, loadCartFromBackend } = useCart();
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [oneTimePasscode, setOneTimePasscode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [otpTimer, setOtpTimer] = useState(300);
  const [otpExpired, setOtpExpired] = useState(false);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...oneTimePasscode];
    updatedOtp[index] = value;
    setOneTimePasscode(updatedOtp);

    // 👉 Move to next box automatically
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleSendOtp = async () => {
    if (mobileNumber.length !== 10) {
      alert("Emter valid mobile number");
      return;
    }
    try {
      await sendOtp(mobileNumber); // 👈 backend call
      setOtpSent(true); // 👈 show OTP boxes
      setOtpExpired(false);
      setOneTimePasscode(["", "", "", "", "", ""]);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpValue = oneTimePasscode.join("");

      console.log("Mobile:", mobileNumber);
      console.log("OTP:", otpValue);

      const res = await verifyOtp(mobileNumber, otpValue);
      console.log("VERIFY RESPONSE:", res);

      const token = res.data.data.token;
      const profileCompleted = res.data.data.profileCompleted;

      login("customer", token);

      try {
        await mergeGuestCart();
        await loadCartFromBackend();
      } catch (err) {
        console.log("Cart merge failed but login continues", err);
      }

      if (!profileCompleted) {
        console.log("Calling toast");
        showToast("Customer Registered Successfully","success");

        setTimeout(() => {
          navigate("/profile");
        }, 1200);
      } else {
        console.log("Calling toast");
        showToast("Login Successful","success");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
    } catch (error) {
      console.log("Verify OTP error:", error.response);

      const message =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "OTP verification failed";

      // alert(message);
    }
  };

  useEffect(() => {
    if (!otpSent) return;

    if (otpTimer === 0) {
      setOtpExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !oneTimePasscode[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F9F8FC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 440,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6E3F3",
          boxShadow: `
            0px 6px 12px rgba(107,78,255,0.15),
            0px 20px 40px rgba(0,0,0,0.12)
          `,
        }}
      >
        {/* Header */}
        <Typography
          fontSize={24}
          fontWeight={600}
          color="#1F2937"
          textAlign="center"
        >
          Welcome
        </Typography>

        <Typography
          fontSize={14}
          color="#6B7280"
          mt={1}
          mb={3}
          textAlign="center"
        >
          Use your mobile number to continue
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Phone Number */}
        <Typography fontSize={14} fontWeight={500} mb={0.5}>
          Mobile Number
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter phone number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        {/* Get OTP Button */}
        {!otpSent && (
          <Button
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 6,
              background: "linear-gradient(135deg, #6B4EFF, #5438E6)",
              color: "#FFFFFF",
              fontWeight: 600,
              textTransform: "uppercase",
              boxShadow: "0px 8px 20px rgba(107,78,255,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #5438E6, #6B4EFF)",
              },
            }}
            onClick={handleSendOtp}
          >
            Get OTP
          </Button>
        )}

        {/* OTP Section */}
        {otpSent && (
          <>
            <Typography fontSize={14} fontWeight={500} mt={3} mb={1}>
              Enter OTP
            </Typography>

            <Typography
              fontSize={13}
              color={otpExpired ? "red" : "#6B7280"}
              mb={1}
            >
              {otpExpired
                ? "OTP expired. Please resend OTP"
                : `OTP expires in ${Math.floor(otpTimer / 60)}:${String(
                    otpTimer % 60,
                  ).padStart(2, "0")}`}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1.2,
              }}
            >
              {oneTimePasscode.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    style: {
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: 600,
                    },
                  }}
                  sx={{
                    width: 54,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      height: 54,
                      backgroundColor: "#EDEAFF",
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B4EFF",
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              disabled={otpExpired}
              onClick={handleVerifyOtp}
              sx={{
                mt: 4,
                py: 1.4,
                borderRadius: 6,
                background: otpExpired
                  ? "#C7C7C7"
                  : "linear-gradient(135deg, #6B4EFF, #5438E6)",
                color: "#FFFFFF",
                fontWeight: 600,
                textTransform: "uppercase",
                boxShadow: otpExpired
                  ? "none"
                  : "0px 8px 20px rgba(107,78,255,0.4)",
              }}
            >
              Verify & Continue
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
};

export default CustomerLogin;
