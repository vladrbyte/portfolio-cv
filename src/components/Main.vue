<script setup>
defineProps({
  activeSection: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <main class="cv-main" v-if="activeSection">
    <h2 class="cv-section-heading">{{ activeSection.label }}</h2>

    <!-- Карточка профиля -->
    <div v-if="activeSection.isProfile" class="cv-card cv-profile-card">
      <div class="cv-profile-grid">
        <div v-if="activeSection.info?.address" class="cv-profile-row">
          <span class="cv-profile-label">Adresse:</span>
          <span class="cv-profile-value">{{ activeSection.info.address }}</span>
        </div>
        <div v-if="activeSection.info?.birthDate" class="cv-profile-row">
          <span class="cv-profile-label">Geburtsdatum:</span>
          <span class="cv-profile-value">{{ activeSection.info.birthDate }}</span>
        </div>
        <div v-if="activeSection.info?.birthPlace" class="cv-profile-row">
          <span class="cv-profile-label">Geburtsort:</span>
          <span class="cv-profile-value">{{ activeSection.info.birthPlace }}</span>
        </div>
        <div v-if="activeSection.info?.nationality" class="cv-profile-row">
          <span class="cv-profile-label">Staatsangehörigkeit:</span>
          <span class="cv-profile-value">{{ activeSection.info.nationality }}</span>
        </div>
      </div>

      <!-- Контакты-чипсы -->
      <div v-if="activeSection.info?.contacts?.length" class="cv-profile-contacts">
        <div 
          v-for="(contact, index) in activeSection.info.contacts" 
          :key="index" 
          class="cv-contact-chip"
        >
          <a 
            v-if="contact.href" 
            :href="contact.href" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {{ contact.label }}
          </a>
          <span v-else>{{ contact.label }}</span>
        </div>
      </div>
    </div>

    <!-- Карточки секций -->
    <div v-else class="cv-items-list">
      <div 
        v-for="item in activeSection.items" 
        :key="item.id || item.title" 
        class="cv-card cv-section-card"
      >
        <div class="cv-card-header">
          <div class="cv-card-title-group">
            <h3 v-if="item.title" class="cv-item-title">{{ item.title }}</h3>
            <p v-if="item.subtitle" class="cv-item-subtitle">{{ item.subtitle }}</p>
          </div>
          <span v-if="item.period" class="cv-item-period">{{ item.period }}</span>
        </div>

        <p v-if="item.description" class="cv-item-description">{{ item.description }}</p>

        <ul v-if="item.bullets && item.bullets.length" class="cv-item-bullets">
          <li v-for="(bullet, index) in item.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
