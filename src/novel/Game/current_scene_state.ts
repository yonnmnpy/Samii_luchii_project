import { Routes } from "@/novel/router"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSceneState = defineStore("scene", () => {
	const backgroundRule = ref("#845AA9")
	const mainPictureSrc = ref<string | null>(null) 
	const currentRoute = ref(Routes.MainMenu);

	return {
		currentRoute,
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
