import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/credits',
    component: () => import('../views/CreditsPage.vue'),
  },
  {
    path: '/',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/map',
    component: () => import('../views/MapPage.vue'),
  },
  {
    path: '/player',
    component: () => import('../views/PlayerPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
