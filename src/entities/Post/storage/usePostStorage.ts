/**
 * Хранилище данных о постах
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 */

import { defineStore } from 'pinia'
import type { PostType } from '../model'
import { ARTICLES } from '@/shared/const'

const usePostStorage = defineStore('appPostsData', {
  state: () => {
    return {
      items: new Map<number, PostType>()
    }
  },

  getters: {
    /**
     * Возвращает массив статей
     *
     * @returns {PostType} список постов
     */
    list(): PostType[] {
      const storage = this
      return Array.from(storage.items.values())
    }
  },

  actions: {
    /**
     * читает данные localStorage.blogPosts
     *
     * @returns {PostType[]} массив статей
     */
    getList(): PostType[] {
      const posts: PostType[] = localStorage.blogPosts ? JSON.parse(localStorage.blogPosts) : []
      return posts
    },

    /**
     * получает максимальный id из всех статей
     *
     * @return {number} id
     */
    getPostMaxId(): number {
      const storage = this
      let id = -1
      if (!storage.list.length) return id
      for (const post of storage.list) {
        id = Math.max(id, post.id)
      }

      return id
    },

    /**
     * Получает данные из LocalStorage.blogPosts  и обновляет items
     *
     * @returns {void}
     */
    updateItems(): void {
      const storage = this
      const mayBePosts = storage.getList()
      storage.items = new Map()

      for (const post of mayBePosts) {
        storage.items.set(post.id, post)
      }
    },

    /**
     * Записывает this.items в LocalStorage.blogPosts
     *
     * @returns {void}
     */
    saveList(): void {
      const storage = this
      const posts: PostType[] = Array.from(storage.items.values())
      localStorage.blogPosts = JSON.stringify(posts)
    },

    /**
     * Записывает данные списка в LocalStorage
     *
     * @returns {void}
     */
    createDemoList(): void {
      const storage = this
      if (!storage.getList().length) localStorage.blogPosts = JSON.stringify(ARTICLES)
    },

    /**
     * добавляет пост в хранилище и обновляет его LocalStorage
     *
     * @returns {number} id нового поста
     */
    createPost(post: PostType): number {
      const storage = this
      const newId = storage.getPostMaxId() + 1
      post.id = newId
      storage.items.set(newId, post)
      storage.saveList()
      return newId
    },

    /**
     * Удаление записи
     *
     * @param id уникальный ИД записи
     */
    removePost(id: number) {
      const storage = this
      try {
        if (!storage.items.has(id)) {
          throw `пост с Id ${id} не найден в блоге и не может быть удалён`
        }

        storage.items.delete(id)
        storage.saveList()
      } catch (e) {
        console.error(e)
      }
    },

    /**
     * обновление поста
     *
     * @param postData обновление поста
     */
    updatePost(postData: Partial<PostType> & { id: number }): void {
      const storage = this
      try {
        if (!storage.items.has(postData.id)) {
          throw `пост с Id ${postData.id} не найден в блоге и не может быть обновлён`
        }

        const postToUpdate = storage.items.get(postData.id) as PostType

        for (const key in postData) {
          if (key === 'id') continue
          const _key = key as keyof PostType
          Object.defineProperty(postToUpdate, key, {
            value: postData[_key],
            writable: true
          })
        }

        storage.items.set(postData.id, postToUpdate)

        storage.saveList()
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export { usePostStorage }
