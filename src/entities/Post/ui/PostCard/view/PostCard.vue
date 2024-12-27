<template>
  <v-card class="mb-4 post-card" :class="{ 'is-selected': isSelected }">
    <v-card-item>
      <v-card-title>
        <v-row justify="space-between" v-if="displayMode === 'display'">
          <v-col>
            <h2 class="text-h5 title" :title="postToDisplay.title">{{ postToDisplay.title }}</h2>
          </v-col>
          <v-col class="text-end">
            <v-btn type="button" class="edit-btn" @click="removePost">
              <v-icon aria-hidden="true" title="редактировать запись">mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn type="button" class="edit-btn" @click="editPost">
              <v-icon aria-hidden="true" title="редактировать запись">mdi-pencil</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" v-if="displayMode === 'edit'">
          <v-col>
            <v-text-field
              class="mt-2"
              variant="outlined"
              hide-details="auto"
              label="Заголовок статьи"
              v-model="postToDisplay.title"
            ></v-text-field>
          </v-col>
          <v-col class="text-end">
            <v-btn type="button" class="edit-btn" @click="updatePost" title="сохранить изменения">
              <v-icon aria-hidden="true">mdi-content-save-outline</v-icon>
            </v-btn>
            <v-btn
              type="button"
              class="edit-btn"
              @click="cancelEditPost"
              title="отменитб изменения"
            >
              <v-icon aria-hidden="true">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <span v-if="postToDisplay.created_at">опубликовано {{ postToDisplay.created_at }} </span>
        <span v-if="postToDisplay.edited_at">отредактировано {{ postToDisplay.edited_at }}</span>
      </v-card-subtitle>
      <v-card-text>{{ postToDisplay.text }}</v-card-text>

      <v-card-actions class="text-end">
        <RouterLink class="btn btn-sm btn-borders w-100" @click.stop :to="'/post/' + post.id"
          >Подробнее</RouterLink
        ></v-card-actions
      >
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { PostClass, type PostType } from '@/entities/Post/model'
import { computed, ref, watch, type Ref } from 'vue'
import { type PropType } from 'vue'

type DisplayMode = 'display' | 'edit'
const displayMode: Ref<DisplayMode> = ref('display')
const oldPost: Ref<PostClass | undefined> = ref()

const props = defineProps({
  info: {
    type: Object as PropType<PostType>,
    required: true,
    default: {} as PostType
  },

  maxTextLength: {
    type: Number,
    required: false,
    default: null
  },

  isSelected: {
    type: Boolean,
    required: false,
    default: false
  }
})

watch(props.info, (info) => {
  console.log(info)
})

const post = ref(new PostClass(props.info))

/** отображаемый в карточке  */
const postToDisplay = computed(() => {
  const maxTextLength = props.maxTextLength
  const displayPost = post.value

  displayPost.text =
    displayPost.text.length > maxTextLength && maxTextLength
      ? displayPost.text.slice(0, maxTextLength) + '...'
      : displayPost.text
  return displayPost
})

/**
 * Вклюение редактирования записи
 *
 * @returns {void}
 */
const editPost = () => {
  const postData = JSON.parse(JSON.stringify(post.value)) as PostType
  oldPost.value = new PostClass(postData)
  displayMode.value = 'edit'
}

/**
 * отмена редактирования записи
 */
const cancelEditPost = () => {
  post.value.title = oldPost.value?.title ?? post.value.title
  oldPost.value = undefined
  displayMode.value = 'display'
}

/**
 * сохранение поста
 */
const updatePost = () => {
  displayMode.value = 'display'
  post.value.edited_at = new Date().toISOString()
  post.value.update()
}

/**
 * удаление поста
 */
const removePost = () => {
  if (confirm('Вы уверены, что хотите удалить запись?')) {
    post.value.remove()
  }
}
</script>

<style lang="scss" scoped>
.post-card {
  &.is-selected,
  &:hover {
    box-shadow:
      0px 3px 10px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px 2px 20px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px 1px 50px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
  }
}

.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
}

.edit-btn {
  font-size: 1rem;
  color: #999;

  &:hover {
    color: #2196f3;
  }

  &:active {
    color: #d50000;
  }
}
</style>
