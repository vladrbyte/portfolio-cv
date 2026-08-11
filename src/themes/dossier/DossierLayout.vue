<script setup>
import { ref, computed } from 'vue'
import './style.css'
const props = defineProps({
  cv: {
    type: Object,
    required: true
  }
})

const currentLang = ref(props.cv.config?.defaultLang || 'de')
const languages = props.cv.config?.languages || ['de', 'en']

const sections = props.cv.sections || []
const activeSectionId = ref(sections[0]?.id || '')

const activeSection = computed(() => {
  return sections.find(s => s.id === activeSectionId.value) || sections[0]
})
</script>

<template>
  <div class="dossier-container">
    <!-- Шапка / Верхняя панель -->
    <header class="dossier-header">
      <div class="profile-summary" v-if="cv.profile">
        <h1>{{ cv.profile.name }}</h1>
        <p class="headline">{{ cv.profile.headline?.[currentLang] }}</p>
      </div>

      <div class="controls">
        <select v-model="currentLang" class="lang-select">
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>
    </header>

    <!-- Основной макет: Спайн (навигация) + Контент -->
    <div class="dossier-layout">
      <nav class="dossier-spine" aria-label="Sections Navigation">
        <ul>
          <li v-for="section in sections" :key="section.id">
            <button
              class="spine-tab"
              :class="{ active: activeSectionId === section.id }"
              @click="activeSectionId = section.id"
            >
              {{ section.label?.[currentLang] }}
            </button>
          </li>
        </ul>
      </nav>

      <main class="dossier-main" v-if="activeSection">
        <h2>{{ activeSection.label?.[currentLang] }}</h2>

        <div class="items-list">
          <div v-for="item in activeSection.items" :key="item.id" class="dossier-card">
            <div class="card-header">
              <h3 class="item-title">{{ item.title?.[currentLang] }}</h3>
              <span v-if="item.meta?.period" class="item-period">{{ item.meta.period }}</span>
            </div>

            <!-- Контейнеры/Роли -->
            <div v-if="item.containers && item.containers.length" class="containers-list">
              <div v-for="cont in item.containers" :key="cont.id" class="container-item">
                <p class="role-title">{{ cont.title?.[currentLang] }}</p>
              </div>
            </div>

            <!-- Блоки (для навыков и хобби) -->
            <div v-if="item.blocks && item.blocks.length" class="blocks-list">
              <div v-for="(block, bIdx) in item.blocks" :key="bIdx" class="block-item">
                <span>{{ block.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
