import { createRouter, createWebHistory } from 'vue-router';

import TableShow from './TableShow.vue'

const routes = [
    { path: '/', component: TableShow },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;