<template>
  <div>
    <h2>Popular plants</h2>
    <p>
      Want to "fernish" your home? Then you're in the right place! Take a look
      at our selection of plants below.
    </p>
    <div class="promo-blocks products">
      <product
        v-for="product in this.$store.getters.getAllProducts"
        v-bind:key="product.productId"
        v-bind:product="product"
      ></product>
    </div>
  </div>
</template>

<script>
  import Product from '../components/Product.vue';

  export default {
    name: 'Home',
    components: {
      Product,
    },
  };
</script>
