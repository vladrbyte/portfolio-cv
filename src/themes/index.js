const modules = import.meta.glob('./*/index.js', { eager: true })

export const themes = {}

for (const path in modules) {
    const themeConfig = modules[path].default
    if (themeConfig?.id) {
        themes[themeConfig.id] = themeConfig
    }
}

export const defaultThemeId = 'dossier'

export async function loadTheme(themeId) {
    const targetId = themeId && themes[themeId] ? themeId : defaultThemeId
    const theme = themes[targetId]

    if (!theme) {
        console.warn(`Theme "${targetId}" not found, falling back to "${defaultThemeId}"`)
        const fallback = themes[defaultThemeId]
        if (fallback?.loadStyles) await fallback.loadStyles()
        return fallback
    }

    if (theme.loadStyles) {
        await theme.loadStyles()
    }

    return theme
}

export function getThemeStrings(themeId, lang = 'de') {
    const targetId = themeId && themes[themeId] ? themeId : defaultThemeId
    const theme = themes[targetId]
    if (!theme?.strings) return {}

    const result = {}
    for (const [key, val] of Object.entries(theme.strings)) {
        if (typeof val === 'object' && val !== null) {
            result[key] = val[lang] || Object.values(val)[0] || ''
        } else {
            result[key] = val
        }
    }
    return result
}