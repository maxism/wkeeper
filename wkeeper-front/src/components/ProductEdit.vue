<template>
    <div class="product-edit">
        <div v-if="loading" class="loading">
            Загрузка...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="product" class="content">
            <ImageInput v-model="imgInfo">
                <img slot="activator" :src="imgInfo.url" width="255" height="255" alt="картинка не найдена">
            </ImageInput>
            <ProductInfo v-model="product"/>
            <button @click="save">Сохранить изменения</button>
            <button @click="deleteProduct">Удалить товар</button>
        </div>
    </div>
    
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import axios from 'axios';
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
        private product: any = {};
        private imgInfo: any = {};
        //private test: string = "";
        private countries: any[] = [
            { id: 1, name: "Россия" },
            { id: 2, name: "Германия" },
            { id: 3, name: "Испания" },
        ]

        created () {
            this.fetchData();
        }

        @Watch('$route')
        fetchData () {
            this.loading = true;
            var path = '/products/' + this.$route.params.id;
            axios.get(path)
                .then(response => { 
                    this.product = response.data;
                    this.decodeDate();
                    this.imgInfo.url = axios.defaults.baseURL + path + '/image';
                     })
                    .catch(error => ( this.error = error.data ))
                    .then(() => ( this.loading = false ));
        }

        save () {
            this.encodeDate();
            const path = '/products/' + this.$route.params.id;
            axios.post(path, this.product)
                .then(() => {
                    var formData = new FormData();
                    formData.append('img', this.imgInfo.image);

                    axios.post(path + '/image', formData, {
                        headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(() => console.log('success'))
                        .catch(error => ( this.error = error.data ));
                });
        }

        deleteProduct () {
            axios.delete('/products/' + this.$route.params.id)
                .then(() => (this.$router.push({ name: 'products'})))
                .catch(error => (this.error = error.data));
        }

        encodeDate() {
            if (this.product.date) {
                this.product.date = new Date(this.product.date).toISOString();
            }
        }

        decodeDate() {
            if (this.product.date) {
                this.product.date = this.product.date.slice(0, 10); 
            }
        }
    }
</script>
