<template>
  <div class="navbar" data-cy="navbar">
    <div class="navbar__inner">
      <div class="container">
        <div class="navbar__heading">
          <router-link to="/">
            Plants Direct
            <span class="heading__sub">"Our plants, your passion"</span>
          </router-link>
        </div>
        <ul class="navbar__navigation" data-cy="navbar--home">
          <li>
            <router-link to="/" data-cy="navbar--link">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/about" data-cy="navbar--link">About</router-link>
          </li>
          <li>
            <router-link to="/contact" data-cy="navbar--link">
              Contact
            </router-link>
          </li>
        </ul>
        <div class="navbar__cart">
          Cart ({{ $store.getters.getCartLength }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
  };
</script>
