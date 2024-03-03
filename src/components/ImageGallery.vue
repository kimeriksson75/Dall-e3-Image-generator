<template>
  <div class="gallery">
    <div class="gallery__images">
      <img
        v-for="image in previousImages"
        @click="setSelectedImage($event)"
        :id="image.image"
        :key="image.image"
        :src="imageThumbnail(image.image)"
        :alt="image.description"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ImageGallery",
  data() {
    return {
      images: [],
    };
  },
  computed: {
    previousImages() {
      return this.$store.state.previousImages;
    },
  },
  methods: {
    setSelectedImage(event) {
      console.log("event", event.target.id);
      const image = this.previousImages.find(
        (img) => img.image === event.target.id
      );
      this.$emit("setSelectedImage", image);
    },
    imageThumbnail(image) {
      return image.replace("upload/", "upload/c_thumb,w_100,g_face/");
    },
  },
};
</script>
<style scoped lang="scss">
.gallery {
  p {
    margin-bottom: 10px;
  }
  .gallery__images {
    width: 100%;
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(50px, 100%/4, max(50px, 100%/3)), 1fr)
    );
    @media screen and (min-width: 768px) {
    }
    img {
      @media screen and (min-width: 768px) {
        width: 200px;
      }
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
