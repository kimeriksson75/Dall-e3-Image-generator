<template>
  <div v-if="image.image" class="image-wrapper">
    <v-lazy-image
      :class="`${isLoaded ? '' : 'v-lazy-image-load'}`"
      :src="image.image"
      src-placeholder="https://placehold.co/1024x1024"
      :onload="onImgLoaded"
    />
    <div v-if="isLoaded">
      <button @click="removeImage" class="remove-image">X</button>
      <p>DALL·E3</p>
      <q
        ><strong>{{ image?.description }}</strong></q
      >
      <details v-if="image.revised_prompt">
        <summary>Revised prompt</summary>
        <p>{{ image.revised_prompt }}</p>
        <a :href="image.image" target="_blank">Image link:</a>
      </details>
      <Loader :isLoading="!isLoaded" />
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";
import Loader from "@/components/Loader.vue";

export default {
  name: "ImageComponent",
  components: {
    VLazyImage,
    Loader,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
    immediate: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    image: {
      immediate: true,
      handler() {
        console.log("Image changed", this.image);
        this.isLoaded = false;
      },
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
      console.log("Image loaded", this.isLoaded);
      this.isLoaded = true;
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
    animation: fadeIn 0.3s ease-in-out;
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
.v-lazy-image {
  filter: opacity(0) brightness(200%) blur(10px);
  transition: filter 0.7s;
}

.v-lazy-image-load {
  // fade to black
  filter: opacity(0) brightness(200%) blur(10px) !important;
  transition: filter 0.7s !important;
}
.v-lazy-image-loaded {
  filter: opacity(1) brightness(100%) blur(0);
}
</style>
