<template>
  <div class="container">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
    <Navigation />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Navigation,
  },
};
</script>

<style lang="scss">
@import url("./styles/main.scss");
</style>
