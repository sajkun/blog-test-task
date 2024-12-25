/**
 * Хранилище данных о статьях
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import { defineStore } from 'pinia'
import type { BlogClass } from '@/entities/Post'

const postStorage = defineStore('appPostsData', {
  state: () => {
    return {
      items: new Map<number, BlogClass>()
    }
  },

  getters: {},

  actions: {
    getList() {}
  }
})

export { postStorage }
