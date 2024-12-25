<!-- 
 * Отображение всего приложения
 *
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
 -->
<script setup lang="ts">
import { BlogClass } from './entities/Post/model'

const keys = BlogClass.getKeys()
console.log(keys)
</script>

<template>
  <RouterView />
</template>
