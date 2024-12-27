<!-- 
 * Страница со списком статей
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 -->

<template>
  <SiteHeader />
  <div>1</div>
</template>

<script setup lang="ts">
import { usePostStorage } from '@/entities/Post'
import { nextTick, onMounted } from 'vue'

import { SiteHeader } from '@/features'

const postStorage = usePostStorage()

/**
 * Получение данных при загрузке страницы
 */
onMounted(() => {
  postStorage.createDemoList()

  nextTick().then(() => {
    postStorage.updateItems()
  })
})
</script>
