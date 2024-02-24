<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/image-generator">Generate image</router-link>
    </nav>
    <User />
  </header>
</template>

<script>
import User from "@/components/User.vue";
export default {
  name: "HeaderComponent",
  components: {
    User,
  },
};
</script>
