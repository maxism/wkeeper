<template>
    <div class="content">
        <input 
            :value="value.name"
            @input="$emit('input', value)" 
            placeholder="Введите название товара">
        <p/>
        <textarea 
            :value="value.description"
            @input="$emit('input', value)" 
            placeholder="Введите описание товара"/>
        <p/>
        <input 
            :value="value.location"
            @input="$emit('input', value)"
            placeholder="Введите местоположение товара">
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
    import axios from 'axios';

    @Component
    export default class ProductInfo extends Vue {
        @Prop({
            type: Object
        })
        private value: object = {};
    }
</script>
