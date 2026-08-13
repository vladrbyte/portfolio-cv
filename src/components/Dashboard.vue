<script setup>
import { shallowRef, watchEffect } from 'vue'
import { getTheme} from '../themes'
import cvData from '../data/cv_2.json'

const currentLayout = shallowRef(null)

watchEffect(async () => {
  const selectedTheme = cvData.config?.theme
  currentLayout.value = await getTheme(selectedTheme)
})
</script>

<template>
  <component :is="currentLayout" :cv="cvData" v-if="currentLayout" />
</template>