<template>
    <div class="product-edit">
        <div v-if="loading" class="loading">
            Загрузка...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="product" class="content">
            <img :src="url" width="255" height="255" alt="картинка не найдена">
            <p/>
            <input type='file' @change="handleFileUpload($event.target.files)">
            <p/>
            <input v-model="product.name" placeholder="Введите название товара">
            <p/>
            <textarea v-model="product.description" placeholder="Введите описание товара"></textarea>
            <p/>
            <input v-model="product.location" placeholder="Введите местоположение товара">
            <p/>
            <button @click="save">Сохранить изменения</button>
            <button @click="deleteProduct">Удалить товар</button>
        </div>
    </div>
    
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import axios from 'axios';
    import { Product } from '../interfaces/product.interface';

    @Component
    export default class ProductEdit extends Vue {
        private loading: boolean = false;
        private error: string = "";
        private product: object = {}; 
        private url: string = "";
        private img: any;

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
                    this.url = path + '/image';
                     })
                .catch(error => ( this.error = error ))
                .then(() => ( this.loading = false ));
        }

        save () {
            axios.post('/products/' + this.$route.params.id, this.product)
                .then(() => {
                    var formData = new FormData();
                    formData.append('img', this.img);

                    axios.post(this.url, formData, {
                        headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(() => console.log('success'))
                        .catch(error => console.log(error));
                });
        }

        handleFileUpload(files: any[]) {
            this.img = files[0];
        }

        deleteProduct () {
            axios.delete('/products/' + this.$route.params.id)
                .then(() => (this.$router.push({ name: 'products'})))
                .catch(error => (this.error = error));
        }
    }
</script>
