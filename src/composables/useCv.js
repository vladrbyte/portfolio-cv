import { ref, computed } from 'vue'

export function useCv(cvData) {
	// 1. Языки из конфигурации
	const languages = computed(() => {
		const configLangs = cvData?.config?.languages
		return Array.isArray(configLangs) && configLangs.length > 0 ? configLangs : []
	})

	const defaultLang = computed(() => {
		return cvData?.config?.defaultLang || languages.value[0] || 'de'
	})

	const currentLang = ref(defaultLang.value)
	const theme = computed(() => cvData?.config?.theme || 'dossier')

	// 2. Универсальная функция перевода с фолбэками
	const t = (field) => {
		if (field === null || field === undefined) return ''
		if (typeof field === 'string' || typeof field === 'number') return String(field)

		if (typeof field === 'object' && !Array.isArray(field)) {
			if (currentLang.value && field[currentLang.value] !== undefined) {
				return field[currentLang.value]
			}
			if (defaultLang.value && field[defaultLang.value] !== undefined) {
				return field[defaultLang.value]
			}
			const values = Object.values(field)
			return values.length > 0 ? values[0] : ''
		}

		if (Array.isArray(field)) return field
		return ''
	}

	// 3. Рекурсивный парсер мультиязычных объектов
	const processDynamic = (data) => {
		if (!data) return data
		if (typeof data !== 'object') return data

		if (Array.isArray(data)) {
			return data.map(item => processDynamic(item))
		}

		const keys = Object.keys(data)
		const isTranslationObj = languages.value.length > 0 &&
			keys.length > 0 &&
			keys.every(k => languages.value.includes(k))

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

	// 4. Реактивные обработанные данные
	const profile = computed(() => processDynamic(cvData?.profile || {}))
	const sections = computed(() => processDynamic(cvData?.sections || []))

	// 5. Единый список навигации с индексацией (01, 02, 03...)
	const navigation = computed(() => {
		const items = []
		let counter = 1

		if (profile.value && profile.value.id) {
			items.push({
				id: profile.value.id,
				index: String(counter++).padStart(2, '0'),
				label: profile.value.label || 'Profile',
				isProfile: true
			})
		}

		if (Array.isArray(sections.value)) {
			sections.value.forEach(section => {
				items.push({
					id: section.id,
					index: String(counter++).padStart(2, '0'),
					label: section.label || section.id,
					isProfile: false
				})
			})
		}

		return items
	})

	// 6. Активная секция
	const activeSectionId = ref(profile.value?.id || 'profile')

	const activeSection = computed(() => {
		const navItem = navigation.value.find(item => item.id === activeSectionId.value)
		const index = navItem ? navItem.index : '01'

		if (activeSectionId.value === profile.value?.id) {
			return {
				...profile.value,
				index,
				isProfile: true
			}
		}

		const found = sections.value.find(s => s.id === activeSectionId.value)
		return found ? { ...found, index, isProfile: false } : null
	})

	return {
		theme,
		currentLang,
		languages,
		defaultLang,
		profile,
		sections,
		navigation,
		activeSectionId,
		activeSection,
		t
	}
}