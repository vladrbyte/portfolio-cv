<script setup>
const props = defineProps({
  block: { type: Object, required: true }
})

const blockMap = {
  title:    { tag: 'h3',   class: 'cv-item-title' },
  subtitle: { tag: 'p',    class: 'cv-item-subtitle' },
  badge:    { tag: 'span', class: 'cv-item-period' },
  text:     { tag: 'p',    class: 'cv-item-description' },
  bullets:  { tag: 'ul',   class: 'cv-item-bullets',  itemTag: 'li',   itemClass: null },
  chips:    { tag: 'div',  class: 'cv-block-chips',   itemTag: 'span', itemClass: 'cv-chip-group' }
}

const config = blockMap[props.block.type] || null

const items = Array.isArray(props.block.value) ? props.block.value : null
</script>

<template>
  <component :is="config.tag" v-if="config" :class="config.class">
    <template v-if="config.itemTag">
      <component
        :is="config.itemTag"
        v-for="(entry, index) in items"
        :key="index"
        :class="config.itemClass"
      >
        {{ Array.isArray(entry) ? entry.join(', ') : entry }}
      </component>
    </template>
    <template v-else>
      {{ props.block.value }}
    </template>
  </component>
</template>