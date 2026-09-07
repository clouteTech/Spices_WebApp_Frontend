// import React, { createContext, useState, useContext, useEffect } from "react";

// import { addToCartApi } from "../services/cartService";

// export const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = sessionStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(()=>{
//     sessionStorage.setItem("cart",JSON.stringify(cartItems));
//   },[cartItems]);

//   const addToCart = (item) => {
//     console.log("Adding to cart:", item);
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (i) => i.id === item.id && i.selectedSize === item.selectedSize
//       );
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id && i.selectedSize === item.selectedSize
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       } else {
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//   };
//   const removeFromCart = (id, selectedSize) => {
//     setCartItems((prevItems) =>
//       prevItems.filter(
//         (item) => !(item.id === id && item.selectedSize === selectedSize)
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const increaseQuantity = (id, selectedSize) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.selectedSize === selectedSize
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (id, selectedSize) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === id &&
//           item.quantity > 1 &&
//           item.selectedSize === selectedSize
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   useEffect(() => {
//     sessionStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseQuantity,
//         decreaseQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect,useRef } from "react";
import {
  addToCartApi,
  increaseCartItemApi,
  decreaseCartItemApi,
  viewCartApi,
  removeCartItemApi,
} from "../services/cartService";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const hasFetched = useRef(false);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const loadCartFromBackend = async () => {
    setLoadingCart(true);
    try {
      const res = await viewCartApi();
      const backendItems = res.data.data || [];

      const formatted = backendItems.map((item) => ({
        cartItemId: item.cartItemId,
        productId: item.productId,
        productName: item.productName,
        priceId: item.productPriceId,
        size: item.size,
        sellingPrice: Number(item.sellingPrice),
        quantity: item.quantity,
        image: item.thumbnail,
      }));

      console.log("Cart items from backend:", formatted);

      setCartItems(formatted);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  // const loadGuestCart = () => {
  //   const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  //   setCartItems(
  //     guestCart.map((item) => ({
  //       cartItemId: `guest-${item.productPriceId}`, // unique key
  //       productName: "Guest Item",
  //       size: "",
  //       quantity: item.quantity,
  //       sellingPrice: 0, // price unknown for guest
  //       image: "",
  //     })),
  //   );
  // };

  // const loadGuestCart = () => {
  //   const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  //   // get your products list (wherever you store it)
  //   // const products = JSON.parse(localStorage.getItem("products")) || [];

  //   const formatted = guestCart
  //     .map((guestItem) => {
  //       const product = products.find(
  //         (p) => p.productPriceId === guestItem.productPriceId,
  //       );

  //       if (!product) return null;

  //       return {
  //         cartItemId: `guest-${guestItem.productPriceId}`,
  //         productName: product.productName,
  //         size: product.size,
  //         sellingPrice: product.sellingPrice,
  //         quantity: guestItem.quantity,
  //         image: product.image,
  //       };
  //     })
  //     .filter(Boolean);

  //   setCartItems(formatted);
  // };

  const loadGuestCart = () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

    const formatted = guestCart.map((item) => ({
      cartItemId: `guest-${item.productPriceId}`,
      productName: item.productName,
      size: item.size,
      sellingPrice: item.sellingPrice,
      quantity: item.quantity,
      image: item.thumbnail || item.image,
    }));

    setCartItems(formatted);
    setLoadingCart(false);
  };

  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true;
    const token = sessionStorage.getItem("customerToken");

    if (token) {
      loadCartFromBackend();
    } else {
      loadGuestCart();
    }
  }, []);

  // const mergeGuestCart = async () => {
  //   console.log("Merge started 🔥");

  //   const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  //   console.log("GuestCart:", guestCart);

  //   if (guestCart.length === 0) return;

  //   for (const item of guestCart) {
  //     console.log("Merging item:", item.productPriceId,item.quantity);

  //     for (let i = 0; i < item.quantity; i++) {
  //       await addToCartApi(item.productPriceId,item.quantity);
  //     }
  //   }

  //   localStorage.removeItem("guestCart");

  //   console.log("Merge finished ✅");

  //   await loadCartFromBackend();
  // };

  const mergeGuestCart = async () => {
    console.log("Merge started 🔥");

    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    console.log("GuestCart:", guestCart);

    if (guestCart.length === 0) return;

    for (const item of guestCart) {
      console.log("Merging item:", item.productPriceId, item.quantity);

      await addToCartApi(item.productPriceId, item.quantity);
    }

    localStorage.removeItem("guestCart");

    console.log("Merge finished ✅");

    await loadCartFromBackend();
  };

  const addToCart = async (product) => {
    const token = sessionStorage.getItem("customerToken");

    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const existing = guestCart.find(
        (item) => item.productPriceId === product.productPriceId,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        guestCart.push({
          productPriceId: product.productPriceId,
          productName: product.productName,
          size: product.size,
          sellingPrice: product.sellingPrice,
          // ✅ New
          thumbnail:
            product.thumbnail ||
            product.image ||
            product.imageUrl ||
            product.productImage ||
            "",
          quantity: 1,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      loadGuestCart();
      return;
    }

    try {
      await addToCartApi(product.productPriceId, product.quantity || 1);
      await loadCartFromBackend();
    } catch (error) {
      console.error("Add to cart failed", error);
      throw error;
    }
  };

  const increaseQuantity = async (cartItemId) => {
    console.log("Clicked + for:", cartItemId);

    // 🟡 GUEST USER
    if (String(cartItemId).startsWith("guest-")) {
      const id = Number(cartItemId.replace("guest-", ""));
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const item = guestCart.find(
        (p) => Number(p.productPriceId) === Number(id),
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      loadGuestCart();
      return;
    }

    // 🟢 LOGGED IN USER

    try {
      await increaseCartItemApi(cartItemId);

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error("Increase Quantity", err);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    if (String(cartItemId).startsWith("guest-")) {
      const id = Number(cartItemId.replace("guest-", ""));
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const item = guestCart.find(
        (p) => Number(p.productPriceId) === Number(id),
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      loadGuestCart();
      return;
    }

    try {
      await decreaseCartItemApi(cartItemId);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } catch (err) {
      console.error("Decrease quantity failed:", err);
    }
  };

  const removeCartItem = async (cartItemId) => {
    if (String(cartItemId).startsWith("guest-")) {
      // remove from localStorage instead
      const id = Number(cartItemId.replace("guest-", ""));
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const updated = guestCart.filter((item) => item.productPriceId !== id);

      localStorage.setItem("guestCart", JSON.stringify(updated));
      loadGuestCart();
      return;
    }

    await removeCartItemApi(cartItemId);
    loadCartFromBackend();
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeCartItem,
        clearCart,
        mergeGuestCart,
        loadCartFromBackend,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
