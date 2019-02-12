<template>
    <div class="content">
        <img :src="url" width="189" height="255" alt="картинка не найдена">
        <p/>
        <input type='file' @change="handleFileUpload($event.target.files)">          
        <p/>
        <input v-model="name" placeholder="Введите название товара">
        <p/>
        <textarea v-model="description" placeholder="Введите описание товара"></textarea>
        <p/>
        <input v-model="location" placeholder="Введите местоположение товара">
        <p/>
        <button @click="submit">Добавить товар</button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Product } from '../interfaces/product.interface';
    import axios from 'axios';


    @Component
    export default class ProductNew extends Vue {
        private name: string = '';
        private description: string = '';
        private location: string = '';
        private img: any;

        submit() {
            var formData = new FormData();
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('location', this.location);
            formData.append('img', this.img);

            axios.post('/products', formData, {
                headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => console.log('success'))
                .catch(error => console.log(error));
        }

        handleFileUpload(files: any[]) {
            this.img = files[0];
        }
    }
</script>
