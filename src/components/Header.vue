<script setup>
defineProps({
  profile: {
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
    <div class="cv-profile-summary clickable" @click="emit('selectProfile')">
      <h1 v-if="profile?.info?.fullname">{{ profile.info.fullname }}</h1>
      <p v-if="profile?.tools?.headline" class="cv-headline">{{ profile.tools.headline }}</p>
    </div>

    <div v-if="languages.length" class="cv-controls">
      <select 
        :value="currentLang" 
        @change="emit('update:currentLang', $event.target.value)" 
        class="cv-lang-select"
      >
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ lang.toUpperCase() }}
        </option>
      </select>
    </div>
  </header>
</template>
