import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/User/Login.vue'
import Forget from '@/views/User/Forget.vue'
import Register from '@/views/User/Register.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router