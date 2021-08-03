export const business = {
  state: {
    brand: 'Plants Direct',
    address: '21 Sussex Gardens',
    city: 'London',
    postcode: 'SW1 01L',
  },
  getters: {
    getFullAddress(state) {
      return `${state.address}, ${state.city}, ${state.postcode}`;
    },
    getBrand(state) {
      return state.brand;
    },
  },
};
