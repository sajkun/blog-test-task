/**
 * Маршрутизация приложения
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import { createRouter, createWebHistory } from 'vue-router'
import { BlogList, SinglePost } from '@/pages'
import { NewPost } from '@/pages/NewPost'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogList
    },
    {
      path: '/post/:post_id',
      name: 'post',
      component: SinglePost
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: NewPost
    }
  ]
})

export default router
