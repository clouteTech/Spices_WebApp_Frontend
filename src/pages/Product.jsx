import React, { useContext } from "react";
import ProductCard from "../components/Customer/ProductCard";
import Spices from "../Data/Spices";
import { useCart } from "../context/CartContext";
import { Container, Grid, Typography } from "@mui/material";

const Product = () => {
  const {addToCart}=useCart();
  const handleAddToCart = (item) => {
    console.log("Added to Cart:", item);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ py:4 ,justifyContent:"center"}}>
        <Typography variant="h4" gutterBottom>
          Our Spices
        </Typography>
        <Grid container spacing={4}>
          {Spices.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} sx={{display:"flex",justifyContent:"center"}}>
              <ProductCard
                id={item.id}
                img={item.img}
                name={item.name}
                price={item.price}
                variants={item.variants}
                onAdd={()=>addToCart(item)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Product;
