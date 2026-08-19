<script setup>
import { decor } from '../composables/constants'

defineProps({
  profile: {
    type: Object,
    default: () => ({})
  },
  activeSection: {
    type: Object,
    default: () => ({})
  },
  themeStrings: {
    type: Object,
    default: () => ({})
  },
  languages: {
    type: Array,
    default: () => []
  },
  currentLang: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:currentLang', 'selectProfile'])
</script>

<template>
  <header class="cv-header">
    <div class="cv-header-top">
      <div class="cv-header-meta">
        <span class="cv-reg-mark">{{ decor.regMark }}</span>
        <span class="cv-doc-code">
          {{ activeSection?.index || '01' }} — {{ activeSection?.label || profile?.tools?.headline }}
        </span>
        <span v-if="themeStrings?.badge" class="cv-badge-tag">
          {{ themeStrings.badge }}
        </span>
      </div>

      <div class="cv-header-controls">
        <div v-if="languages.length" class="cv-lang-switch">
          <button
            v-for="lang in languages"
            :key="lang"
            class="cv-lang-btn"
            :class="{ active: currentLang === lang }"
            @click="emit('update:currentLang', lang)"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>
        <span class="cv-reg-mark">{{ decor.regMark }}</span>
      </div>
    </div>

    <div class="cv-header-main">
      <div class="cv-profile-summary clickable" @click="emit('selectProfile')">
        <h1 v-if="profile?.fullname" class="cv-name">
          {{ profile.fullname }}
        </h1>
        <p v-if="profile?.tools?.headline" class="cv-headline">
          {{ profile.tools.headline }}
        </p>
      </div>
    </div>
  </header>
</template>
