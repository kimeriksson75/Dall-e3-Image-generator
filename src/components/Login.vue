<!-- Login.vue (Login component) -->
<template>
  <form class="form" @submit.prevent="submit">
    <label>Username:</label>
    <input type="text" v-model="form.username" />
    <label>Password:</label>
    <input type="password" v-model="form.password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      console.log("submit");
      this.$emit("submit", this.form);
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 24px;
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
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
button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
</style>
