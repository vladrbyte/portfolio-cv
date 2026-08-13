import { ref, computed } from 'vue'

export function useCv(cvData) {
    const languages = computed(() => {
        const configLangs = cvData?.config?.languages
        return Array.isArray(configLangs) && configLangs.length > 0 ? configLangs : []
    })

    const defaultLang = computed(() => {
        return cvData?.config?.defaultLang || languages.value[0] || ''
    })

    const currentLang = ref(defaultLang.value)

    const t = (field) => {
        if (!field) return ''
        if (typeof field === 'string' || typeof field === 'number') return field

        if (typeof field === 'object' && !Array.isArray(field)) {
            if (currentLang.value && field[currentLang.value]) return field[currentLang.value]
            if (defaultLang.value && field[defaultLang.value]) return field[defaultLang.value]
            const values = Object.values(field)
            return values.length > 0 ? values[0] : ''
        }

        if (Array.isArray(field)) return field
        return ''
    }

    const processDynamic = (data) => {
        if (!data) return data
        if (typeof data !== 'object') return data

        if (Array.isArray(data)) {
            return data.map(item => processDynamic(item))
        }

        const keys = Object.keys(data)
        const isTranslationObj = keys.length > 0 && keys.every(k => languages.value.includes(k))
        if (isTranslationObj) {
            return t(data)
        }

        const result = {}
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                result[key] = value.map(val => processDynamic(val))
            } else if (typeof value === 'object' && value !== null) {
                result[key] = processDynamic(value)
            } else {
                result[key] = value
            }
        }

        return result
    }

    const profile = computed(() => processDynamic(cvData?.profile || {}))
    const sections = computed(() => processDynamic(cvData?.sections || []))

    return {
        currentLang,
        languages,
        defaultLang,
        profile,
        sections,
        t
    }
}