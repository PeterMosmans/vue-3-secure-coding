import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

import HomePage from '@/components/HomePage.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import LogoutComponent from '@/components/LogoutComponent.vue'
import AdminView from '@/views/AdminView.vue'
import SignupComponent from '@/components/SignupComponent.vue'
import NotFound from '@/components/NotFound.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      // meta: { requiresAuth: true },
    },
    {
      path: '/home',
      redirect: '/',
    },
    { path: '/signup', name: 'signup', component: SignupComponent },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (user.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/UserComponent.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutComponent,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  const user = useUserStore()
  if (to.meta.requiresAuth && !user.loggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were want to come back later
      query: { redirect: to.name },
    }
  }
  if (to.meta.requiresAdmin && !user.user.isAdmin) {
    alert('Sorry, restricted access')
    return false
  }
})

export default router
