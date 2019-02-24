<template>
    <div class="content">
        <input :value="value.name" placeholder="Введите название товара" @input="update('name', $event.target.value)">
        <p/>
        <textarea :value="value.description" placeholder="Введите описание товара" @input="update('description', $event.target.value)"></textarea>
        <p/>
        <input :value="value.location" placeholder="Введите местоположение товара" @input="update('location', $event.target.value)">
        <p/>
        <span @click="showDate = !showDate">Дата доставки</span>
        <p/>
        <input v-if="showDate" type="date" :value="value.date" @input="update('date', $event.target.value)">
        <p/>
        <span @click="showCount = !showCount">Количество</span>
        <p/>
        <input v-if="showCount" type="number" :value="value.count" @input="update('count', $event.target.value)">
        <p/>
        <span @click="showCountry = !showCountry">Страна</span>
        <p/>
        <select v-if="showCountry" :value="value.country" @input="update('country', $event.target.value)">
            <option v-for="country in countries" :key="country.id">  
                {{ country.name }}
            </option> 
        </select>
        <p/>
        <span @click="showComment = !showComment">Комментарий</span>
        <p/>
        <textarea v-if="showComment" :value="value.comment" placeholder="Введите коментарий к товару" @input="update('comment', $event.target.value)"></textarea>
        <!--
        <PropertyPicker description="Дата доставки">
            <input type="date" :value="value.date" @input="update('date', $event.target.value)">
        </PropertyPicker>
        <p/>
        <PropertyPicker description="Количество">
            <input type="number" :value="value.count" @input="update('count', $event.target.value)">
        </PropertyPicker>
        <p/>
        <PropertyPicker description="Страна производитель">
            <select :value="value.country" @input="update('country', $event.target.value)">
                <option v-for="country in countries" :key="country.id">  
                    {{ country.name }}
                </option> 
            </select>
        </PropertyPicker>
        <p/>
        <PropertyPicker description="Коментарий">
            <textarea :value="value.comment" placeholder="Введите коментарий к товару" @input="update('comment', $event.target.value)"></textarea>
        </PropertyPicker>
        <p/>
        -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
    import axios from 'axios';
    import ImageInput from './ImageInput.vue';
    import PropertyPicker from './PropertyPicker.vue';

    @Component({
        components: { ImageInput, PropertyPicker }
    })
    export default class ProductInfo extends Vue {
        @Prop({
            type: Object
        })
        private value: any = {};
        private countries: any[] = [
            { id: 1, name: "Россия" },
            { id: 2, name: "Германия" },
            { id: 3, name: "Испания" },
        ]
        private localDate: string = "";
        private showDate: boolean = false;
        private showCount: boolean = false;
        private showCountry: boolean = false;
        private showComment: boolean = false;

        @Watch('value.count')
        transformCount() {
            if (this.value.count) {
                this.value.count = this.value.count as string; 
            }
        }

        update(key: any, value: any) {
            this.$emit('input', { ...this.value, [key]: value });
        }
    }
</script>
