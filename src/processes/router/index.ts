/**
 * Маршрутизация приложения
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import { createRouter, createWebHistory } from 'vue-router'
import { BlogList } from '@/pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogList
    }
  ]
})

export default router