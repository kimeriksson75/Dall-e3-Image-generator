<template>
  <form class="form" @submit.prevent="submit">
    <label for="username">Username</label>
    <input required type="text" id="username" v-model="form.username" />
    <label for="email">Email</label>
    <input required type="email" id="email" v-model="form.email" />
    <label for="password">Password</label>
    <input required type="password" id="password" v-model="form.password" />
    <button type="submit">Create user</button>
  </form>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>
<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 24px;
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
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
}
</style>
