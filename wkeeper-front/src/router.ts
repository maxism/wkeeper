import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from './components/NotFound.vue';
import ProductEdit from './components/ProductEdit.vue';
import ProductNew from './components/ProductNew.vue';
import Products from './components/Products.vue';
import DefaultPage from '@/pages/DefaultPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'products',
      path: '/products',
      component: DefaultPage,
      components: {
        default: Products,
      },
    },
    {
      name: 'new',
      path: '/products/new',
      component: ProductNew,
    },
    {
      name: 'productEdit',
      path: '/products/:id',
      props: true,
      component: ProductEdit,
    },
    {
      name: 'notFound',
      path: '*',
      component: NotFound,
    },
  ],
});
