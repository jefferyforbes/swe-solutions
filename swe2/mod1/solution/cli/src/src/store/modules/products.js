export const products = {
  state: {
    products: null,
  },
  getters: {
    getNProducts: (state) => (n) => {
      return state.products.filter((element, index) => index < n);
    },
    getProduct: (state) => (productId) => {
      return state.products.find(
        (product) => product.productId === parseInt(productId)
      );
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
};
