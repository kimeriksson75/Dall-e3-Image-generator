<template>
  <HelloWorld msg="Zup y'all" />
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped="sass">
.greeting-image {
  margin: 0 auto;
  text-align: center;
}
</style>
