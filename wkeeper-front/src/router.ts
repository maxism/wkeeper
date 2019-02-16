import Vue from 'vue';
import VueRouter from 'vue-router';
import Products from './components/Products.vue';
import ProductEdit from './components/ProductEdit.vue';
import ProductNew from './components/ProductNew.vue';
import NotFound from './components/NotFound.vue';

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
