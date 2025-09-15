import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Spices from "../../Data/Spices";

const ProductTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useParams();

  const product = Spices.find((item) => item.id === parseInt(id));

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ backgroundColor: "#3c4056ff", width: "100%", py: 6 }}>
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 4,
          borderRadius: 2,
          backgroundColor: "#e1e3eeff",
          boxShadow: 3,
        }}
      >
        <Tabs
          centered
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Description" />
          <Tab label="Benefits" />
          <Tab label="Storage" />
          <Tab label="How To Use?" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && (
            <Typography variant="body1">{product.description}</Typography>
          )}
          {tabIndex === 1 && (
            <Typography variant="body1">{product.benefits}</Typography>
          )}
          {tabIndex === 2 && (
            <Typography variant="body1">Store in a cool,dry place.</Typography>
          )}
          {tabIndex === 3 && (
            <Typography variant="body1">
              Add to tea,sprinkle on desserts.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductTabs;
