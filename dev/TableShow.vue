<template>
    <div>
        <div class="mb-3">
            <span class="text-xs "> Simple </span> 
            <TVTable
                :items="items"
                :fields="fieldsSimple"
            />
        </div>
        <hr>
        <div>
            <span class="text-xs">With Props</span>
            <TVTable
                v-model:currentPage="currentPage"
                :items="filterItems"
                :fields="fields"
                multiple-sortable
                :total-rows="items.length"
                :per-page="perPage"
                @change-page="changePage"
            >
                <template #cell:username="{ item }">
                    {{ item.emoji }} - {{ item.username }}
                </template>
            </TVTable>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import TVTable from '../src/components/TVTable.vue';

defineComponent({
    name: 'TableShow',
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

const currentPage = ref(1)

const perPage = ref(2)

const filterItems = ref(items.value.slice(0, 1 * perPage.value))

const changePage = (values) => {
    filterItems.value = items.value.slice(values.from, values.to)
}

</script>