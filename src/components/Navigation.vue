<template>
  <Burger />
  <nav
    class="nav"
    :class="`${this.$store.state.hasNavigation ? 'nav-open' : ''}`"
  >
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" v-if="isLoggedIn" to="/image-generator"
      >Generate image</router-link
    >
    <router-link class="link" v-if="!isLoggedIn" to="/create-user"
      >Create user</router-link
    >
    <router-link class="link" v-if="!isLoggedIn" to="/login">Login</router-link>
    <User />
    <ConnectionState />
  </nav>
</template>

<script>
import User from "@/components/User.vue";
import ConnectionState from "@/components/ConnectionState.vue";
import Burger from "@/components/Burger.vue";
export default {
  name: "NavigationComponent",
  components: {
    Burger,
    User,
    ConnectionState,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  created() {
    // toggle Menu on new route
    this.$router.afterEach(() => {
      this.$store.dispatch("toggleNavigation", false);
    });
  },
  methods: {
    toggleNavigation() {
      this.$store.dispatch("toggleNavigation");
    },
  },
};
</script>
