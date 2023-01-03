<template>
    <div>
        <div class="mb-3">
            <TVTable
                ref="tvtTableSimple"
                :items="[]"
                :fields="fieldsSimple"
                :busy="busy"
                :spinner-class="'text-red-500'"
                multiple-selection
                enable-check
            >
                <template v-if="customText" #no-items>
                    Overwrite No Item
                </template>
            </TVTable>


            <input 
                class="border mt-2 p-1 rounded bg-gray-300 text-sm" 
                type="button" 
                :value="`Test custom message: ${customText ? 'on' : 'off' }`" 
                @click="customText = !customText" 
            />


            <input 
                class="border ml-2 mt-2 p-1 rounded bg-gray-300 text-sm" 
                type="button" 
                :value="`Test busy: ${busy ? 'on' : 'off' }`" 
                @click="busy = !busy" 
            />
        </div>
        
        <div class="mb-3">
            <span class="text-xs"> Simple </span> 

            <TVTable
                ref="tvtTableSimple"
                :items="cloneItems"
                :fields="fieldsSimple"
                :spinner-class="'text-red-500'"
                multiple-selection
                enable-check
            >
                <template #header-row>
                    <tr>
                        <td colspan="2" class="bg-red-500" />
                        <td colspan="2">Header1</td>
                    </tr>
                </template>


                <template #footer-row>
                    <tr>
                        <td colspan="1" class="bg-red-500" />
                        <td colspan="1" class="bg-green-500"/>
                        <td colspan="2">Footer</td>
                    </tr>
                </template>
            </TVTable>
        </div>
        <hr>
        <div>
            <span class="text-xs">With Props</span>
            <TVTable
                ref="tvtTableProps"
                v-model:currentPage="currentPage"
                :items="filterItems"
                :fields="fields"
                multiple-sortable
                :total-rows="items.length"
                :per-page="perPage"
                :row-select-class="'bg-red-500'"
                enable-check
                @change-page="changePage"
                @check-row="checkRow"
                @row-clicked="checkRow"
            >
                <template #header-row>
                    <tr>
                        <td colspan="2" />
                        <td colspan="2" class="bg-white text-center">Header1</td>
                        <td colspan="1" class="bg-red-300 text-center">Header2</td>
                    </tr>
                </template>

                <template #footer-row>
                    <tr>
                        <td colspan="1" />
                        <td colspan="1" class="bg-green-300 text-center"></td>
                        <td colspan="3" class="bg-red-300 text-center">Footer</td>
                    </tr>
                </template>

                <template #cell:username="row">
                    {{ row.item.emoji }} - {{ row.item.username }}
                </template>

                <template #row-details>
                    ROW-DETAILS ROW-DETAILS ROW-DETAILS
                </template>

                <template #cell:details="row">
                    <input id="checkbox" :checked="row.item._showDetails" type="checkbox" @click.stop="row.toggleDetails(row.item)" />
                </template>
            </TVTable>

            <div class="text-left mt-2">
                Selected: {{ selectRow }}
                CurrentPage: {{ currentPage }}
            </div>
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
        sortable: true,
    },
    {
        label: 'email',
        key: 'email',
        tdClass: 'bg-indigo-300'
    },
    {
        label: 'details',
        key: '',
        thStyle: 'width: 30px',
        tdClass: 'flex text-center',
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
        emoji: '🐈',
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

const busy = ref(false)
const customText = ref(false)

const currentPage = ref(1)

const perPage = ref(2)

const filterItems = ref(items.value.slice(0, 1 * perPage.value))

const cloneItems = JSON.parse(JSON.stringify(items.value))

const changePage = (values) => {
    filterItems.value = items.value.slice(values.from, values.to)
}

const selectRow = ref([])

const checkRowMultiple = (value) => {
    if (selectRow.value.includes(value)) {
        let index = selectRow.value.indexOf(value)
        selectRow.value.splice(index, 1)
    } else {
        selectRow.value.push(value)
    }
}

const checkRow = (value) => {
    selectRow.value = selectRow.value === value ? null : value
}

</script>