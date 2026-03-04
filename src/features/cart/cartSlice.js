import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],        // { product, quantity }
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }

      state.totalQuantity += 1;
    },

    removeFromCart(state, action) {
      const productId = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === productId
      );

      if (!existing) return;

      state.totalQuantity -= existing.quantity;
      state.items = state.items.filter(
        (item) => item.product.id !== productId
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },

  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
