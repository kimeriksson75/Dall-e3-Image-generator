<template>
  <input
    class="side-menu"
    type="checkbox"
    id="side-menu"
    :checked="this.$store.state.hasNavigation"
    @change="toggleNavigation"
  />
  <label class="burger" htmlFor="side-menu">
    <span class="burger-line"></span>
  </label>
</template>

<script>
export default {
  name: "BurgerComponent",
  methods: {
    toggleNavigation() {
      event.preventDefault();
      this.$store.dispatch("toggleNavigation");
    },
  },
};
</script>
