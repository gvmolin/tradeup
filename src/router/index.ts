import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConferirCepView from '@/views/ConferirCepView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/conferirCep',
      name: 'conferir',
      component: ConferirCepView
    }
  ]
});

export default router;
