<script setup>
defineProps({
  modelValue: { type: String, required: true },
  languages: { type: Array, required: true }
})
defineEmits(['update:modelValue'])
</script>

<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)" 
    class="lang-select"
  >
    <option v-for="lang in languages" :key="lang" :value="lang">
      {{ lang.toUpperCase() }}
    </option>
  </select>
</template>