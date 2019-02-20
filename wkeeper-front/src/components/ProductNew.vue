<template>
    <div class="content">
        <ImageInput v-model="imgInfo">
            <img slot="activator" :src="imgInfo.url" width="255" height="255" alt="картинка не найдена">
        </ImageInput>
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
    import ImageInput from './ImageInput.vue';
    import axios from 'axios';


    @Component({
        components: { ImageInput }
    })
    export default class ProductNew extends Vue {
        private name: string = '';
        private description: string = '';
        private location: string = '';
        private imgInfo: any = {};
        //private url: string = "";

        $refs: any = {
            file: HTMLInputElement
        }

        submit() {
            var formData = new FormData();
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('location', this.location);
            formData.append('img', this.imgInfo.image);

            axios.post('/products', formData, {
                headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => console.log('success'))
                .catch(error => console.log(error));
        }
    }
</script>
