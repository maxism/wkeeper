import Vue from 'vue';
import VueRouter from 'vue-router';
import Products from './components/Products.vue';
import ProductEdit from './components/ProductEdit.vue';
import ProductNew from './components/ProductNew.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'products',
            path: '/products',
            component: Products,
        },
        {
            name: 'productEdit',
            path: '/products/:id',
            props: true,
            component: ProductEdit,
        },
        {
            name: 'new',
            path: '/products/new',
            component: ProductNew,
        },
    ],
});
