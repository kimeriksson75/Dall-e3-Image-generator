<template>
  <div v-if="image.image" class="image-wrapper">
    <button @click="removeImage" class="remove-image">X</button>
    <div v-show="!isLoaded">Loading...</div>
    <img
      :src="image.image"
      alt="Generated Image"
      v-show="isLoaded"
      @load="onImgLoaded"
      @loading="onImageLoading"
    />
    <p>DALL·E3</p>
    <q
      ><strong>{{ image?.description }}</strong></q
    >
    <details v-if="image.revised_prompt">
      <summary>Revised prompt</summary>
      <p>{{ image.revised_prompt }}</p>
      <a :href="image.image" target="_blank">Image link:</a>
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
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    onImageLoading() {
      this.isLoaded = false;
      console.log("Image is loading!", this.isLoaded);
    },
    onImgLoaded() {
      this.isLoaded = true;
      console.log("Image loaded", this.isLoaded);
    },
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
  margin: 0 auto;
  max-width: 1024px;
  img {
    max-width: 100%;
    border-radius: 5px;
    margin-bottom: 8px;
  }
  q {
    word-wrap: break-word;
    font-size: 16px;
    font-style: italic;
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
    padding: 12px 4px;
    border-radius: 5px;
    summary {
      list-style-position: outside;
      list-style-type: "▶";
      cursor: pointer;
    }
    p {
      word-wrap: break-word;
    }
  }
  details[open] > summary {
    list-style-type: "▼";
  }
}
</style>
