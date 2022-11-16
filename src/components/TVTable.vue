<template>
    <div v-if="!hidePagination && totalRows != 0" class="flex items-center justify-end mr-2 mb-2 text-xs font-small text-body">
        <span>Displaying {{ fromRow + 1 }} to {{ toRow }} of {{ totalRows }} items</span>
    </div>
    
    
    <div class="overflow-x-auto ">
        <table ref="TVTABLE" class="min-w-full">
            <thead class="bg-gray-300 text-xs border divide-x divide-y">
                <slot v-if="slots['header-row']" name="header-row" />
                <tr class="divide-x divide-y">
                    <th 
                        v-if="enableCheck" 
                        class="px-2 py-1.5" 
                        style="width: 30px" 
                    />

                    <th
                        v-for="field in fields"
                        :key="field.label"
                        class="px-2 py-1.5 font-medium uppercase"
                        :class="field.thClass"
                        :style="field.thStyle"
                    >
                        <div class="flex justify-between items-center">
                            <span>
                                {{ field.label }}
                            </span>
                            <div v-if="field.sortable" class="ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    :stroke-width="sortable[field.key] === 'asc' ? 4 : 2"
                                    stroke="currentColor"
                                    class="w-2.5 h-2.5 cursor-pointer"
                                    @click="updateSortable(field.key, 'asc')"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    :stroke-width="sortable[field.key] === 'desc' ? 4 : 2"
                                    stroke="currentColor"
                                    class="w-2.5 h-2.5 cursor-pointer"
                                    @click="updateSortable(field.key, 'desc')"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="border">
                <tr v-if="busy">
                        <td :colspan="enableCheck ? fields.length + 1 : fields.length">
                            <div class="flex justify-center mb-3 mt-3">
                                <slot name="busy">
                                    <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-black" :class="spinnerClass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </slot>
                            </div>
                        </td>
                    </tr>
                <template v-for="(item, index) in items" v-else :key="item.id">
                    <tr 
                        :id="`TVTABLE_row_${index}_${item.id}`"  
                        class="divide-x divide-y last:border-b-0 px-2 py-1.5 text-left border hover:bg-gray-400/50"
                        :class="`${index % 2 ? 'bg-gray-300/50' : 'bg-gray-100/50'}`"
                        @click="rowClicked(item)"
                    >
                        <td
                            v-if="enableCheck"
                            :key="`check_${item.label}`"
                            :class="`px-2 py-1.5 align-top table-cell last:border-b-0 ${checkSelectedForRow(item) ? rowSelectClass || 'bg-gray-400/50' : ''}`"
                        >
                            <input id="checkbox" v-model="selectedRows" :value="item" type="checkbox" @click.stop="emit('checkRow', item)" />
                        </td>

                        <td
                            v-for="field in fields"
                            :key="field.key"
                            class="px-2 py-1.5 align-top table-cell last:border-b-0"
                            :class="`${field.tdClass ?? ''} ${checkSelectedForRow(item) ? rowSelectClass || 'bg-gray-400/50' : ''}`"
                            :style="field.tdStyle"
                        >
                            <slot 
                                :name="`cell:${field.key || field.label}`"
                                :item="item" 
                                :data="getField(item, field.key)"
                                :toggle-details="toggleDetails"
                            >
                                {{ getField(item, field.key, '') }}
                            </slot>
                        </td>
                    </tr>
                    <tr 
                        v-if="item._showDetails" 
                        :class="index % 2 ? 'bg-gray-300/50' : 'bg-gray-100/50'"
                    >
                        <td :colspan="enableCheck ? fields.length + 1 : fields.length">
                            <slot name="row-details" :item="item" />
                        </td>
                    </tr>
                </template>
            </tbody>
            <tfoot class="bg-gray-300 border divide-x divide-y">
                <slot v-if="slots['footer-row']" name="footer-row" />
            </tfoot>
        </table>
    </div>

    <TVPagination
        v-if="localTotalRows > perPage && !hidePagination"
        v-model:currentPage="localCurrentPage"
        :total-rows="localTotalRows"
        :per-page="perPage"
    />
</template>

<script setup>
import {computed, defineComponent, ref, useAttrs, useSlots, watch} from 'vue';
import TVPagination from './TVPagination.vue';

defineComponent({
    name: 'TVTable',
    inheritAttrs: false
})

const slots = useSlots();
const attrs = useAttrs();

const props = defineProps({
    items: {
        type: [Object, Array],
        default: () => {}
    },
    fields: {
        type: Array,
        default: () => []
    },
    currentPage: {
        type: Number,
        default: 1
    },
    totalRows: {
        type: Number,
        default: 0
    },
    perPage: {
        type: Number,
        default: 15
    },
    spinnerClass: {
        type: String,
        default: ''
    },
    rowSelectClass: {
        type: String,
        default: ''
    },
    hidePagination: Boolean,
    multipleSortable: Boolean,
    enableCheck: Boolean,
    busy: Boolean,
})

const emit = defineEmits([
    'update:currentPage',
    'updateSortable', 
    'changePage', 
    'checkRow', 
    'rowClicked',
])


const localTotalRows = computed(() => {
    return props.totalRows || props.items.length || 0
})

const fromRow = ref(0)
const toRow = ref(0)
const localCurrentPage = ref(props.currentPage)

const getField = (item, field, def) => {
    return item[field] || def
}

const toggleDetails = (value) => {
    return value._showDetails = !value._showDetails
}

const sortable = ref({})
const selectedRows = ref([])

const rowClicked = (item) => {
    if (selectedRows.value.includes(item)) {
        let index = selectedRows.value.indexOf(item)
        selectedRows.value.splice(index, 1)
    } else {
        selectedRows.value.push(item)
    }
    emit('rowClicked', item)
} 

const updateSortable = (key, sort) => {
    props.multipleSortable 
        ? sortable.value[key] = sort
        : sortable.value = {[key] : sort}

    emit('updateSortable', sortable.value)
}

const refreshCounter = () => {
    if (localCurrentPage.value === 0) {
        return
    }
    let from = (localTotalRows.value > 0) ? 1 : 0
    if (localCurrentPage.value > 1) {
        from = from + (localCurrentPage.value - 1) * props.perPage
    }
    let to = Math.min(from + props.perPage - 1, localTotalRows.value)
    fromRow.value = from - 1
    toRow.value = to
}

const checkSelectedForRow = (item) => {
    return selectedRows.value.includes(item)
}

watch(() => localCurrentPage.value, (value) => {
    refreshCounter()
    emit('changePage', {page: value, from: fromRow.value, to: toRow.value})
    emit('update:currentPage', value)
}, {immediate: true})

</script>