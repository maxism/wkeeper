<template>
    <div class="info">
        <div @click="launchFilePicker">
            <slot name="activator"></slot>
        </div>
        <input type='file' ref='file' style="display:none" @change="handleFileUpload($event.target.files)">
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class ImageInput extends Vue {
        @Prop({ 
            type: Object, 
            }) value: object = {};
        private url: string = "";
        private img: any;

        $refs: any = {
            file: HTMLInputElement
        }

        handleFileUpload(files: any[]) {
            this.img = files[0];
            this.url = window.URL.createObjectURL(this.img);
            this.$emit('input', {
                url: this.url,
                image: this.img 
                });
        }

        launchFilePicker() {
            this.$refs.file.click();
        }
    }
</script>
>
