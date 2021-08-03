import { createStore } from 'vuex';
import { business } from '../store/modules/business';
import { products } from '../store/modules/products';
import { cart } from '../store/modules/cart';

export default createStore({
  state: {
    name: 'Daniel',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    business,
    cart,
    products,
  },
});
