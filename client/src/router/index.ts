import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/ActivityView.vue'),
    },
    {
      path: '/friendsactivity',
      name: 'friendsactivity',
      component: () => import('../views/FriendsActivityView.vue'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue'),
    },
    {
      path:'/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path:'/exercises',
      name: 'exercises',
      component: () => import('../views/ExercisesView.vue'),
    }
  ],
})

export default router
