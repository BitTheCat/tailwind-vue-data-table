<template>
    <table ref="TVTABLE" class="tv-table">
        <slot></slot>
    </table>
</template>

<script setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'TTable',
})

</script>