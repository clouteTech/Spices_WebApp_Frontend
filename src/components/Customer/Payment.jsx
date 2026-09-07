import { Typography, Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { initiatePaymentApi, confirmPaymentApi } from "../../services/payment";
import { Description } from "@mui/icons-material";

const Payment = ({ orderId, amount, nextStep }) => {
  const hasCalled = useRef(false);
  const [paymentId, setPaymentId] = useState(null);
  useEffect(() => {
    console.log("orderId in Payment:", orderId);

    if (orderId && !hasCalled.current) {
      hasCalled.current = true;
      console.log("Triggering payment...");
      initiatePayment();
    }
  }, [orderId]);

  const navigate = useNavigate();

  const handlePayment = () => {
    nextStep();
  };

  const [paymentStatus, setPaymentStatus] = useState("processing");

  const initiatePayment = async () => {
    try {
      const res = await initiatePaymentApi(orderId);
      const data = res.data.data;

      console.log("Payment Data:", data);

      setPaymentId(data.paymentId);

      const options = {
        key: "rzp_test_SSyixeMzTD8tEP",

        // ✅ Use backend amount
        amount: data.amount,
        currency: data.currency,

        order_id: data.razorpayOrderId,

        name: "Spice Harvest",
        description: "Order Payment",

        theme: {
          color: "#5D4037",
        },

        handler: async function (response) {
          console.log("Razorpay Response:", response); // 🔥 debug
          await confirmPayment(response, data.paymentId);
        },

        modal: {
          ondismiss: function () {
            console.log("Payment Cancelled");
            setPaymentStatus("failed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  const confirmPayment = async (response, paymentId) => {
    try {
      console.log("Sending to backend:", response); // 🔥 debug
      console.log("FINAL paymentId:", paymentId);

      const res = await confirmPaymentApi({
        paymentId: paymentId,
        orderId: orderId,

        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,

        paymentMethod: "UPI",
      });

      console.log("Confirm Response:", res.data);

      setPaymentStatus("success");

      setTimeout(() => {
        nextStep(res.data.data);
      }, 1200);
    } catch (err) {
      console.error("Confirm Error:", err);
      setPaymentStatus("failed");
      alert("Payment verification failed");
    }
  };
  return (
    //     <>
    //       <Box
    //         sx={{
    //           minHeight: "70vh",
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           mt: 10,
    //         }}
    //       >
    //         <Typography
    //           variant="h5"
    //           sx={{ color: "#0e0d0cff", fontWeight: 600, mb: -3 }}
    //         >
    //           Under Construction!
    //         </Typography>
    //         <iframe
    //           src="https://lottie.host/embed/4a0e7a26-8fda-4c4b-903d-c4c793085b15/oIHTT7nzEu.lottie"
    //           //src="https://lottie.host/embed/1f79eb34-5931-4128-b91f-7e9991eeea98/QLmPNQwdjf.lottie"
    //           width="200"
    //           height="200"
    //           style={{ border: "none" }}
    //           title="Payment Animation"
    //         ></iframe>
    //         <Button variant="contained" onClick={handlePayment}>
    //           Generate Invoice
    //         </Button>
    //       </Box>
    //       <Box sx={{ textAlign: "center", mt: 10 }}>
    //         <Typography variant="h4" mb={2}>
    //           Payment
    //         </Typography>
    //         <Typography variant="h6" mb={3}>
    //           Complete Your Payment Securely
    //         </Typography>
    //         <Typography mb={4}>Total Amount:{amount}</Typography>
    //       </Box>
    //     </>
    //   );
    // };
    <Box
      sx={{
        minHeight: "60vh",
        mt: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #f5f7fa, #e4efe9)",
      }}
    >
      <Box
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          background: "#fff",
          textAlign: "center",
        }}
      >
        {/* Title */}

        {paymentStatus === "processing" && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Processing Payment
            </Typography>

            {/* Loader */}
            <Box sx={{ my: 3 }}>
              <CircularProgress
                size={60}
                sx={{ color: "#5D4037", animation: "fadeIn 0.5s ease-in-out" }}
              />
            </Box>

            {/* Amount */}
            <Typography variant="h6" mb={2} fontWeight="bold">
              ₹{amount}
            </Typography>

            {/* Message */}
            <Typography variant="body2" color="text.secondary" mb={3}>
              Please complete your payment in the popup window
            </Typography>
          </>
        )}

        {paymentStatus === "success" && (
          <>
            <Typography variant="h5" color="green" fontWeight="bold">
              Payement Successful🎉
            </Typography>
            <Typography mt={2}>Redirecting to invoice</Typography>
          </>
        )}

        {paymentStatus === "failed" && (
          <>
            <Typography variant="h5" color="error" fontWeight="bold">
              Payment Failed
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={initiatePayment}
            >
              Retry Payment
            </Button>
          </>
        )}

        {/* Security */}
        <Typography variant="caption" color="text.secondary">
          🔒 Secure payment powered by Razorpay
        </Typography>
      </Box>
    </Box>
  );
};

export default Payment;
