const products = {
  state: {
    products: [
      {
        productId: 1,
        name: 'Boston Fern',
        description:
          'Nephrolepis exaltata, known as the sword fern or Boston fern, is a species of fern in the family Lomariopsidaceae native to tropical regions throughout the world.',
        features: ['Moisture loving', 'Easy care', 'Dislikes direct sun'],
        stockLevel: 5,
        images: [
          {
            imageId: 1,
            size: 'small',
            title: 'Small Boston Fern',
            imageSrc: './images/boston_fern_sm.jpg',
          },
          {
            imageId: 2,
            size: 'large',
            title: 'Large Boston Fern',
            imageSrc: './images/boston_fern_sm.jpg',
          },
        ],
        price: 1.99,
        addedToCart: false,
      },
      {
        productId: 2,
        name: 'Maidenhair Fern',
        description:
          'Adiantum, the maidenhair fern, is a genus of about 250 species of ferns in the subfamily Vittarioideae of the family Pteridaceae.',
        features: ['Moisture loving', 'Easy care', 'Dislikes direct sun'],
        stockLevel: 5,
        images: [
          {
            id: 1,
            size: 'small',
            title: 'Small Boston Fern',
            imageSrc: './images/maidenhair_fern_sm.jpg',
          },
          {
            id: 2,
            size: 'large',
            title: 'Large Boston Fern',
            imageSrc: './images/maidenhair_fern_sm.jpg',
          },
        ],
        price: 6.99,
        addedToCart: false,
      },
      {
        productId: 3,
        name: 'Tree Fern',
        description:
          'The tree ferns are the ferns that grow with a trunk elevating the fronds above ground level.',
        features: ['Moisture loving', 'Easy care', 'Dislikes direct sun'],
        stockLevel: 5,
        images: [
          {
            id: 1,
            size: 'small',
            title: 'Small Boston Fern',
            imageSrc: './images/tree_fern_sm.jpg',
          },
          {
            id: 2,
            size: 'large',
            title: 'Large Boston Fern',
            imageSrc: './images/tree_fern_sm.jpg',
          },
        ],
        price: 3.99,
        addedToCart: false,
      },
    ],
  },
  getters: {
    getAllProducts(state) {
      return state.products;
    },
    getProduct: (state) => (productId) => {
      return state.products.find(
        (product) => product.productId === parseInt(productId)
      );
    },
  },
};

const cart = {
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

const business = {
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

const store = new Vuex.Store({
  modules: {
    products,
    cart,
    business,
  },
});

const Product = Vue.component('Product', {
  template: `
    <div class="product">
      <h3>{{product.name}}</h3>
      <img 
        v-bind:src="getImageSrc(product)" 
        v-bind:title="getImageTitle(product)" 
      />
      <p>
        {{ this.description }}
      </p>
      <ul v-for="feature in this.product.features">
        <li>{{feature}}</li>
      </ul>
      <p>&pound;{{product.price}}</p>
      <div class="promo-blocks__actions">  
      <router-link 
        v-bind:to="{ name: 'productDetails', params: {productId: product.productId} }" 
        v-on:add-to-cart="addToCart"
        class="anchor--button"
      >
        Full Details
      </router-link>       
      <button v-on:click="addToCart(product)" data-cy="addToCartBtn">
         {{ product.addedToCart ? "Remove from cart" : "Add to cart" }}
      </button>
      </div>
    </div>
  `,
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
});

const Home = Vue.component('Home', {
  template: `
    <div>
      <h2>Popular plants</h2>
      <p>
        Want to "fernish" your home? Then you're in the right place! Take a
        look at our selection of plants below.
      </p>
      <div class="promo-blocks products">
        <product
          v-for="product in getAllProducts"
          v-bind:key="product.productId"
          v-bind:product="product"
        ></product>
      </div>
    </div>
  `,
  props: ['products'],
  computed: {
    getAllProducts() {
      return this.$store.getters.getAllProducts;
    },
  },
});

const ProductDetails = Vue.component('Product-Details', {
  template: `
    <div class="product-details">
      <div class="product-details__main">
        <img
          v-if="product.productId"
          v-bind:src="getImage(product)"
        />
      </div>
      <aside>
        <h3>{{product.name}}</h3>
        <p>
          {{product.description}}
        </p>
        <p>
          &pound;{{product.price}}
        </p>
        <button v-on:click="addToCart(product)" data-cy="addToCartBtn">
          {{product.addedToCart ? "Remove from cart" : "Add to cart"}}
        </button>
      </aside>
    </div>
  `,
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
    this.product = this.$store.getters.getProduct(this.$route.params.productId);
  },
});

const Navbar = Vue.component('Navbar', {
  template: `
    <div class="navbar">
      <div class="navbar__inner">
        <div class="container">
          <div class="navbar__heading">
            <h1>
              <a href="/">
                Plants Direct
                <span class="heading__sub">"Our plants, your passion"</span>
              </a>
            </h1>
          </div>
          <ul class="navbar__navigation">
            <li><router-link to="/" data-cy="home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
          <div class="cart">Cart ({{$store.getters.getCartLength}})</div>
        </div>
      </div>
    </div>
  `,
});

const Footer = Vue.component('Footer', {
  template: `
    <footer>
      <div class="container">
        <p data-cy="copyright">&copy; {{ footerCopyrightNotice }}</p>
        <p data-cy="address">{{ footerAddress }}</p>
      </div>
    </footer>
  `,
  computed: {
    footerCopyrightNotice() {
      return '2021 ' + store.getters.getBrand;
    },
    footerAddress() {
      return store.getters.getFullAddress;
    },
  },
});

const About = Vue.component('About', {
  template: `
    <div>
      <h2>About us</h2>
      <p>
        Apprentices will add more content here.
      </p>
    </div>
  `,
});

const Contact = Vue.component('Contact', {
  template: `
    <div>
      <h2>Contact us</h2>
      <p>
        Apprentices will add more content here.
      </p>
    </div>
  `,
});

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: '/product/:productId',
      component: ProductDetails,
      name: 'productDetails',
      props: true,
    },
  ],
});

var app = new Vue({
  router,
  store,
  el: '#app',
  template: `
    <div>
      <Navbar />
      <main>
        <div class="container">
          <router-view />
        </div>
      </main>
      <Footer />
    </div>
  `,
});
