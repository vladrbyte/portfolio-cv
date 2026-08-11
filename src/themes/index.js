import DossierLayout from './dossier/DossierLayout.vue'

export const themes = {
    dossier: {
        id: 'dossier',
        name: 'Dossier',
        component: DossierLayout,
        loadStyles: () => import('./dossier/tokens.css')
    }
}

export const defaultThemeId = 'dossier'