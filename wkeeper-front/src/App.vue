<template>
    <div id="app">
        <router-link :to="{ name: 'products' }">Home</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Products from './components/Products.vue';
import ProductEdit from './components/ProductEdit.vue';
import ProductNew from './components/ProductNew.vue';
//import ImageInput from './components/ImageInput.vue';
import NotFound from './components/NotFound.vue';

@Component({
  components: {
      Products,
      ProductEdit,
      ProductNew,
      //ImageInput,
      NotFound,
  },
})
export default class App extends Vue {}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
