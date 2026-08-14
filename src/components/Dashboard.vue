<script setup>
import { watchEffect } from 'vue'
import { useCv } from '../composables/useCv'
import { loadTheme } from '../themes'
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

watchEffect(async () => {
  if (theme.value) {
    await loadTheme(theme.value)
  }
})
</script>

<template>
  <div class="cv-app" :class="'theme-' + theme">
    <div class="cv-container">
      <Header
        :profile="profile"
        :languages="languages"
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
        />
      </div>
    </div>
  </div>
</template>