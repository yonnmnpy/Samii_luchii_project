<script setup lang="ts">
import { useDisposableFactory } from "@/disposable/useDisposableFactory";
import { usePointer } from "@/document/usePoiner";
import MainMenu from "@/novel/MainMenu.scene/MainMenu.vue";
import { randomNumberInRange } from "@/random/in_range";
import { useBodyCustomSlots } from "@/useBodyCustomSlots";
import { useStorage } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, h, onUnmounted, reactive, ref, watch, type Reactive, type Ref } from "vue";
import CurrentPicture from './Game/CurrentPicture.vue';
import { useSceneState } from "./Game/current_scene_state";
import { _run_scene } from "./Game/scenario";
import TextArea from "./TextArea.vue";
import ReadText from "./of_authors/ReadText.vue";
import { Routes } from "./router";
const scene_state_singleton = useSceneState()





const { useDisposable } = useDisposableFactory(onUnmounted)


const template_main = ref()
function createX(backgroundRule: Ref<string, string>) {
	const id = Math.random().toString();

	return {
		id,
		vnode: h("div", {
			style: {
				get background() {
					return backgroundRule.value
				},
				position: "fixed",
				width: "3vh",
				height: "3vh",
				left: `${Math.floor(Math.random() * 100)}vw`,
				top: `${randomNumberInRange({ max: 30 }) * 3}vh`,
				border: "solid 1px"

			},
			id
		})
	}
}
const list: Reactive<ReturnType<typeof createX>[]> = reactive([])
const { backgroundRule, currentRoute } = storeToRefs(scene_state_singleton);
useDisposable(
	watch(backgroundRule, () => {
		list.push(createX(backgroundRule))
	}).stop
)
const sceneOpened = computed(() => currentRoute.value === Routes.Scene)
const { x, y } = usePointer()
const changeBgLabel = useStorage("@/novel/NovelGame:changeBgLabel", "???")


</script>


<template>
	<main ref="template_main" :style="{
		background: scene_state_singleton.backgroundRule
	}">
		<component :is="$.vnode" :key="$.id" v-for="$ of list" />
		<button @click="
			() => {
				scene_state_singleton.updateBackgroundRule('#' + (256 + Math.floor(Math.random() * 3000)).toString(16));
				changeBgLabel = `Меняет цвет фона`;
			}
		">{{ changeBgLabel }}</button>
	</main>

	<ReadText v-if="currentRoute === Routes.AuthorsText" />
	<MainMenu v-if="currentRoute === Routes.MainMenu" />

	<!-- <JustPointerBall :x="x!" :y="y!" v-if="sceneOpened" /> -->

	<x-current-picture-position v-if="sceneOpened">
		<CurrentPicture />
	</x-current-picture-position>


	<TextArea v-if="sceneOpened" :scenario="_run_scene" />
	<component :is="component" v-for="component of useBodyCustomSlots()._store().components" />
</template>


<style scoped>
main {
	width: 100%;
	height: 100vh;
	transition: background 5s;
}



x-current-picture-position {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>