<template>
    <div class="content">
        <ImageInput v-model="imgInfo"/>
            <!--<img slot="activator" :src="imgInfo.url" width="255" height="255" alt="картинка не найдена">
        </ImageInput>-->
        <p/>
        <ProductInfo v-model="product"/>
        <button @click="submit">Добавить товар</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import ImageInput from './ImageInput.vue';
    import ProductInfo from './ProductInfo.vue';
    import PropertyPicker from './PropertyPicker.vue';
    import axios from 'axios';
    import { EventBus } from '../utils';


    @Component({
        components: { ImageInput, ProductInfo, PropertyPicker }
    })
    export default class ProductNew extends Vue {
        private product: any = {};
        private imgInfo: any = {};

        $refs: any = {
            file: HTMLInputElement
        }

        submit() {
            var formData = new FormData();
            this.encodeDate();
            for (let key in this.product) {
                formData.append(key, this.product[key])
            }
            formData.append('img', this.imgInfo.image);
            this.$store.dispatch('addProduct', formData);
        }

        mounted () {
            EventBus.$on('successAddProduct', () => {
                alert('Новый продукт успешно создан')
            });
            EventBus.$on('failedAddProduct', (msg: any) => {
                alert(`Ошибка при добавлении продукта: ${msg}`)
            });
        }

        beforeDestroy () {
            EventBus.$off('successAddProduct');
            EventBus.$off('failedAddProduct');
        }
        
        encodeDate() {
            if (this.product.date) {
                this.product.date = new Date(this.product.date).toISOString();
            }
        }

        
    }
</script>
