<script setup>
import { ref, computed } from 'vue'
import { useCv } from '../../composables/useCv'
import './style.css'

const props = defineProps({
  cv: {
    type: Object,
    required: true
  }
})

// Подключаем ваш рабочий useCv
const { currentLang, languages, profile, sections } = useCv(props.cv)

// Управление активной секцией
const activeSectionId = ref(sections.value[0]?.id || '')

const activeSection = computed(() => {
  return sections.value.find(s => s.id === activeSectionId.value) || sections.value[0]
})
</script>

<template>
  <div class="dossier-container">
    
    <!-- ШАПКА: Профиль и Переключатель языков -->
    <header class="dossier-header">
      <div class="profile-summary">
        <h1 v-if="profile.fullname">{{ profile.fullname }}</h1>
        <p v-if="profile.headline" class="headline">{{ profile.headline }}</p>
      </div>

      <div v-if="languages.length" class="controls">
        <select v-model="currentLang" class="lang-select">
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>
    </header>

    <div class="dossier-layout">
      <!-- БОКОВАЯ НАВИГАЦИЯ (Спина досье) -->
      <nav class="dossier-spine" aria-label="Секции">
        <ul>
          <li v-for="section in sections" :key="section.id">
            <button
              class="spine-tab"
              :class="{ active: activeSectionId === section.id }"
              @click="activeSectionId = section.id"
            >
              {{ section.label }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- ОСНОВНОЙ БЛОК -->
      <main v-if="activeSection" class="dossier-main">
        <h2>{{ activeSection.label }}</h2>

        <div class="items-list">
          <div
            v-for="item in activeSection.items"
            :key="item.id"
            class="dossier-card"
          >
            <!-- 1. Фиксированная шапка карточки для красивого Flex-расположения Title + Period -->
            <div class="card-header" v-if="item.title || item.period">
              <h3 v-if="item.title" class="item-title">{{ item.title }}</h3>
              <span v-if="item.period" class="item-period">{{ item.period }}</span>
            </div>

            <!-- 2. Динамический вышив всех остальных полей (subtitle, description, bullets, entries и т.д.) -->
            <template v-for="(val, key) in item" :key="key">
              <template v-if="!['id', 'title', 'period'].includes(key) && val && (Array.isArray(val) ? val.length : true)">

                <!-- Список (bullets-list, entries-list и т.д.) -->
                <ul v-if="Array.isArray(val)" :class="`${key}-list`">
                  <li v-for="(entry, idx) in val" :key="idx">
                    {{ entry }}
                  </li>
                </ul>

                <!-- Обычная строка (item-subtitle, item-description и т.д.) -->
                <div v-else :class="`item-${key}`">
                  {{ val }}
                </div>

              </template>
            </template>

          </div>
        </div>
      </main>
    </div>

  </div>
</template>