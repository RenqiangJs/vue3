import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/layout/index.vue'),
      meta: { title: '首页' },
      children: [
        {
          path: '/home',
          component: () => import('@/views/home.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})
export default router

export function setupRouter(app: App<Element>) {
  app.use(router)
}
