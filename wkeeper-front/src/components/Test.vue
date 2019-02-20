<template>
    <input :value="value" @input="$emit('input', value)">
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class Test extends Vue {
        @Prop()
        private value: string = "";
    }
</script>
