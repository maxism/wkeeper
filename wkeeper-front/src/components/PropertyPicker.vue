<template>
    <div>
        <span @click="pick">{{ description }}</span>
        <slot v-if="show"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class PropertyPicker extends Vue {
        @Prop()
        private description: string = "";
        private show: boolean = false;
        
        pick() {
            this.show = !this.show;
        }
    }
</script>
