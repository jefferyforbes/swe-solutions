<template>
  <div class="product" data-cy="product">
    <h3>{{ product.name }}</h3>
    <img
      v-bind:src="getImageSrc(product)"
      v-bind:title="getImageTitle(product)"
    />
    <p>
      {{ product.description }}
    </p>
    <ul v-for="feature in product.features" v-bind:key="feature">
      <li>{{ feature }}</li>
    </ul>
    <p>&pound;{{ product.price }}</p>
    <p v-if="product.stockLevel === 0">Out of stock :(</p>
    <div class="promo-blocks__actions">
      <router-link
        v-bind:to="{
          name: 'productDetails',
          params: { productId: product.productId },
        }"
        v-on:add-to-cart="addToCart"
        class="anchor--button"
        data-cy="product--link"
      >
        Full Details
      </router-link>
      <button
        v-on:click="addToCart(product)"
        v-if="product.stockLevel > 0"
        data-cy="product--addToCart"
      >
        {{ product.addedToCart ? 'Remove from cart' : 'Add to cart' }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: ['product'],
    methods: {
      addToCart(product) {
        product.addedToCart = !product.addedToCart;
        this.$store.commit('updateCart', product.productId);
      },
      getImageSrc(product) {
        return product.images[0].imageSrc;
      },
      getImageTitle(product) {
        return product.images[0].title;
      },
    },
  };
</script>
