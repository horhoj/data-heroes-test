import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/characters',
    name: 'characters',
    component: () => import('../views/CharacterListView.vue')
  },
  {
    path: '/character',
    name: 'character',
    component: () => import('../views/CharacterView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/characters'
  }
] as const satisfies readonly RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
