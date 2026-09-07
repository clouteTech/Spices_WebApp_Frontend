import customerApi from "./customerApi";

// Add to cart
export const addToCartApi = (productPriceId, quantity = 1) =>
  customerApi.post("/company/addtocart", {
    cartItems: [
      {
        productPriceId: Number(productPriceId),
        quantity: quantity,
      },
    ],
  });

// View cart
export const viewCartApi = () => customerApi.get("/company/viewcart");

// Increase quantity
export const increaseCartItemApi = (cartItemId) =>
  customerApi.put(`/company/cart/increase/${cartItemId}`);

// Decrease quantity
export const decreaseCartItemApi = (cartItemId) =>
  customerApi.put(`/company/cart/decrease/${cartItemId}`);

// Remove item
export const removeCartItemApi = (cartItemId) =>
  customerApi.delete(`/company/removecartitem/${cartItemId}`);

export const checkOutApi = (cartItemIds) =>
  customerApi.post("/company/checkout", {
    cartItemIds: cartItemIds,
  });

export const placeOrderApi = (payload) =>
  customerApi.post("/company/placeorder", payload);
