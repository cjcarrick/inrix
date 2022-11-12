import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import SingleTodoView from '../views/SingleTodoView.vue'
import TodosView from '../views/TodosView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosView
  },
  {
    path: '/todos/:id',
    name: 'single',
    component: SingleTodoView
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
