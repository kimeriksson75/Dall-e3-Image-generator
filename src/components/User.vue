<!-- Logout.vue (Logout component) -->
<template>
  <button v-if="isLoggedIn" @click="logout">
    {{ `Logout ${user.username}` }}
  </button>
</template>

<script>
export default {
  name: "UserComponent",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped lang="scss">
button {
  background-color: transparent;
  color: #42b983;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
    background: transparent;
  }
}
</style>
