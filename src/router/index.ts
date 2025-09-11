import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Forget from '@/views/Auth/Forget.vue'
import Register from '@/views/Auth/Register.vue'
import Home from '@/views/Home.vue'

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
    path: '/home',
    name: 'Home',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router