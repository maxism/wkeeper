<template>
    <div>
        <span @click="pick">{{ local }}</span>
        <slot v-if="show"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class PropertyPicker extends Vue {
        @Prop()
        private description: string = "";
        private local: string = this.description;
        private show: boolean = false;
        
        pick() {
            this.show = !this.show;
        }
    }
</script>
