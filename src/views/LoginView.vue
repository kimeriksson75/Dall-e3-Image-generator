<!-- LoginView.vue (Parent component) -->
<template>
  <h1>Login</h1>
  <Login @submit="handleSubmit" />
</template>

<script>
import Login from "@/components/Login.vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast();

export default {
  components: {
    Login,
  },
  methods: {
    async handleSubmit(form) {
      if (!form) {
        return;
      }
      const { username, password } = form;
      if (!username || !password) {
        return;
      }

      this.$store
        .dispatch("loginUser", { username, password })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response?.message);
          }
          this.$router.push("/");
          $toast.open({
            message: `${this.$store?.state?.user?.username} is logged in`,
            type: "success",
            position: "bottom",
          });
        })
        .catch((error) => {
          console.error("handleSubmit", error);
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
<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
