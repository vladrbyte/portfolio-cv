<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <nav class="cv-nav" aria-label="sections">
    <ul class="cv-nav-list">
      <li v-for="item in items" :key="item.id" class="cv-nav-item">
        <button
          class="cv-nav-tab"
          :class="{ active: activeId === item.id }"
          @click="emit('select', item.id)"
        >
          <span class="cv-tab-text">
            <span class="cv-tab-index">{{ item.index }}.</span>
            <span class="cv-tab-label">{{ item.label }}</span>
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>
