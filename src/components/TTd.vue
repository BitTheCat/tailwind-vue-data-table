<template>
    <td class="tv-td">
        <slot></slot>
    </td>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TTd',
})

</script>