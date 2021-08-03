<template>
  <footer data-cy="footer">
    <div class="container">
      <p>&copy; {{ footerCopyrightNotice }}</p>
      <p>{{ footerAddress }}</p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    computed: {
      footerCopyrightNotice() {
        return '2021 ' + this.$store.getters.getBrand;
      },
      footerAddress() {
        return 'Our address: ' + this.$store.getters.getFullAddress;
      },
    },
  };
</script>
