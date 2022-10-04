<template>
    <div v-if="!hidePagination && !hideSummary" class="flex items-center justify-end mr-2 mb-2 text-xs font-small text-body">
        <span>Displaying {{ fromRow + 1 }} to {{ toRow }} of {{ totalRows }} items</span>
    </div>
    
    <table class="min-w-full">
        <thead class="bg-gray-300 border">
            <tr class="divide-x divide-y">
                <th
                    v-for="field in fields"
                    :key="field.label"
                    class="px-2 py-1.5 text-xs font-medium uppercase"
                    :class="field.thClass"
                    :style="field.thStyle"
                >
                    <div class="flex justify-center items-center">
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
        <tbody class="px-2 py-1.5 text-left text-xs font-medium border">
            <tr 
                v-for="(item) in items" 
                :key="item.label" 
                class="divide-x divide-y last:border-b-0 px-2 py-1.5 text-left text-xs font-medium border odd:bg-gray-300/50 even:bg-gray-100/50 hover:bg-gray-400/50"
            >
                <td
                    v-for="field in fields"
                    :key="field.key"
                    class="px-2 py-1.5 align-top lg:table-cell last:border-b-0"
                    :class="field.tdClass"
                    :style="field.tdStyle"
                >
                    <slot :item="item" :data="getField(item, field.key)" :name="`cell:${field.label}`">
                        {{ getField(item, field.key) }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>

    <TVPagination
        v-if="totalRows > perPage && !hidePagination"
        v-model:currentPage="localCurrentPage"
        :total-rows="totalRows"
        :per-page="perPage"
    />
</template>

<script setup>
import {defineComponent, ref, watch} from 'vue';
import TVPagination from './TVPagination.vue';

defineComponent({
    name: 'TVTable'
})

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
    hideSummary: Boolean,
    hidePagination: Boolean,
    multipleSortable: Boolean,
})

const emit = defineEmits(['updateSortable', 'changePage'])

const totalRows = ref(props.totalRows || props.items.length || 0)
const fromRow = ref(0)
const toRow = ref(0)
const localCurrentPage = ref(props.currentPage)

const getField = (item, field) => {
    return item[field]
}

const sortable = ref({})

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
    let from = (totalRows.value > 0) ? 1 : 0
    if (localCurrentPage.value > 1) {
        from = from + (localCurrentPage.value - 1) * props.perPage
    }
    let to = Math.min(from + props.perPage - 1, totalRows.value)
    fromRow.value = from - 1
    toRow.value = to
}

watch(() => localCurrentPage.value, (value) => {
    refreshCounter()
    emit('changePage', {page: value, from: fromRow.value, to: toRow.value})
}, {immediate: true})

</script>