<!-- 
 * Страница с отображение одной статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 -->

<template>
  <SiteHeader :showSearch="false"> </SiteHeader>
  <v-container>
    <h2 class="text-h4">{{ post.title }}</h2>
    <h3 class="v-card-subtitle">
      <span v-if="post.created_at">опубликовано {{ post.created_at }}</span>
      <span v-if="post.edited_at">отредактировано {{ post.edited_at }}</span>
    </h3>

    <p class="mt-4">{{ post.text }}</p>
    <RouterLink class="btn text-blue mt-4" @click.stop :to="'/'">Назад</RouterLink>
  </v-container>
</template>

<script setup lang="ts">
import { PostClass, usePostStorage } from '@/entities/Post'
import { SiteHeader } from '@/widgets'
import { computed } from 'vue'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment/min/moment-with-locales'
moment.locale('ru')

const route = useRoute()
const postStorage = usePostStorage()

const postId = ref(parseInt(route.params.post_id as string))

/**
 * Получение данных при загрузке страницы
 */
onMounted(() => {
  postStorage.createDemoList()

  nextTick().then(() => {
    postStorage.updateItems()
  })
})

const post = computed(() => {
  const _post = postStorage.items.get(+postId.value)
  if (!_post) return new PostClass({} as PostType)

  const displayPost = new PostClass(_post!)

  displayPost.created_at = _post.created_at
    ? moment(_post.created_at).format('DD MMMM YYYY в HH:MM')
    : ''

  displayPost.edited_at = _post.edited_at
    ? moment(_post.edited_at).format('DD MMMM YYYY в HH:MM')
    : ''
  return displayPost
})
</script>
