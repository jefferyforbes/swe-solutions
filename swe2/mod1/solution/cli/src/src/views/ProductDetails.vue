<template>
  <div class="product-details" data-cy="product-details">
    <div class="product-details__main">
      <img v-if="product.productId" v-bind:src="getImage(product)" />
    </div>
    <aside>
      <h3>{{ product.name }}</h3>
      <p>
        {{ product.description }}
      </p>
      <p>&pound;{{ product.price }}</p>
      <button v-on:click="addToCart(product)">
        {{ product.addedToCart ? 'Remove from cart' : 'Add to cart' }}
      </button>
    </aside>
  </div>
</template>

<script>
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: {},
      };
    },
    methods: {
      getImage(product) {
        return product.images[1].imageSrc;
      },
      addToCart(product) {
        product.addedToCart = !product.addedToCart;
        this.$store.commit('updateCart', product.productId);
      },
    },
    mounted() {
      this.product = this.$store.getters.getProduct(
        this.$route.params.productId
      );
    },
  };
</script>
