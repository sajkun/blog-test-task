<!-- 
 * Страница с отображение одной статьи
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 -->

<template>
  <SiteHeader :showSearch="false"> </SiteHeader>
  <v-container>
    <h2 class="text-h4" v-if="displayMode === 'display'">{{ displayPost.title }}</h2>
    <h3 class="v-card-subtitle">
      <span v-if="displayPost.created_at">опубликовано {{ displayPost.created_at }}</span>
      <div></div>
      <span v-if="displayPost.edited_at">отредактировано {{ displayPost.edited_at }}</span>
    </h3>
    <v-text-field
      class="mt-2"
      variant="outlined"
      hide-details="auto"
      label="Заголовок статьи"
      v-model="singlePost.title"
      :rules="titleRules"
      v-if="displayMode === 'edit'"
    ></v-text-field>
    <p class="mt-4">{{ displayPost.text }}</p>

    <v-row class="mt-4">
      <v-col class="text-end" v-if="displayMode === 'display'">
        <v-btn type="button" class="edit-btn" @click="editPost" title="редактировать">
          <v-icon aria-hidden="true">mdi-content-save-outline</v-icon>

          Редактировать
        </v-btn>
      </v-col>
      <v-col class="text-end" v-if="displayMode === 'edit'">
        <v-btn type="button" class="edit-btn" @click="cancelEditPost" title="отменитб изменения">
          отмена
        </v-btn>
        <v-btn type="button" class="edit-btn" @click="updatePost" title="сохранить изменения">
          <v-icon aria-hidden="true">mdi-content-save-outline</v-icon>

          сохранить
        </v-btn>
      </v-col>
    </v-row>
    <RouterLink class="btn text-blue mt-4" @click.stop :to="'/'">Назад</RouterLink>
  </v-container>
</template>

<script setup lang="ts">
import { PostClass, titleRules, usePostStorage, type PostType } from '@/entities/Post'
import { SiteHeader } from '@/widgets'
import { computed } from 'vue'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment/min/moment-with-locales'
moment.locale('ru')

const route = useRoute()
const postStorage = usePostStorage()
type DisplayMode = 'display' | 'edit'
const displayMode: Ref<DisplayMode> = ref('display')
const oldPost: Ref<PostClass | undefined> = ref()
const postId = ref(parseInt(route.params.post_id as string))

const singlePost = ref(new PostClass({} as PostType))

/**
 * Получение данных при загрузке страницы
 */
onMounted(() => {
  postStorage.createDemoList()

  nextTick().then(() => {
    postStorage.updateItems()
    singlePost.value = new PostClass(postStorage.items.get(+postId.value)!)
  })
})

const displayPost = computed(() => {
  const _post = singlePost.value
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

/**
 * Вклюение редактирования записи
 *
 * @returns {void}
 */
const editPost = () => {
  const postData = JSON.parse(JSON.stringify(singlePost.value)) as PostType
  oldPost.value = new PostClass(postData)
  displayMode.value = 'edit'
}

/**
 * отмена редактирования записи
 */
const cancelEditPost = () => {
  singlePost.value.title = oldPost.value?.title ?? singlePost.value.title
  oldPost.value = undefined
  displayMode.value = 'display'
}

/**
 * сохранение поста
 */
const updatePost = () => {
  displayMode.value = 'display'
  singlePost.value.edited_at = new Date().toISOString()
  singlePost.value.update()
}
</script>
