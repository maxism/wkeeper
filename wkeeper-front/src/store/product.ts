import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/api';
import { EventBus } from '@/utils';
import Axios from 'axios';

Vue.use(Vuex);

const state = {
  // source of data
  products: [],
  countries: [
    { id: 1, name: 'Россия' },
    { id: 2, name: 'Германия' },
    { id: 3, name: 'Испания' },
  ],
  currentProduct: {},
  currentImgInfo: {},
};

const actions = {
  // asynchronous operations
  getProducts(context: any) {
    return Api.getProducts()
      .then(response => {
        context.commit('setProducts', { products: response.data });
      })
      .catch(error => {
        console.log('Error on getProducts: ', error);
        EventBus.$emit('failedGetProducts', error);
      });
  },
  getProduct(context: any, id: number) {
    return Api.getProduct(id)
      .then(response => {
        // EventBus.$emit('successGetProduct', response.data);
        context.commit('setCurrentProduct', { product: response.data });
        context.commit('setCurrentImageURL', { id: id });
      })
      .catch(error => {
        console.log('Error on getProduct: ', error);
        EventBus.$emit('failedGetProduct', error);
      });
  },
  updateProduct(context: any, id: number) {
    return Api.updateProduct(id, context.state.currentProduct)
      .then(() => {
        context.dispatch('updateImage', id);
      })
      .catch(error => {
        console.log('Error on updateProduct: ', error);
        EventBus.$emit('failedUpdateProduct', error);
      });
  },
  updateImage(context: any, id: number) {
    var formData = new FormData();
    formData.append('img', context.state.currentImgInfo.image);
    return Api.updateImage(id, formData).catch(error => {
      console.log('Error on updateImage: ', error);
      EventBus.$emit('failedUpdateImage', error);
    });
  },

  addProduct(context: any, formData: FormData) {
    return Api.addProduct(formData)
      .then(() => {
        EventBus.$emit('successAddProduct');
      })
      .catch(error => {
        console.log('Error on addProduct: ', error);
        EventBus.$emit('failedAddProduct', error);
      });
  },

  async deleteProduct(context: any, id: number) {
    try {
      await Api.deleteProduct(id);
      return null;
    } catch (err) {
      return err;
    }
  },
};

const mutations = {
  // synchronous operations
  setProducts(state: any, payload: any) {
    state.products = payload.products;
  },
  setCurrentProduct(state: any, payload: any) {
    if (payload.product.date) {
      payload.product.date = new Date(payload.product.date).toISOString();
    }
    if (payload.product.count) {
      payload.product.count = +payload.product.count;
    }
    state.currentProduct = payload.product;
  },
  setCurrentImageURL(state: any, payload: any) {
    state.currentImgInfo.url = `${Axios.defaults.baseURL}/products/${
      payload.id
    }/image`;
  },
  setCurrentImageInfo(state: any, payload: any) {
    state.currentImgInfo = payload.imgInfo;
  },
};

const getters = {
  currentProduct(state: any) {
    if (state.currentProduct.date) {
      return {
        ...state.currentProduct,
        date: state.currentProduct.date.slice(0, 10),
      };
    }
    return state.currentProduct;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
