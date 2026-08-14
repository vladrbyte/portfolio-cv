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
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>
