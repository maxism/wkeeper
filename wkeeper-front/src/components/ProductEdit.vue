<template>
    <div class="product-edit">
        <div v-if="loading" class="loading">
            Загрузка...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="product" class="content">
            <ImageInput v-model="imgInfo"/>
            <ProductInfo v-model="product"/>
            <button @click="save">Сохранить изменения</button>
            <button @click="deleteProduct">Удалить товар</button>
        </div>
    </div>
    
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import axios from 'axios';
    import { EventBus } from '../utils';
    import { Product } from '../interfaces/product.interface';
    import ImageInput from './ImageInput.vue';
    import ProductInfo from './ProductInfo.vue';
    import PropertyPicker from './PropertyPicker.vue';

    @Component({
        components: { ImageInput, ProductInfo, PropertyPicker }
    })
    export default class ProductEdit extends Vue {
        private loading: boolean = false;
        private error: string = "";

        get product () {
            return this.$store.getters.currentProduct;
        }
        set product(product: any) {
            this.$store.commit('', { product: product });
        }
        get imgInfo () {
            return this.$store.state.currentImgInfo;
        }
        set imgInfo(imgInfo: any) {
            this.$store.commit('setCurrentImageInfo', { imgInfo: imgInfo });
        }

        mounted () {
            EventBus.$on('successDeleteProduct', () => {
                this.$router.push({ name: 'products'});
            })
            EventBus.$on('failedDeleteProduct', (msg: any) => {
                alert(`Ошибка при удалении продукта: ${msg}`)
            })
            EventBus.$on('failedGetProduct', (msg: any) => {
                alert(`Ошибка при получении продукта: ${msg}`)
            })
            EventBus.$on('failedUpdateProduct', (msg: any) => {
                alert(`Ошибка при сохранении изменений: ${msg}`)
            })
            EventBus.$on('failedUpdateImage', (msg: any) => {
                alert(`Ошибка при сохранении изменений: ${msg}`)
            })
        }

        beforeDestroy () {
            EventBus.$off('successDeleteProduct');
            EventBus.$off('failedDeleteProduct');
            EventBus.$off('failedGetProduct');
            EventBus.$off('failedUpdateProduct');
            EventBus.$off('failedUpdateImage');
        }

        beforeMount() {
            this.$store.dispatch('getProduct', this.$route.params.id);
        }

       save () {
            this.$store.dispatch('updateProduct', this.$route.params.id);
        }

        deleteProduct () {
            this.$store.dispatch('deleteProduct', this.$route.params.id);
        }
    }
</script>
