import { defineStore } from "pinia"
import { ref } from "vue"

export const useSceneState = defineStore("scene", () => {
	const backgroundRule = ref("#845AA9")
	const mainPictureSrc = ref<string | null>(null) 
	const mainMenuOpened = ref(true);

	return {
		mainMenuOpened,
		mainPictureSrc,
		updateMainPictureSrc(value: string | null){
			mainPictureSrc.value = value
		},
		backgroundRule,
		updateBackgroundRule(value: string) {
			backgroundRule.value = value
		},
	}
})
