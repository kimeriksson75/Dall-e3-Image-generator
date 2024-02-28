<template>
  <header>
    <!-- <div>Logo</div> -->
    <h1>{{ currentRouteHeader }}</h1>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  created() {
    this.$router.afterEach((value) => {
      this.currentRouteHeader = this.routes[value.name];
      console.log(this.currentRouteHeader);
    });
  },
  data() {
    return {
      routes: {
        home: "Home",
        login: "Login",
        "create-user": "Create User",
        "image-generator": "Dall-e3 generator",
      },
      currentRouteHeader: "",
    };
  },
};
</script>
