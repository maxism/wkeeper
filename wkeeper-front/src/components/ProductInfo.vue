<template>
    <div class="info">
        <input v-model="product.name" placeholder="Enter name of product">
        <p/>
        <textarea v-model="product.description" placeholder="Enter the description"></textarea>
        <p/>
        <input v-model="product.location" placeholder="Enter location of product">
        <p/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class ProductInfo extends Vue {
        @Prop({ 
            type: Object, 
            required: true,
            default: () => ({})
            }) product: object = {};

        mounted () {
            alert(Object.values(this.product));
        }
    }
</script>
