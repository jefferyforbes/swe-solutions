export const cart = {
  state: {
    cart: [],
  },
  mutations: {
    updateCart(state, productId) {
      if (!state.cart.includes(productId)) {
        return state.cart.push(productId);
      }
      state.cart.splice(state.cart.indexOf(productId), 1);
    },
  },
  getters: {
    getCartLength(state) {
      return state.cart.length;
    },
  },
};
