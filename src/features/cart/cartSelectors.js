export const selectCartQuantity = (state) =>
  state.cart.totalQuantity;

export const selectCartItems = (state) =>
  state.cart.items;


export const selectCartTotalQuantity = (state) =>
  state.cart.totalQuantity;

export const selectCartTotalAmount = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
