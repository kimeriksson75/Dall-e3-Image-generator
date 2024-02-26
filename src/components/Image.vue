<template>
  <div v-if="image.image" class="image-wrapper">
    <button @click="removeImage" class="remove-image">X</button>
    <i class="fas fa-times"></i>
    <img :src="image.image" alt="Generated Image" />
    <p>DALL·E3</p>
    <q
      ><strong>{{ image?.description }}</strong></q
    >
    <details v-if="image.revised_prompt">
      <summary>Revised prompt</summary>
      <p>{{ image.revised_prompt }}</p>
      <p>Image link: {{ image.url }}</p>
    </details>
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

  details {
    margin-top: 8px;
    padding: 12px 16px;
    background-color: #42b983;
    border-radius: 5px;
    color: #fff;
    summary {
      list-style-position: outside;
      margin-left: 12px;
      padding-left: 8px;
      list-style-type: "▶";
      cursor: pointer;
    }
  }
  details[open] > summary {
    list-style-type: "▼";
  }
}
</style>
