<template>
    <div class="grid gap-4">
        <span class="text-xs"> Simple </span> 
        <TVDataTable
            :items="items"
            :fields="fieldsSimple"
        >
        </TVDataTable>

        <hr>
        
        <span class="text-xs">With Props</span>
        <TVDataTable
            :items="items"
            :fields="fields"
            multiple-sortable
        >
            <template #cell:username="{ item }">
                {{ item.emoji }} - {{ item.username }}
            </template>
        </TVDataTable>


    </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import TVDataTable from '../src/components/TVDataTable.vue';

defineComponent({
  name: 'Table',
}) 

const fields = ref([
    {
        label: 'id',
        key: 'id',
        thStyle: 'width: 30px',
        sortable: true
    },
    {
        label: 'username',
        key: 'username',
        thStyle: 'background: lightblue',
        thClass: 'text-white',
        tdClass: 'text-center',
        sortable: true
    },
    {
        label: 'email',
        key: 'email',
        tdClass: 'bg-indigo-300'
    },
])

const fieldsSimple = ref([
    {
        label: 'id',
        key: 'id',
        sortable: true
    },
    {
        label: 'username',
        key: 'username',
        sortable: true
    },
    {
        label: 'email',
        key: 'email',
    },
])


const items = ref([
    {
        id: '1',
        username: 'cat',
        email: 'cat@tvdatatable.test',
        emoji: '🐈'
    },
    {
        id: '2',
        username: 'dog',
        email: 'dog@tvdatatable.test',
        emoji: '🐕'
    },
    {
        id: '3',
        username: 'bird',
        email: 'bird@tvdatatable.test',
        emoji: '🐦'
    },
])

</script>