<template>
  <Navbar />
  <main>
    <div class="container">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import productsJson from '../json/products.test.json';

  export default {
    name: 'App',

    mounted() {
      this.$store.commit('setProducts', productsJson);
    },

    components: {
      Navbar,
      Footer,
    },
  };
</script>
