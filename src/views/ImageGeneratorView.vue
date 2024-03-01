<template>
  <div class="image-generator">
    <ImageGeneratorTopBar
      @generateImage="generateImage"
      :isLoading="isLoading"
    />
    <Image :image="image" @removeImage="removeImage" />
    <ImageGeneratorSideBar
      @generateImage="generateImage"
      @setSelectedImage="setSelectedImage"
      :image="image"
      :isLoading="isLoading"
    />
  </div>
</template>

<script>
import Image from "@/components/Image.vue";
import ImageGeneratorTopBar from "@/components/ImageGeneratorTopBar.vue";
import ImageGeneratorSideBar from "@/components/ImageGeneratorSideBar.vue";
import "vue-toast-notification/dist/theme-sugar.css";
import { useToast } from "vue-toast-notification";
import { useSocketIO } from "@/socket";

const $toast = useToast();
export default {
  name: "ImageGeneratorView",
  created() {
    if (!this.$store.state.user) {
      this.$router.push("/login");
    }
    const { socket } = useSocketIO();
    this.socketInstance = socket;
    this.socketInstance.on("connect", () => {});
    this.socketInstance.on("disconnect", () => {});
    this.socketInstance.on("error", (error) => {
      this.isLoading = false;

      $toast.open({
        message: `Error from server: ${error.message}`,
        type: "error",
        position: "bottom",
      });
    });
    this.socketInstance.on("generateImageInitiated", () => {
      $toast.open({
        message: `${this.description} is on its way!`,
        type: "success",
        position: "bottom",
      });
    });
    this.socketInstance.on("generateImageResponse", (data) => {
      console.log("generateImageResponse", data);
      if (!this.isLoading) {
        return;
      }
      this.isLoading = false;
      try {
        const { secure_url, prompt, revised_prompt } = data;
        this.description = prompt;
        if (!secure_url || !revised_prompt) {
          throw new Error("No image data generated");
        }
        this.image = {
          image: secure_url,
          description: prompt,
          revised_prompt,
        };
        this.$store.dispatch("addImage", this.image);

        $toast.open({
          message: `${this.description} has been generated`,
          type: "success",
          position: "bottom",
        });
      } catch (error) {
        $toast.open({
          message: `Error generating image due to: ${error.message}`,
          type: "error",
          position: "bottom",
        });
      }
    });
  },
  components: {
    Image,
    ImageGeneratorSideBar,
    ImageGeneratorTopBar,
  },

  data() {
    return {
      image: {},
      description: "",
      previousImages: this.$store.state.previousImages,
      isLoading: false,
      socketInstance: null,
    };
  },
  methods: {
    setSelectedImage(image) {
      console.log("image", image);
      this.image = image;
    },
    removeImage(image) {
      const { description } = image;
      this.$store.dispatch("removeImage", image);
      this.image = {};
      $toast.open({
        message: `${description} has successfully been removed`,
        type: "success",
        position: "bottom",
      });
    },
    async generateImage(description) {
      this.isLoading = true;
      this.description = description;
      try {
        this.socketInstance.emit("generateImage", description);
      } catch (error) {
        console.error("Error generating image", error);
        this.isLoading = false;
        $toast.open({
          message: `Error generating image due to: ${error.message}`,
          type: "error",
          position: "bottom",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.image-generator {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
