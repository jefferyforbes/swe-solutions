const store = new Vuex.Store({
  state: {
    cart: [],
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
  mutations: {
    updateCart(state, productId) {
      if (!state.cart.includes(productId)) {
        return state.cart.push(productId);
      }
      state.cart.splice(state.cart.indexOf(productId), 1);
    },
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
    getCartLength(state) {
      return state.cart.length;
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
        <button
            v-bind:disabled="product.stockLevel === 0"
            v-bind:class="{'button--disabled': product.stockLevel === 0}"
            @click="addToCart(product)"
            >
            {{product.addedToCart ? "Remove from cart" : "Add to cart"}}
        </button>
        <span v-if="product.stockLevel === 0">Out of stock :(</span>
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
    this.product = store.getters.getProduct(this.$route.params.productId);
  },
});

const Product = Vue.component('Product', {
  template: `
    <div class="product">
      <h3>{{product.name}}</h3>
      <img
        v-bind:src="getImage(product)"
      />

      <p>{{product.description}}</p>
      <ul>
        <li v-for="feature in product.features">{{feature}}</li>
      </ul>

      <p>&pound;{{product.price}}</p>

      <div class="promo-blocks__actions">
      <router-link 
        v-bind:to="{ name: 'productDetails', params: {productId: product.productId }}" 
      
        @add-to-cart="addToCart"
        class="button--anchor">
        Full Details
      </router-link>        
      <button
          v-bind:disabled="product.stockLevel === 0"
          v-bind:class="{'button--disabled': product.stockLevel === 0}"
          @click="addToCart(product)"
          >
          {{product.addedToCart ? "Remove from cart" : "Add to cart"}}
        </button>
        <span v-if="product.stockLevel === 0">Out of stock :(</span>
      </div>
    </div>
  `,
  props: ['product'],
  methods: {
    getImage(product) {
      return product.images[0].imageSrc;
    },
    addToCart(product) {
      product.addedToCart = !product.addedToCart;
      this.$store.commit('updateCart', product.productId);
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

      <div class="promo-section promo">
        <h2>Why keep houseplants?</h2>
        <p>
          Plants are known to have a calming effect on our nervous systems,
          but the benefits don't stop there.
        </p>
        <div class="promo-blocks">
          <div>
            <h3>Clean air</h3>
            <img src="./images/fresh_air_sm.jpg" />
            <p>
              Sed ut perspiciatis, unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem
              aperiam eaque ipsa
            </p>
          </div>
          <div>
            <h3>Nervous system</h3>
            <img src="./images/fresh_air_sm.jpg" />
            <p>
              Sed ut perspiciatis, unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem
              aperiam eaque ipsa
            </p>
          </div>
          <div>
            <h3>Great hobby</h3>
            <img src="./images/fresh_air_sm.jpg" />
            <p>
              Sed ut perspiciatis, unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium, totam rem
              aperiam eaque ipsa
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    getAllProducts() {
      return store.getters.getAllProducts;
    },
  },
});

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      props: true,
    },
    {
      path: '/products/:productId',
      name: 'productDetails',
      component: ProductDetails,
      props: true,
    },
  ],
});

new Vue({
  router,
  store,
}).$mount('#app');
