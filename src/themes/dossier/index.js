import { defineAsyncComponent } from 'vue'

export default {
    id: 'dossier',
    name: 'Dossier',
    component: defineAsyncComponent(() => import('./DossierLayout.vue')),
    loadStyles: () => import('./tokens.css')
}