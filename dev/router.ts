import { createRouter, createWebHistory } from 'vue-router';

import Table from './Table.vue'

const routes = [
  { path: '/', component: Table },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;