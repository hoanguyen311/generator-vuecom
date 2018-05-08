
<template>
  <p class="vuecom">
    <strong>{{text}}</strong><br />
    Source code: <pre>./src/index.vue</pre>
  </p>
</template>
<style lang="scss">
.vuecom {
  border: 2px dashed salmon;
  margin: 10px;
  padding: 10px;
  color: darkslategray;
  strong {
    display: block;
    color: steelblue;
    margin-bottom: 2px;
  }
  pre {
    display: inline;
  }
}
</style>
<script>
  export default {
    data() {
      return {
        text: "<%= className  %>"
      }
    }
  }
</script>
