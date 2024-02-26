<template>
  <h1>Create User</h1>
  <CreateUser @submit="handleCreateUser" />
</template>
<script>
const server = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";
const version = process.env.VUE_APP_VERSION || "v1";
import CreateUser from "@/components/CreateUser.vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
export default {
  components: {
    CreateUser,
  },
  methods: {
    async handleCreateUser(form) {
      console.log("handleCreateUser", form);
      if (!form) {
        return;
      }
      const { username, email, password } = form;
      if (!username || !email || !password) {
        return;
      }
      console.log("handleCreateUser", username, email, password);
      const response = await fetch(`${server}/api/${version}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        this.$router.push("/login");
        $toast.open({
          message: `${username} is created`,
          type: "success",
          position: "bottom",
        });
      } else {
        const error = await response.json();
        $toast.open({
          message: `Oops: ${error.message}`,
          type: "error",
          position: "bottom",
        });
      }
    },
  },
};
</script>
