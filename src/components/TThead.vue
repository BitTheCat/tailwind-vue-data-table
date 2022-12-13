<template>
    <thead class="tv-thead">
        <slot></slot>
    </thead>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TThead',
})

</script>