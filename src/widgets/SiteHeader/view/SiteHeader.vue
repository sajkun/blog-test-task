<!--
Хэддер сайта
 * @author Вячеслав Кулешов
 * @email sajkunrnd@gmail.com
-->

<template>
  <header class="site-header" ref="header">
    <v-container class="py-2">
      <v-row align="center">
        <v-col md="3">
          <slot></slot>
        </v-col>
        <v-col md="6">
          <v-sheet class="text-center"><h1>Тестовый блог</h1></v-sheet>
        </v-col>
        <v-col md="3">
          <v-text-field
            variant="outlined"
            append-inner-icon="mdi-magnify"
            hide-details="auto"
            label="Поиск"
            clearable
            v-model="searchText"
            v-if="showSearch"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </header>
  <div class="header-space" :style="{ height: headerHeight + 'px' }"></div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { onMounted, ref, watch, type Ref } from 'vue'

const props = defineProps({
  showSearch: {
    type: Boolean,
    required: false,
    default: true
  }
})

const showSearch = toRef(props, 'showSearch')

const searchText: Ref<string> = ref('')
const header: Ref<HTMLHeadElement | undefined> = ref()
const headerHeight: Ref<number> = ref(60)

const emits = defineEmits(['search'])

watch(searchText, (text) => {
  emits('search', { text })
})

onMounted(() => {
  headerHeight.value = header.value?.offsetHeight ? header.value?.offsetHeight : headerHeight.value
  window.addEventListener('resize', () => {
    headerHeight.value = header.value?.offsetHeight
      ? header.value?.offsetHeight
      : headerHeight.value
  })
})
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>
