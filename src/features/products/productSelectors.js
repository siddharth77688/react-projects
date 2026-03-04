export const selectAllProducts = (state) =>
  state.products.items;

export const selectProductLoading = (state) =>
  state.products.loading;

export const selectSearchQuery = (state) =>
  state.products.searchQuery || "";

export const selectFilteredProducts = (state) => {
  const products = state.products.items || [];
  const query = (state.products.searchQuery || "").toLowerCase();

  // ✅ ONLY ELECTRONICS / MOBILES
  const electronicsOnly = products.filter(
    (product) => product.category === "electronics"
  );

  // 🔍 SEARCH WITHIN ELECTRONICS
  if (!query) return electronicsOnly;

  return electronicsOnly.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
};

