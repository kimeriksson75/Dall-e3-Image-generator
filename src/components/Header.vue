<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/image-generator">Generate image</router-link>
    </nav>
    <div class="button-group">
      <User />
      <ConnectionState />
    </div>
  </header>
</template>

<script>
import User from "@/components/User.vue";
import ConnectionState from "@/components/ConnectionState.vue";
export default {
  name: "HeaderComponent",
  components: {
    User,
    ConnectionState,
  },
};
</script>
