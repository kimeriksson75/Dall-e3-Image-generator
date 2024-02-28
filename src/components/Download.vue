<template>
  <div class="download">
    <p for="image">and</p>
    <button @click="downloadImage">Download image</button>
  </div>
</template>

<script>
export default {
  name: "DownloadImageButton",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    imageFileName: {
      type: String,
      required: true,
    },
  },
  methods: {
    downloadImage() {
      // create element <a> for download Image
      const link = document.createElement("a");
      link.href = this.imageUrl;
      link.target = "_blank";
      link.download = this.imageFileName;

      // Simulate a click on the element <a>
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
<style scoped lang="scss">
.download {
  button {
    width: 100%;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 10px;
  }
}
</style>
