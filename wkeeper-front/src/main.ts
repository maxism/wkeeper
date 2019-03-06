import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';

const defaultApiURL = 'http://localhost:3000/api';
const envApiURL = process.env.VUE_APP_API_URL;

axios.defaults.baseURL = envApiURL || defaultApiURL;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
