import { defineStore } from "pinia"
import { ref } from "vue"

export const useSceneState = defineStore("scene", () => {
	const backgroundRule = ref("#aaaa44")

	return {
		backgroundRule,
		updateBackgroundRule(value: string) {
			backgroundRule.value = value
		},
	}
})
