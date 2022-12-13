<template>
    <tbody class="tv-tbody">
        <slot></slot>
    </tbody>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TTbody',
})

</script>