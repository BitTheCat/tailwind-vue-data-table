<template>
    <th class="tv-th">
        <slot></slot>
    </th>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TTh',
})

</script>