<template>
    <table class="min-w-full ">
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
</template>

<script setup>
import {defineComponent, ref} from 'vue';

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
    multipleSortable: Boolean,
})

const emit = defineEmits(['updateSortable'])

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
</script>