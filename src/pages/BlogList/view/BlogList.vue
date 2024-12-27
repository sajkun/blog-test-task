<!-- 
 * Страница со списком статей
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 -->

<template>
  <SiteHeader @search="execSearch" />
  <v-container class="text-end">
    <v-btn type="button">создать статью</v-btn>
  </v-container>
  <v-container>
    <PostCard
      :isSelected="isSelectedArticle === post.id"
      v-for="(post, id) in posts"
      :info="post"
      :key="'postCard' + id + post.id"
      @click="isSelectedArticle = post.id"
      :maxTextLength="240"
    />
    <v-sheet class="text-h5 text-center" v-if="!posts.length">Записей не найдено</v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

import { SiteHeader } from '@/widgets'
import { usePostStorage, PostCard } from '@/entities/Post'

const postStorage = usePostStorage()
const searchText = ref('')
const isSelectedArticle = ref(-1)

const posts = computed(() => {
  const posts = postStorage.list.filter((t) => {
    if (!searchText.value || searchText.value?.length < 3) {
      return true
    }

    const found =
      t.title.toLowerCase().indexOf(searchText.value.toLowerCase()) >= 0 ||
      t.text.toLowerCase().indexOf(searchText.value.toLowerCase()) >= 0
    return found
  })
  return posts
})

/**
 * Получение данных при загрузке страницы
 */
onMounted(() => {
  postStorage.createDemoList()

  nextTick().then(() => {
    postStorage.updateItems()
  })
})

/**
 * обработчик изменения текста поиска
 *
 * @param data данные полученные из эмита
 */
const execSearch = (data: { text: string }) => {
  searchText.value = data.text
}
</script>
