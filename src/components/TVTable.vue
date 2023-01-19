<template>
    <div v-if="!hidePagination && totalRows != 0 && !hideSummary" class="flex items-center justify-end mr-2 mb-2 text-xs font-small text-body">
        <span>Displaying {{ fromRow + 1 }} to {{ toRow }} of {{ totalRows }} items</span>
    </div>
    
    <div class="overflow-auto">
        <TTable ref="TVTABLE">
            <!-- No fields set -->
            <TThead v-if="fields.length == 0">
                <TTr class="divide-x divide-y">
                    <TTh />
                </TTr>
            </TThead>

            <TThead v-if="fields.length !== 0">
                <slot v-if="slots['header-row']" name="header-row" />
                <TTr class="divide-x divide-y">
                    <TTh 
                        v-if="enableCheck"
                        style="width: 30px" 
                    />

                    <TTh
                        v-for="field in fields"
                        :key="field.label"
                        class="font-medium uppercase"
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
                    </TTh>
                </TTr>
            </TThead>
            <!-- No fields set -->
            <TTbody v-if="fields.length == 0 || busy">
                <TTr class="divide-x divide-y">
                    <TTd v-if="fields.length == 0">
                        <span class="font-light flex justify-center mb-3 mt-3">No fields set</span>
                    </TTd>
                     <!-- Spinner -->
                     <TTd v-if="busy" :colspan="enableCheck ? fields.length + 1 : fields.length">
                        <div class="flex justify-center mb-3 mt-3">
                            <slot name="busy">
                                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-black" :class="spinnerClass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </slot>
                        </div>
                    </TTd>
                </TTr>
            </TTbody>
            <TTbody v-else>
                <!-- No Item -->
                <template v-if="items.length === 0 && !busy">
                    <TTr>
                        <TTd :colspan="fields.length + 1">
                            <slot v-if="slots['no-items']" name="no-items" />
                            <span v-else class="font-light flex justify-center mb-3 mt-3">{{ noItemText }}</span>
                        </TTd>
                    </TTr>
                </template>

                <template v-for="(item, index) in items" v-else :key="item.id">
                    <!-- Table Body -->
                    <TTr 
                        :id="`TVTABLE_row_${index}_${item.id}`"  
                        class="divide-x divide-y last:border-b-0 px-2 py-1.5 text-left border hover:bg-gray-400/50"
                        :class="`${index % 2 ? 'bg-gray-300/50' : 'bg-gray-100/50'}`"
                        @click="rowClicked(item)"
                    >
                        <TTd
                            v-if="enableCheck"
                            :key="`check_${item.label}`"
                            :class="`${checkSelectedForRow(item) ? rowSelectClass || 'bg-gray-400/50' : ''}`"
                        >
                            <input id="checkbox" :checked="selectedRows.includes(item)" :value="item" type="checkbox" @click.stop="rowClicked(item)" />
                        </TTd>

                        <TTd
                            v-for="field in fields"
                            :key="field.key"
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
                        </TTd>
                    </TTr>
                    <TTr 
                        v-if="item._showDetails" 
                        :class="index % 2 ? 'bg-gray-300/50' : 'bg-gray-100/50'"
                    >
                        <TTd :colspan="enableCheck ? fields.length + 1 : fields.length">
                            <slot name="row-details" :item="item" />
                        </TTd>
                    </TTr>
                </template>
            </TTbody>
            <tfoot 
                class="tv-tfoot"
            >
                <slot v-if="slots['footer-row']" name="footer-row" />
            </tfoot>
        </TTable>
    </div>

    <TVPagination
        v-if="localTotalRows > perPage && !hidePagination && !busy"
        v-model:currentPage="localCurrentPage"
        :total-rows="localTotalRows"
        :per-page="perPage"
    />
</template>

<script setup>
import {computed, defineComponent, ref, useSlots, watch} from 'vue';
import TVPagination from './TVPagination.vue';
import TTable from './TTable.vue';
import TThead from './TThead.vue';
import TTr from './TTr.vue';
import TTh from './TTh.vue';
import TTbody from './TTbody.vue';
import TTd from './TTd.vue';

defineComponent({
    name: 'TVTable',
    inheritAttrs: false
})

const slots = useSlots();

const props = defineProps({
    items: {
        type: [Object, Array],
        default: () => []
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
    hideSummary: Boolean,
    multipleSortable: Boolean,
    multipleSelection: Boolean,
    enableCheck: Boolean,
    busy: Boolean,
    noItemText: {
        type: String,
        default: 'No data to display'
    },
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
    if (props.multipleSelection) {
        
        if (selectedRows.value.includes(item)) {
            let index = selectedRows.value.indexOf(item)
            selectedRows.value.splice(index, 1)
        } else {
            selectedRows.value.push(item)
        }
    
    } else {
        selectedRows.value = selectedRows.value.includes(item) ? [] : [item]
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
    return props.multipleSelection ? selectedRows.value.includes(item) : selectedRows.value === item
}

watch(() => localCurrentPage.value, (value) => {
    refreshCounter()
    emit('changePage', {page: value, from: fromRow.value, to: toRow.value})
    emit('update:currentPage', value)
}, {immediate: true})

</script>