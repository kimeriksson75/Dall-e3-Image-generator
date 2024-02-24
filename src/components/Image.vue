<template>
  <div v-if="image.image" class="image-wrapper">
    <button @click="removeImage" class="remove-image">X</button>
    <i class="fas fa-times"></i>
    <img :src="image.image" alt="Generated Image" />
    <p>DALL·E3</p>
    <q
      ><strong>{{ image?.description }}</strong></q
    >
  </div>
</template>

<script>
export default {
  name: "ImageComponent",
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeImage() {
      // this.$store.dispatch("removeImage", this.image);
      this.$emit("removeImage", this.image);
    },
  },
};
</script>
<style scoped lang="scss">
.image-wrapper {
  position: relative;
  transition: all 0.3s ease-in-out;

  img {
    max-width: 100%;
    border-radius: 5px;
  }

  button {
    position: absolute;
    top: 8px;
    right: 10px;
    background-color: transparent;
    border-radius: 5px;
    padding: 6px 12px;
    z-index: 1;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
