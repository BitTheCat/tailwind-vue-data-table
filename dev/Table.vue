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

<style>
table {
    @apply min-w-full ;
}

thead {
    @apply bg-gray-300 border;
}

tr {
    @apply divide-x divide-y;
}

tr:last-child {
    @apply border-b-0;
}

th {
    @apply px-2 py-1.5 text-xs font-medium text-black uppercase;
}

td {
    @apply px-2 py-1.5 align-top lg:table-cell lg:text-left lg:align-middle;
}

td:last-child {
    @apply border-b-0;
}

tbody tr, tbody {
    @apply px-2 py-1.5 text-left text-xs font-medium border;
}

tbody tr:nth-child(odd) {
    @apply bg-gray-300/50 hover:bg-gray-400/50;
}

tbody tr:nth-child(even) {
    @apply bg-gray-100/50 hover:bg-gray-400/50 ;
}

.table-sort {
    @apply w-2.5 h-2.5 cursor-pointer
}
</style>