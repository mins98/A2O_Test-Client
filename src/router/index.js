import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Problem1.vue')
  },
  {
    path: '/problem-1',
    name: 'problem1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Problem1.vue')
  },
  {
    path: '/problem-2',
    name: 'problem2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Problem2.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router
