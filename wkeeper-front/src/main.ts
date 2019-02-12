import Vue from 'vue';
import App from './App.vue';

import router from './router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
