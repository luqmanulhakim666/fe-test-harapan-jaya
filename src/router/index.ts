import { createRouter, createWebHistory } from 'vue-router'
import Default from '@/layouts/Default.vue'
import { useAuthStore } from '@/stores/auth'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/',
    component: Default,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/users' },
      {
        path: 'users',
        name: 'UserList',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'users/:slug',
        name: 'UserSlug',
        component: () => import('@/views/users/_slug.vue'),
        props: true
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // ✅ wait until session restore finishes
  if (!authStore.initialized) {
    await authStore.getMe()
  }

  const isLoggedIn = !!authStore.user

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next(`/login?redirect=${to.fullPath}`)
  }
  if (to.path === '/login' && isLoggedIn) {
    return next('/')
  }
  next()
})

export default router
