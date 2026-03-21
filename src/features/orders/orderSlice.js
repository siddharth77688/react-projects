import { createSlice, nanoid } from "@reduxjs/toolkit";

export const ORDER_STATUSES = [
  "Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: {
      reducer(state, action) {
        state.orders.unshift(action.payload);
      },
      prepare({ items, totalAmount, orderDate, status }) {
        const normalizedStatus = ORDER_STATUSES.includes(status)
          ? status
          : "Placed";
        return {
          payload: {
            id: nanoid(),
            items,
            totalAmount,
            orderDate,
            status: normalizedStatus,
          },
        };
      },
    },
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      if (!ORDER_STATUSES.includes(status)) return;
      const existing = state.orders.find((o) => o.id === orderId);
      if (!existing) return;
      existing.status = status;
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { createOrder, updateOrderStatus, clearOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;

