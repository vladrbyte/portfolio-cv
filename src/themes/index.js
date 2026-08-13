const modules = import.meta.glob('./*/index.js', { eager: true })

export const themes = {}

for (const path in modules) {
    const themeConfig = modules[path].default
    if (themeConfig?.id) {
        themes[themeConfig.id] = themeConfig
    }
}

export const defaultThemeId = 'dossier'

export async function getTheme(themeId) {
    const targetId = themeId && themes[themeId] ? themeId : defaultThemeId
    const theme = themes[targetId]

    if (!theme) {
        throw new Error(`Theme "${targetId}" not found`)
    }

    if (theme.loadStyles) {
        await theme.loadStyles()
    }

    return theme.component
}