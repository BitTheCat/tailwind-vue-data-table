<template>
    <tr class="tv-tr">
        <slot></slot>
    </tr>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TTr',
})

</script>