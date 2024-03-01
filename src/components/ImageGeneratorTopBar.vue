<template>
  <form @submit.prevent="generateImage">
    <label for="description"
      ><a href="https://openai.com/dall-e-3">Dall-e3</a> is listening</label
    >
    <input
      type="search"
      id="description"
      placeholder="e.g. oceans of love"
      required
      v-model="description"
    />
    <div class="button-group">
      <button type="submit" :disabled="isLoading">Go</button>
    </div>
    <Loader :isLoading="isLoading" />
  </form>
</template>
<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "ImageGeneratorSideBar",
  components: {
    Loader,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: false,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      description: "",
      expanded: true,
    };
  },
  methods: {
    generateImage() {
      this.$emit("generateImage", this.description);
    },
  },
};
</script>
<style lang="scss" scoped>
.image-generator-ui {
  // max-width: 64px;
  padding: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  width: auto;
  height: auto;
}
form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  transition: all 0.3s ease-in-out;

  button {
    width: 100%;
  }

  .button-group {
    display: flex;
    flex-direction: row;
  }
}
label {
  flex-basis: 100%;
  margin-left: 48px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  margin-left: 48px;
}
</style>
