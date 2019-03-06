<template>
  <div class="products another-default-page-classs">
    <notifications/>
    <slot name="leftPanel"/>
    <slot/>
  </div>
</template>

<script>
export default {
  watch: {
    $route () {
      this.$store.dispatch('хуй')
    }
  }
}
</script>


<style scoped>
.another-default-page-classs {
  max-width: 1280px;
  min-height: 400px;
  background: red;
  margin: auto;
}
</style>
