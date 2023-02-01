<template>
    <div class="flex items-center justify-end mr-2 mt-2">
        <div v-if="currentPage !== 1" class="flex items-center cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tv-paginator-size" 
                @click="changePage(1)"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
        </div>
        <div v-if="currentPage !== 1" class="flex items-center cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tv-paginator-size" 
                @click="changePage(undefined, true)"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>
        <div class="sm:flex hidden">
            <template v-for="page of pages" :key="`page_${page}`">
                <p 
                    class="font-medium leading-none cursor-pointer link px-2" 
                    :class="`${paginationClass(page)} tv-paginator-text`" 
                    @click="changePage(page)"
                >
                    {{ page }}
                </p>
            </template>
        </div>
        <div v-if="currentPage !== totPages" class="flex items-center cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tv-paginator-size" 
                @click="changePage(undefined)"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
        <div v-if="currentPage !== totPages" class="flex items-center cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tv-paginator-size" 
                @click="changePage(totPages)"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
</template>

<script setup>

import {computed, defineComponent, ref, watch} from 'vue';

defineComponent({
    name: 'TVPaginate'
})

const props = defineProps({
    totalRows: {
        type: Number,
        default: 0
    },
    perPage: {
        type: Number,
        default: 15
    },
    currentPage: {
        type: Number,
        default: 1
    },
})
const emit = defineEmits(['update:currentPage'])

const totPages = ref(Math.ceil(props.totalRows/props.perPage))

const pages = computed(() => {
    if (totPages.value === 1) {
        return [props.currentPage.value]
    }

    let pages = []

    if (totPages.value > 1 && totPages.value <= 5 ) {
        for (let i = 1; i <= totPages.value; i++) {
            pages.push(i)
        }

        return pages
    }

    if (totPages.value >= 6 ) {
        let isGtThree = props.currentPage > 1
        const baseValue = isGtThree ? props.currentPage - 1 : props.currentPage
        for (let i = 0; i < 5; i++) {
            if (totPages.value - props.currentPage < 4) {
                pages.push(totPages.value - (4 - i))
            } else {
                pages.push(baseValue + i)
            }
        }

        return pages
    }

    return pages
})

const paginationClass = (page) => {
    let classes = []
    if (page === props.currentPage) {
        classes.push('rounded-xl bg-gray-400 text-white')
    }

    return classes
}

const changePage = (page = null, previous = false) => {
    let increment = 0
    if (page === null) {
        increment = previous ? -1 : 1
        page = props.currentPage
    }
    emit('update:currentPage', page + increment)
}

watch(() => props.totalRows, (value) => {
    totPages.value = Math.ceil(value/props.perPage)
})

</script>