export default {
    id: 'dossier',
    name: 'Dossier',
    strings: {
        badge: {
            de: 'DOSSIER',
            en: 'DOSSIER'
        },
        verifiedStamp: {
            de: 'VERIFIZIERTE AKTE',
            en: 'VERIFIED FILE'
        },
        pageRefPrefix: {
            de: 'SEITENVERWEIS',
            en: 'PAGE REF'
        },

    },
    loadStyles: () => {
        import('./tokens.css')
        import('./style.css')
    }
}