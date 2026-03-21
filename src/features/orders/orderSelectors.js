export const selectOrders = (state) => state.orders.orders;

export const selectOrderById = (orderId) => (state) =>
  state.orders.orders.find((o) => o.id === orderId);

