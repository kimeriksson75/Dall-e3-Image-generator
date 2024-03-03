<template>
  <Loader class="loader" :isLoading="!isLoaded" />
  <div class="image-wrapper">
    <img
      :class="`v-image ${!isLoaded ? 'v-image-load' : 'v-image-loaded'}`"
      v-on:load="onImgLoaded"
      fluid
      :src="currentImage.image"
      :alt="currentImage.description"
    />
    <div v-if="currentImage?.image && isLoaded">
      <button @click="onRemoveImage" class="remove-image">X</button>
      <p>DALL·E3</p>
      <q
        ><strong>{{ currentImage?.description }}</strong></q
      >
      <details v-if="currentImage.revised_prompt">
        <summary>Revised prompt</summary>
        <p>{{ currentImage.revised_prompt }}</p>
        <a :href="currentImage.image" target="_blank">Image link:</a>
      </details>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  name: "ImageComponent",
  components: {
    Loader,
  },
  emits: ["removeImage"],
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
        if (this.image?.image) {
          this.currentImage = this.image;
          this.onImageLoading();
        }
      },
    },
  },
  data() {
    return {
      isLoaded: true,
      currentImage: {
        image: "",
        description: "",
        revised_prompt: "",
      },
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
    onRemoveImage() {
      // this.$store.dispatch("removeImage", this.image);
      this.$emit("removeImage", this.image);
    },
  },
};
</script>
<style scoped lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
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
  p {
    font-size: 16px;
    margin-bottom: 4px;
  }
  q {
    word-wrap: break-word;
    font-size: 16px;
    font-style: italic;
    font-weight: 200;
  }

  details {
    color: white;
    background-color: rgba(0, 0, 0, 1);
    padding: 8px;
    margin-top: 8px;
    border-radius: 5px;
    summary {
      // list-style-position: outside;
      // list-style-type: "▶";
      // cursor: pointer;
    }
    p {
      word-wrap: break-word;
    }
  }
  details[open] > summary {
    // list-style-type: "▼";
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
.v-image {
  filter: opacity(0) brightness(200%) blur(10px);
  transition: filter 0.7s;
}

.v-image-load {
  // fade to black
  filter: opacity(0) brightness(200%) blur(10px) !important;
  transition: filter 0.7s !important;
}
.v-image-loaded {
  filter: opacity(1) brightness(100%) blur(0);
}
</style>
