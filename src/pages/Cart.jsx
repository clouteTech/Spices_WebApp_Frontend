// import React, { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Checkbox,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { LocalMallOutlined } from "@mui/icons-material";
// import { DeleteOutlineOutlined } from "@mui/icons-material";
// import { Remove } from "@mui/icons-material";
// import { Add } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     clearCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [showSummaryModal, setShowSummaryModal] = useState(false);
//   const navigate = useNavigate();

//   const total = Number(
//     cartItems
//       .filter((item) =>
//         selectedItems.includes(`${item.id}-${item.selectedSize}`)
//       )
//       .reduce((sum, item) => sum + item.price * item.quantity*item.selectedSize, 0)
//       .toFixed(2)
//   );

//   const subtotal = Number(
//     cartItems
//       .filter((item) =>
//         selectedItems.includes(`${item.id}-${item.selectedSize}`)
//       )
//       .reduce((sum, item) => sum + item.price * item.quantity * item.selectedSize, 0)
//       .toFixed(2)
//   );

//   const handleSelect = (itemKey) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemKey)
//         ? prev.filter((key) => key !== itemKey)
//         : [...prev, itemKey]
//     );
//   };

//   const handleConfirm = () => {
//     setShowSummaryModal(false);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Your Cart
//       </Typography>
//       {cartItems.length === 0 ? (
//         <Typography variant="body1">Your Cart is Empty.</Typography>
//       ) : (
//         <>
//           <List>
//             {cartItems.map((item) => {
//               const itemKey = `${item.id}-${item.selectedSize}`;
//               return (
//                 <Card key={itemKey} sx={{ mb: 2 }}>
//                   <CardContent sx={{ display: "flex", alignItems: "center" }}>
//                     <Checkbox
//                       checked={selectedItems.includes(itemKey)}
//                       onChange={() => handleSelect(itemKey)}
//                     />
//                     <CardMedia
//                       component="img"
//                       image={item.img}
//                       alt={item.name}
//                       sx={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: 1,
//                         objectFit: "cover",
//                         mr: 2,
//                       }}
//                     />
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="subtitle1">{item.name}</Typography>
//                       <Typography variant="body2">
//                         Qty:{item.quantity}
//                       </Typography>
//                       <Typography variant="body2">
//                         Size:{item.selectedSize}
//                       </Typography>
//                       <Typography variant="body2" color="primary">
//                         Price:₹{(item.price * item.quantity * item.selectedSize).toFixed(2)}
//                       </Typography>
//                     </Box>

//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       {item.quantity === 1 ? (
//                         <IconButton
//                           color="error"
//                           onClick={() =>
//                             removeFromCart(item.id, item.selectedSize)
//                           }
//                         >
//                           <DeleteOutlineOutlined />
//                         </IconButton>
//                       ) : (
//                         <IconButton
//                           onClick={() =>
//                             decreaseQuantity(item.id, item.selectedSize)
//                           }
//                         >
//                           <Remove />
//                         </IconButton>
//                       )}
//                       <Typography>{item.quantity}</Typography>
//                       <IconButton
//                         onClick={() =>
//                           increaseQuantity(item.id, item.selectedSize)
//                         }
//                       >
//                         <Add />
//                       </IconButton>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() =>
//                           removeFromCart(item.id, item.selectedSize)
//                         }
//                       >
//                         Remove
//                       </Button>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </List>
//           <Typography variant="h6" sx={{ mt: 2 }}>
//             Subtotal(selected):₹{total.toFixed(2)}
//           </Typography>
//           <Typography variant="h6">Total:₹{total.toFixed(2)}</Typography>
//           <Box sx={{ mt: 2 }}>
//             <Button
//               variant="contained"
//               color="success"
//               startIcon={<LocalMallOutlined />}
//               disabled={selectedItems.length === 0}
//               onClick={() => setShowSummaryModal(true)}
//             >
//               Proceed to Buy
//             </Button>
//           </Box>

//           <Dialog
//             open={showSummaryModal}
//             onClose={() => setShowSummaryModal(false)}
//             maxWidth="sm"
//             fullWidth
//           >
//             <DialogTitle>Cart Summary</DialogTitle>
//             <DialogContent dividers>
//               <List>
//                 {cartItems
//                   .filter((item) =>
//                     selectedItems.includes(`${item.id}-${item.selectedSize}`)
//                   )
//                   .map((item) => (
//                     <React.Fragment key={`${item.id}-${item.selectedSize}`}>
//                       <ListItem>
//                         <ListItemText
//                           primary={`${item.name}-${item.selectedSize}*${item.quantity}`}
//                         />
//                       </ListItem>
//                       <Divider />
//                     </React.Fragment>
//                   ))}
//               </List>
//               <Typography variant="h6" sx={{ mt: 2 }}>
//                 Total:₹{subtotal.toFixed(2)}
//               </Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 onClick={() => setShowSummaryModal(false)}
//                 color="secondary"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleConfirm}
//                 variant="contained"
//                 color="success"
//               >
//                 Confirm
//               </Button>
//             </DialogActions>
//           </Dialog>
//           <Button
//             variant="outlined"
//             color="error"
//             startIcon={<DeleteOutlineOutlined />}
//             sx={{ mt: 3 }}
//             onClick={clearCart}
//           >
//             Clear Cart
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Cart;

// import React, { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { Add, Remove } from "@mui/icons-material";

// const Cart = () => {
//   const BASE_URL = import.meta.env.VITE_API_URL;
//   const { cartItems, increaseQuantity, decreaseQuantity } =
//     useContext(CartContext);

//   if (cartItems.length === 0) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Typography variant="h5">Your Cart is Empty</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" sx={{ mb: 3 }}>
//         Your Cart
//       </Typography>

//       {cartItems.map((item) => (
//         <Card key={item.priceId} sx={{ mb: 2 }}>
//           <CardContent sx={{ display: "flex", alignItems: "center" }}>
//             <CardMedia
//               component="img"
//               image={`${BASE_URL}${item.image}`}
//               alt={item.productName}
//               sx={{ width: 70, height: 70, mr: 2 }}
//             />

//             <Box sx={{ flex: 1 }}>
//               <Typography variant="subtitle1">{item.productName}</Typography>
//               <Typography variant="body2">Size: {item.size}</Typography>
//               <Typography variant="body2">Qty: {item.quantity}</Typography>
//               <Typography variant="body2" color="primary">
//                 ₹{item.price * item.quantity}
//               </Typography>
//             </Box>

//             <IconButton onClick={() => decreaseQuantity(item.cartId)}>
//               <Remove />
//             </IconButton>

//             <Typography>{item.quantity}</Typography>

//             <IconButton onClick={() => increaseQuantity(item.cartId)}>
//               <Add />
//             </IconButton>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default Cart;

import React, { useContext, useState, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Checkbox,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add,
  Remove,
  DeleteOutlineOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { checkOutApi } from "../services/cartService";

const Cart = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeCartItem,
    loadingCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleSelect = (itemKey) => {
    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((id) => id !== itemKey)
        : [...prev, itemKey],
    );
  };

  // const total = useMemo(() => {
  //   return cartItems
  //     .filter((item) => selectedItems.includes(Number(item.cartItemId)))
  //     .reduce(
  //       (sum, item) => sum + Number(item.sellingPrice) * Number(item.quantity),
  //       0,
  //     );
  // }, [cartItems, selectedItems]);

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.sellingPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item.cartItemId))
      .reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  }, [cartItems, selectedItems]);

  if (loadingCart) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Loading your cart...</Typography>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Your Cart is Empty</Typography>
      </Box>
    );
  }

  // Helper function at top of Cart.jsx
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath; // already full URL
    return `${BASE_URL}${imagePath}`; // relative path → add base URL
  };

  // const handleConfirm = async () => {
  //   const token = sessionStorage.getItem("customerToken");

  //   // 🔥 If user not logged in → go to login page
  //   if (!token) {
  //     setShowSummaryModal(false);
  //     navigate("/login", { state: { from: "/cart" } });
  //     return;
  //   }
  //   try {
  //     const cartItemIds = selectedItems;

  //     const res = await checkOutApi(cartItemIds);

  //     console.log("Checkout response:", res.data);

  //     const checkoutData = res.data.data;

  //     setShowSummaryModal(false);

  //     navigate("/checkout", {
  //       state: {
  //         orderedItems: checkoutData.items,
  //         cartItemIds: selectedItems,
  //         subtotal: checkoutData.subTotal,
  //         tax: checkoutData.tax,
  //         deliveryFee: checkoutData.deliveryFee,
  //         total: checkoutData.total,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Checkout failed:", error);
  //   }
  // };

  const handleConfirm = async () => {
    const token = sessionStorage.getItem("customerToken");

    if (!token) {
      setShowSummaryModal(false);
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    try {
      // ✅ FIX HERE
      const cartItemIds = selectedItems.map((id) => {
        if (typeof id === "string" && id.startsWith("guest-")) {
          return Number(id.split("-")[1]); // "guest-8" → 8
        }
        return Number(id);
      });

      const res = await checkOutApi(cartItemIds);

      console.log("Checkout response:", res.data);

      const checkoutData = res.data.data;

      setShowSummaryModal(false);

      navigate("/checkout", {
        state: {
          orderedItems: checkoutData.items,
          cartItemIds: cartItemIds,
          subtotal: checkoutData.subTotal,
          tax: checkoutData.tax,
          deliveryFee: checkoutData.deliveryFee,
          total: checkoutData.total,
        },
      });
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your Cart
      </Typography>

      {/* <List>
        {cartItems.map((item) => (
          <Card key={item.cartId} sx={{ mb: 2 }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              {/* Checkbox */}
      {/* <Checkbox
                checked={selectedItems.includes(item.itemKey)}
                onChange={() => handleSelect(item.itemKey)}
              /> */}

      {/* Image */}
      {/* <CardMedia
                component="img"
                image={`${BASE_URL}${item.image}`}
                alt={item.productName}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  objectFit: "cover",
                  mr: 2,
                }}
              />  */}

      {/* Product Info */}
      {/* <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">Name:{item.productName}</Typography>
                <Typography variant="body2">Size: {item.size}</Typography>
                <Typography variant="body2">Qty: {item.quantity}</Typography>
                <Typography variant="body2">
                  Price:₹{(item.sellingPrice * item.quantity).toFixed(2)}
                </Typography>
              </Box> */}

      {/* Quantity Controls */}
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => decreaseQuantity(item.cartId)}
                  disabled={item.quantity === 1}
                >
                  <Remove />
                </IconButton>

                <Typography>{item.quantity}</Typography>

                <IconButton onClick={() => increaseQuantity(item.cartId)}>
                  <Add />
                </IconButton>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteOutlineOutlined />}
                >
                  Remove
                </Button>
              </Box> */}
      {/* </CardContent>
          </Card>
        ))}
      </List> */}

      <List>
        {cartItems.map((item) => {
          const itemKey = item.cartItemId;
          console.log("cartItemId:", item.cartItemId);
          console.log("Image value:", item.image); // 👈 add this
          console.log("Full URL:", getImageUrl(item.image));

          return (
            <Card key={itemKey} sx={{ mb: 2 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectedItems.includes(itemKey)}
                  onChange={() => handleSelect(itemKey)}
                />

                <CardMedia
                  component="img"
                  // ✅ New
                  image={getImageUrl(item.image)}
                  alt={item.productName}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    objectFit: "cover",
                    mr: 2,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">
                    <strong>Name:</strong> {item.productName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Size:</strong> {item.size}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Qty:</strong> {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> ₹
                    {(item.sellingPrice * item.quantity).toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.quantity <= 1 ? (
                    <IconButton
                      color="error"
                      onClick={() => removeCartItem(item.cartItemId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => decreaseQuantity(item.cartItemId)}
                    >
                      <Remove />
                    </IconButton>
                  )}

                  <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>

                  <IconButton onClick={() => increaseQuantity(item.cartItemId)}>
                    <Add />
                  </IconButton>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlineOutlined />}
                    onClick={() => removeCartItem(item.cartItemId)}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </List>

      {/* Totals */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Subtotal (selected): ₹{subtotal.toFixed(2)}
      </Typography>

      <Typography variant="h6">Total:₹{total.toFixed(2)}</Typography>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<LocalMallOutlined />}
          disabled={selectedItems.length === 0}
          onClick={() => setShowSummaryModal(true)}
        >
          Proceed to Buy
        </Button>
      </Box>

      {/* Summary Modal */}
      <Dialog
        open={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cart Summary</DialogTitle>
        <DialogContent dividers>
          {cartItems
            .filter((item) => selectedItems.includes(item.cartItemId))
            .map((item) => (
              <React.Fragment key={item.cartItemId}>
                <Typography>
                  {item.productName} × {item.quantity}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{subtotal.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSummaryModal(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
