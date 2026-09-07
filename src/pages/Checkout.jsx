import { useState } from "react";
import { Container, Stepper, Step, StepLabel, Box } from "@mui/material";
import { Link } from "react-router-dom";

import OrderSummary from "../components/Customer/OrderSummary";
import Payment from "../components/Customer/Payment";
import Invoice from "../components/Customer/Invoice";
import logo2 from "../assets/logo2.png";

const steps = ["Order Summary", "Payment", "Invoice"];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepData, setStepData] = useState({});

  return (
    <Container maxWidth={false} sx={{ px: 4, mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
        }}
      >
        <Link to="/">
          <img src={logo2} alt="Logo2" style={{ height: "120px" }} />
        </Link>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <OrderSummary
          nextStep={(data) => {
            setStepData(data); // ✅ store order data
            setActiveStep(1);
          }}
        />
      )}

      {activeStep === 1 && (
        <Payment
          orderId={stepData.orderId} // ✅ pass orderId
          amount={stepData.amount} // ✅ pass amount
          paymentId={stepData.paymentId}
          nextStep={(invoiceData) => {
            console.log("Invoice Data received:", invoiceData);
            setStepData((prev) => ({ ...prev, invoiceData }));
            setActiveStep(2);
          }}
        />
      )}

      {activeStep === 2 && <Invoice data={stepData.invoiceData} />}
    </Container>
  );
}

export default Checkout;
