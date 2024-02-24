<template>
  <div class="hello">
    <img class="greeting-image" alt="Vue logo" src="../assets/logo.png" />

    <h1>{{ msg }}</h1>
    <p>
      This has become my experimental area for learning Vue.js. Please try out
      the
      <a href="/image-generator" target="_self" rel="noopener"
        >image generator</a
      >
      and let me know what you think.
    </p>
    <h3>Much appreciated</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin: 20px;
  // font-size: 2em;
  text-align: center;
  max-width: 350px;
  margin: 0 auto;

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>
