<script setup>
import { computed, watchEffect } from 'vue'
import { useCv } from '../composables/useCv'
import { loadTheme, getThemeStrings } from '../themes'
import { decor } from '../composables/constants'
import cvData from '../data/cv_2.json'

import Header from './Header.vue'
import Nav from './Nav.vue'
import Main from './Main.vue'

const {
  theme,
  currentLang,
  languages,
  profile,
  navigation,
  activeSectionId,
  activeSection
} = useCv(cvData)

const themeStrings = computed(() => {
  return getThemeStrings(theme.value, currentLang.value)
})

watchEffect(async () => {
  if (theme.value) {
    await loadTheme(theme.value)
  }
})

watchEffect(() => {
  document.title = `${theme.value} ${decor.doubleSectionDivider} ${profile.value?.fullname || ''}`
  document.documentElement.lang = currentLang.value
})

</script>

<template>
  <div class="cv-app" :class="'theme-' + theme">
    <div class="cv-container">
      <Header
        :profile="profile"
        :activeSection="activeSection"
        :languages="languages"
        :themeStrings="themeStrings"
        v-model:currentLang="currentLang"
        @selectProfile="activeSectionId = profile?.id || 'profile'"
      />

      <div class="cv-layout">
        <Nav
          :items="navigation"
          :activeId="activeSectionId"
          @select="(id) => activeSectionId = id"
        />

        <Main
          :activeSection="activeSection"
          :profile="profile"
          :themeStrings="themeStrings"
        />
      </div>
    </div>
  </div>
</template>