<template>
  <CreateUser @submit="handleCreateUser" />
</template>
<script>
import CreateUser from "@/components/CreateUser.vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
export default {
  components: {
    CreateUser,
  },
  methods: {
    async handleCreateUser(form) {
      const { username, email, password } = form;
      if (!username || !email || !password) {
        return;
      }

      this.$store
        .dispatch("createUser", form)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response?.message);
          }
          this.$router.push("/login");
          $toast.open({
            message: `${form?.username} is created`,
            type: "success",
            position: "bottom",
          });
        })
        .catch((error) => {
          console.error("handleCreateUser", error);
          $toast.open({
            message: `Oops: ${error.message}`,
            type: "error",
            position: "bottom",
          });
        });
    },
  },
};
</script>
