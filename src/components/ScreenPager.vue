<script setup>
import { ref } from 'vue'
import Block from './Block.vue'

const props = defineProps({
  screens: { type: Array, default: () => [] }
})

const currentIndex = ref(0)

function goTo(index) {
  if (index < 0 || index >= props.screens.length) return
  currentIndex.value = index
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

let touchStartX = 0
const SWIPE_THRESHOLD = 40

function onTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
}

function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].screenX
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    diff > 0 ? next() : prev()
  }
}
</script>

<template>
  <div class="cv-pager">
    <div class="cv-pager-body">
      <button
        v-if="screens.length > 1"
        class="cv-pager-arrow cv-pager-arrow-left"
        :disabled="currentIndex === 0"
        @click="prev"
        aria-label="Previous screen"
      >‹</button>

      <div
        class="cv-pager-viewport"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div v-if="screens[currentIndex]" class="cv-pager-screen">
          <Block
            v-for="(block, bIndex) in screens[currentIndex].blocks"
            :key="bIndex"
            :block="block"
          />
        </div>
      </div>

      <button
        v-if="screens.length > 1"
        class="cv-pager-arrow cv-pager-arrow-right"
        :disabled="currentIndex === screens.length - 1"
        @click="next"
        aria-label="Next screen"
      >›</button>
    </div>

    <div class="cv-pager-dots" v-if="screens.length > 1">
      <button
        v-for="(screen, index) in screens"
        :key="screen.id || index"
        class="cv-pager-dot"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
        :aria-label="`Go to screen ${index + 1}`"
      ></button>
    </div>
  </div>
</template>