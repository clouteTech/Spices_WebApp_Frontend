// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { getCustomerCardList } from "../../services/productApi";

// // const ProductCard = ({ id, img, name, price, variants, onAdd }) => {
// //   const navigate = useNavigate();
// //   // const spice = Spices.find((spice) => spice.id === id);

// //   const [selectedSize, setSelectedSize] = useState(
// //     Array.isArray(variants) && variants.length > 0 ? variants[0].size : ""
// //   );

// //   const handleAddtoCart = (e) => {
// //     e.stopPropagation();
// //     onAdd({ ...spice, size: selectedSize });
// //     navigate("/cart");
// //   };

// //   const handleViewDetails = () => {
// //     navigate(`/product/${id}`);
// //   };

// //   return (
// //     <Card
// //       sx={{
// //         width: 250,
// //         maxWidth: "100%",
// //         height: "auto",
// //         boxShadow: 6,
// //         cursor: "pointer",
// //         display: "flex",
// //         flexDirection: "column",
// //         borderRadius: "12px",
// //         boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
// //         transition: "transform 0.3s ease",
// //         "&:hover": {
// //           transform: "scale(1.03)",
// //           boxShadow:8
// //         },
// //       }}
// //       onClick={handleViewDetails}
// //     >
// //       <Box
// //         sx={{
// //           height: 180,
// //           width: "100%",
// //           overflow: "hidden",
// //           position: "relative",
// //         }}
// //       >
// //         <CardMedia
// //           component="img"
// //           image={img}
// //           alt={name}
// //           sx={{
// //             objectFit: "cover",
// //             width: "100%",
// //             height: "100%",
// //             aspectRatio: "3/2",
// //             borderRadius: "4px",
// //           }}
// //         />
// //       </Box>
// //       <CardContent
// //         sx={{
// //           display: "flex",
// //           flexDirection: "column",
// //           flexGrow: 1,
// //           padding: "8px 6px",
// //           gap: 1,
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         <Box>
// //           <Typography variant="h6" fontWeight="bold">
// //             {name}
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary">
// //             ₹{price * selectedSize}
// //           </Typography>
// //         </Box>
// //         {Array.isArray(variants) && variants.length > 0 && (
// //           <FormControl
// //             fullWidth
// //             size="small"
// //             sx={{ mt: 2 }}
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <InputLabel>Size</InputLabel>
// //             <Select
// //               value={selectedSize}
// //               label="Size"
// //               size="small"
// //               onChange={(e) => {
// //                 e.stopPropagation();
// //                 setSelectedSize(e.target.value);
// //               }}
// //               sx={{ mt: 0.5 }}
// //             >
// //               {variants.map((variant) => (
// //                 <MenuItem
// //                   key={variant.id}
// //                   value={variant.size}
// //                   onClick={(e) => e.stopPropagation()}
// //                 >
// //                   {variant.size}g
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         )}
// //           <Button
// //             variant="contained"
// //             color="warning"
// //             onClick={handleAddtoCart}
// //             sx={{ textAlign: "right", mt: 1, py: 0.7 }}
// //           >
// //             Add to Cart
// //           </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default ProductCard;

// const ProductCard = ({ id, img, name, price, variants, spice, onAdd }) => {
//   const navigate = useNavigate();

//   const [size, setSize] = useState(variants?.[0]?.size || "");

//   const handleAddtoCart = (e) => {
//     e.stopPropagation();
//     onAdd({ ...spice, size: selectedSize });
//     navigate("/cart");
//   };

//   const handleViewDetails = () => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <Card
//       onClick={handleViewDetails}
//       sx={{
//         width: 250,
//         maxWidth: "100%",
//         height: "auto",
//         boxShadow: 6,
//         cursor: "pointer",
//         display: "flex",
//         flexDirection: "column",
//         borderRadius: "12px",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//         transition: "transform 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.03)",
//           boxShadow: 8,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           height: 180,
//           width: "100%",
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         <CardMedia
//           component="img"
//           image={img}
//           alt={name}
//           sx={{
//             objectFit: "cover",
//             width: "100%",
//             height: "100%",
//             aspectRatio: "3/2",
//             borderRadius: "4px",
//           }}
//         />
//       </Box>

//       <CardContent
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           flexGrow: 1,
//           padding: "8px 6px",
//           gap: 1,
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">{name}</Typography>
//         <Typography>₹{price * size}</Typography>

//         <FormControl
//           fullWidth
//           size="small"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <InputLabel>Size</InputLabel>
//           <Select
//             value={size}
//             label="Size"
//             onChange={(e) => setSize(e.target.value)}
//           >
//             {variants?.map((v) => (
//               <MenuItem key={v.id} value={v.size}>
//                 {v.size}g
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           fullWidth
//           variant="contained"
//           color="warning"
//           sx={{ mt: 1 }}
//           onClick={handleAddtoCart}
//         >
//           Add to Cart
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ProductCard = ({ product, onAdd }) => {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const { productId, productName, images, variants } = product;

  const [selectedVariant, setSelectedVariant] = useState(variants?.[0]);

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    console.log("FULL IMAGE OBJECT:", images?.[0]);
    const productToAdd = {
      productPriceId: selectedVariant.priceId,
      productName: productName,
      size: selectedVariant.size,
      sellingPrice: selectedVariant.price,
      thumbnail: images?.[0] ? `${BACKEND_URL}${images[0]}` : "",
    };

    onAdd(productToAdd);
    navigate("/cart");
  };

  const imageUrl = images?.[0] ? `${BACKEND_URL}${images[0]}` : "/no-image.png";

  console.log("BACKEND_URL:", BACKEND_URL);
  console.log("IMAGES ARRAY:", images);
  console.log("FINAL IMAGE URL:", imageUrl);

  return (
    <Card
      onClick={() => navigate(`/product/${product.defaultPriceId}`)}
      sx={{
        width: 250,
        height: 380,
        cursor: "pointer",
        // maxWidth: "100%",
        // height: "auto",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        "&:hover": { boxShadow: "0 15px 35px rgba(0,0,0,0.2)", transform: "translateY(-8px)" },
      }}
    >
      <Box
        sx={{
          height: 180,
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={productName}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "8px 6px",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{productName}</Typography>

        <Typography color="text.secondary">
          ₹{selectedVariant?.price}
        </Typography>

        <FormControl
          fullWidth
          size="small"
          sx={{ mt: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <InputLabel>Size</InputLabel>
          <Select
            label="Size"
            value={selectedVariant?.priceId}
            onChange={(e) =>
              setSelectedVariant(
                variants.find((v) => v.priceId === e.target.value),
              )
            }
          >
            {variants.map((v) => (
              <MenuItem key={v.priceId} value={v.priceId}>
                {v.size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <Button
          fullWidth
          variant="contained"
          color=""
          sx={{ mt: 1 }}
          onClick={handleAddtoCart}
        > */}
        <Button
          fullWidth
          sx={{
            mt: 2,
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            background: "linear-gradient(45deg, #7b1b3a, #a52a2a)", // 🔥 navbar color
            color: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "0.3s",

            "&:hover": {
              backgroundColor: "#5a1028", // 🔥 darker maroon
              transform: "scale(1.03)",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
