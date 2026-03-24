export const selectAllProducts = (state) =>
  state.products.items;

export const selectSelectedProduct = (state) =>
  state.products.selectedProduct;

export const selectProductLoading = (state) =>
  state.products.loading;

export const selectSearchQuery = (state) =>
  state.products.searchQuery || "";

export const selectFilteredProducts = (state) => {
  const products = state.products.items || [];
  const query = (state.products.searchQuery || "").toLowerCase();

  // 🔍 FILTER BY SEARCH QUERY (all categories)
  if (!query) return products;

  return products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
};

