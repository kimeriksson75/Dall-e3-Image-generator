<!-- LoginView.vue (Parent component) -->
<template>
  <h1>Login</h1>
  <Login @submit="handleSubmit" />
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  components: {
    Login,
  },
  methods: {
    async handleSubmit({ username, password }) {
      console.log(username, password);
      // Perform login logic here (e.g., API request, authentication)
      this.$store.dispatch("loginUser", { username, password });
    },
  },
};
</script>
<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
