import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

import Login from '@/views/Auth/Login.vue'
import Forget from '@/views/Auth/Forget.vue'
import Register from '@/views/Auth/Register.vue'
import Layout from '@/views/Layout.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget,
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: { requiresAuth: true },
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Profile
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Profile
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token")
    if (!token) return next('/login')
    
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000
    console.log(decoded.exp, now)
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem('token')
      return next('/login')
    }
  }
  next()
})

export default router