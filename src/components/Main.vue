<script setup>
import { decor } from '../composables/constants'


defineProps({
  activeSection: {
    type: Object,
    default: null
  },
  profile: {
    type: Object,
    default: () => ({})
  },
  themeStrings: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <main class="cv-main" v-if="activeSection">
    <div class="cv-section-header">
      <h2 class="cv-section-heading">
        <span class="cv-heading-index">{{ activeSection.index }}</span>
        <span class="cv-heading-divider">/</span>
        <span class="cv-heading-title">{{ activeSection.label }}</span>
      </h2>
    </div>

    <div v-if="activeSection.isProfile" class="cv-card cv-profile-card">
      <div v-if="Array.isArray(activeSection.info)" class="cv-profile-grid">
        <div 
          v-for="field in activeSection.info" 
          :key="field.key || field.label" 
          class="cv-profile-row"
        >
          <span class="cv-profile-label">{{ field.label }}</span>
          <span class="cv-profile-dots"></span>
          <span class="cv-profile-value">{{ field.value }}</span>
        </div>
      </div>

      <div v-if="activeSection.contacts?.length" class="cv-profile-contacts">
        <div 
          v-for="(contact, index) in activeSection.contacts" 
          :key="index" 
          class="cv-contact-chip"
        >
          <span v-if="contact.emoji" class="cv-chip-emoji">{{ contact.emoji }}</span>
          <span v-if="contact.type" class="cv-chip-type">[{{ contact.type.toUpperCase() }}]</span>
          <a 
            v-if="contact.href" 
            :href="contact.href" 
            target="_blank" 
            rel="noopener noreferrer"
            class="cv-chip-link"
          >
            {{ contact.label }}
          </a>
          <span v-else class="cv-chip-text">{{ contact.label }}</span>
        </div>
      </div>
    </div>

    <div v-else class="cv-timeline">
      <div class="cv-timeline-track"></div>

      <div class="cv-timeline-items">
        <div 
          v-for="(item, index) in activeSection.items" 
          :key="item.id || index" 
          class="cv-timeline-entry"
        >
          <div class="cv-timeline-node">
            <div class="cv-node-dot"></div>
          </div>

          <div class="cv-card cv-section-card">
            <div class="cv-card-header">
              <div class="cv-card-title-group">
                <h3 v-if="item.title" class="cv-item-title">{{ item.title }}</h3>
                <p v-if="item.subtitle" class="cv-item-subtitle">{{ item.subtitle }}</p>
              </div>

              <span v-if="item.period" class="cv-item-period">{{ item.period }}</span>
            </div>

            <p v-if="item.description" class="cv-item-description">{{ item.description }}</p>

            <ul v-if="item.bullets && item.bullets.length" class="cv-item-bullets">
              <li v-for="(bullet, bIndex) in item.bullets" :key="bIndex">
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="cv-main-footer">
      <span class="cv-footer-code">
        {{ (profile?.fullname || 'CV').toUpperCase() }} - {{ activeSection.index }}
      </span>
    </div>
  </main>
</template>
