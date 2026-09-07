// import React, { useContext } from "react";
// import ProductCard from "../components/Customer/ProductCard";
// import { getCustomerCardList } from "../services/productApi";
// import { useCart } from "../context/CartContext";
// import { Container, Grid, Typography } from "@mui/material";

// const Product = () => {
//   const {addToCart}=useCart();
//   const handleAddToCart = (item) => {
//     console.log("Added to Cart:", item);
//   };
//   return (
//     <>
//       <Container maxWidth="lg" sx={{ py:4 ,justifyContent:"center"}}>
//         <Typography variant="h4" gutterBottom>
//           Our Spices
//         </Typography>
//         <Grid container spacing={4}>
//           {Spices.map((item) => (
//             <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} sx={{display:"flex",justifyContent:"center"}}>
//               <ProductCard
//                 id={item.id}
//                 img={item.img}
//                 name={item.name}
//                 price={item.price}
//                 variants={item.variants}
//                 onAdd={()=>addToCart(item)}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Product;

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/Customer/ProductCard";
import { useCart } from "../context/CartContext";
import { Container, Grid, Typography } from "@mui/material";
import { getCustomerCardList } from "../services/productApi";

const Product = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getCustomerCardList();
      console.log("FULL RESPONSE:", res.data);
      const content = res?.data?.data?.content;
      setProducts(Array.isArray(content) ? content : []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 6, mb: 4, px: 5, animation: "fadeIn 0.4s ease-out" }}
    >
      <Typography variant="h4" gutterBottom>
        Our Spices
      </Typography>

      <Grid container spacing={4}>
        {products.map((item) => (
          <Grid
            item
            key={item.productId}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* <ProductCard
              id={item.productId}
              img={item.images}
              name={item.productName}
              price={item.startingPrice}
              variants={item.variants}
              spice={item}
              onAdd={addToCart}
            /> */}

            <ProductCard product={item} onAdd={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product;
