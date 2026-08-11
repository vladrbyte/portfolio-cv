<script setup>
import { shallowRef, watchEffect } from 'vue'
import { themes, defaultThemeId } from '../themes'
import cvData from '../data/cv_2.json'

const currentLayout = shallowRef(null)

watchEffect(async () => {
  const theme = themes[defaultThemeId]
  if (theme) {
    await theme.loadStyles()
    currentLayout.value = theme.component
  }
})
</script>

<template>
  <component :is="currentLayout" :cv="cvData" v-if="currentLayout" />
</template>