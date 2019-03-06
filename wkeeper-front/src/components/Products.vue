<template>
    <div class="products">     
        <div v-if="error" class="error">
            {{ error }}
        </div>
        
        <div v-if="products" class="content">
            <table>
                <thead>
                    <tr>
                        <td>№</td>
                        <td>Название</td>
                        <td>Описание</td>
                        <td>Местоположение</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id" @click="clicked(product.id, $event)">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.location }}</td>
                        <td>
                            <input type="checkbox" :id="product.id" v-if="deleting" v-model="forDelete.id">
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click="add">Добавить товар</button>
            <button @click="deleteProducts">Удалить товары</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { EventBus } from '../utils';
    import axios from 'axios';

    @Component
    export default class Products extends Vue {
        private error: string = "";
        private forDelete: any = {};
        private deleting: boolean = false;

        beforeMount () {
            this.$store.dispatch('getProducts');
        }

        get products () {
            return this.$store.state.products;
        }

        mounted () {
            EventBus.$on('failedGetProducts', (msg: any) =>{
                this.error = msg;
            })
        }

        beforeDestroy () {
            EventBus.$off('failedGetProducts');
        }

        clicked(id: number): void {
            if (!this.deleting) {
                this.$router.push({name: 'productEdit', params: { id: id.toString() }});
            } else {
                this.forDelete[id] = true;
            }
        }

        add() {
            this.$router.push({ name: 'new' });
        }

        deleteProducts() {
            this.deleting = true;
        }
    }
</script>