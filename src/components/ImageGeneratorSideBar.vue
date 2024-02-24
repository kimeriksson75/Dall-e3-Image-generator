<template>
  <aside>
    <div class="image-generator-ui">
      <form @submit.prevent="generateImage">
        <p><strong>Generate an image</strong></p>
        <Divider />
        <label for="description"
          >Tell <a href="https://openai.com/dall-e-3">Dall-e3</a> what you would
          you like to see</label
        >
        <input
          type="text"
          id="description"
          placeholder="e.g. oceans of love"
          required
          v-model="description"
        />
        <div class="button-group">
          <button type="submit" :disabled="isLoading">Generate</button>
          <button type="reset" @click="description = ''">Reset</button>
        </div>
        <Download
          v-if="image.image"
          :imageUrl="image.image"
          imageFileName="generated-image"
        />
      </form>
      <Loader v-if="isLoading" />
      <!-- <label for="previousImages">or</label>
      <select @change="setSelectedImage($event)" v-if="previousImages.length">
        <option value="">Select previous image</option>
        <option
          v-for="image in previousImages"
          :key="image.image"
          :value="image.image"
        >
          {{ image.description }}
        </option>
      </select> -->
      <Divider />
      <ImageGallery
        v-if="previousImages.length"
        @setSelectedImage="setSelectedGalleryImage($event)"
      />
      <Divider />
      <p>
        Get some
        <a href="https://anakin.ai/blog/best-dalle-3-prompts/" target="_blank"
          >inspiration</a
        >.
      </p>
    </div>
  </aside>
</template>

<script>
import Divider from "@/components/Divider.vue";
import Loader from "@/components/Loader.vue";
import Download from "@/components/Download.vue";
import ImageGallery from "@/components/ImageGallery.vue";
export default {
  name: "ImageGeneratorSideBar",
  components: {
    Divider,
    Loader,
    Download,
    ImageGallery,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      description: "",
    };
  },
  computed: {
    previousImages() {
      return this.$store.state.previousImages;
    },
  },
  methods: {
    generateImage() {
      this.$emit("generateImage", this.description);
    },
    setSelectedImage(event) {
      this.$emit("setSelectedImage", event.target.value);
    },
    setSelectedGalleryImage(image) {
      this.$emit("setSelectedImage", image);
    },
  },
};
</script>
<style scoped lang="scss">
.image-generator-ui {
  max-width: 300px;
  padding: 24px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;

    max-width: 300px;

    button {
      width: 100%;
    }

    .button-group {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
    }
  }
  label {
    margin-bottom: 10px;
  }
  input {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  select {
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAMAAACtdX32AAAAdVBMVEUAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhMdQaAAAAJ3RSTlMAAAECAwQGBwsOFBwkJTg5RUZ4eYCHkJefpaytrsXGy8zW3+Do8vNn0bsyAAAAYElEQVR42tXROwJDQAAA0Ymw1p9kiT+L5P5HVEi3qJn2lcPjtIuzUIJ/rhIGy762N3XaThqMN1ZPALsZPEzG1x8LrFL77DHBnEMxBewz0fJ6LyFHTPL7xhwzWYrJ9z22AqmQBV757MHfAAAAAElFTkSuQmCC);
    background-position: 100%;
    background-repeat: no-repeat;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }
}
</style>
