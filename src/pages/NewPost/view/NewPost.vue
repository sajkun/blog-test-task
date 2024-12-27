<!-- 
Стрпаница создания записи 
-->
<template>
  <SiteHeader :showSearch="false"> </SiteHeader>
  <v-container>
    <v-form @submit.prevent="savePost" ref="newPostForm">
      <v-text-field
        required
        variant="outlined"
        name="title"
        label="Заголовок статьи"
        :rules="rules.title"
        v-model="newPostClass.title"
      ></v-text-field>

      <v-textarea
        :rules="rules.text"
        required
        label="Текст статьи"
        variant="outlined"
        name="text"
        class="mt-2"
        v-model="newPostClass.text"
      ></v-textarea>
      <div class="v-row" justify="content-between" align="center">
        <v-col class="text-left">
          <RouterLink class="btn text-blue mt-4" @click.stop :to="'/'">на главную</RouterLink>
        </v-col>

        <v-col class="text-right">
          <RouterLink
            to="/"
            class="v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated"
            >Отмена</RouterLink
          >
          <v-btn type="submit" class="ms-2">Сохранить</v-btn>
        </v-col>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { PostClass, type PostType } from '@/entities/Post'
import { SiteHeader } from '@/widgets'
import { nextTick } from 'vue'
import { ref, type Ref } from 'vue'

const newPostForm: Ref<HTMLFormElement | undefined> = ref()
const newPostClass = ref(new PostClass({} as PostType))

const rules = {
  title: [
    (value: string) => !!value || 'Обязательное поле',
    (value: string) => (value || '').length <= 50 || 'Максимум 50 символов'
  ],
  text: [(value: string) => !!value || 'Обязательное поле']
}

const savePost = async (event: SubmitEvent) => {
  await event
  newPostClass.value.created_at = new Date().toISOString()
  const newPost = new PostClass(newPostClass.value)
  newPost.create()
  await nextTick
  newPostForm.value?.reset()
  alert('Новая запись создана')
}
</script>
