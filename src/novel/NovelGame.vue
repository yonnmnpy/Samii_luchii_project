<script setup lang="ts">
import JustPointerBall from "@/JustPointerBall/JustPointerBall.vue";
import { useDisposableFactory } from "@/disposable/useDisposableFactory";
import { usePointer } from "@/document/usePoiner";
import MainMenu from "@/novel/MainMenu.scene/MainMenu.vue";
import { randomNumberInRange } from "@/random/in_range";
import { storeToRefs } from "pinia";
import { h, onUnmounted, reactive, ref, watch, type Reactive, type Ref } from "vue";
import CurrentPicture from './Game/CurrentPicture.vue';
import { useSceneState } from "./Game/current_scene_state";
import TextArea from "./TextArea.vue";
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
const { backgroundRule, mainMenuOpened } = storeToRefs(scene_state_singleton);
useDisposable(
	watch(backgroundRule, () => {
		list.push(createX(backgroundRule))
	}).stop
)

const { x, y } = usePointer()
const changeBgLabel = ref("???");
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


	<MainMenu v-if = "mainMenuOpened"/>

	<JustPointerBall :x="x!" :y="y!" v-if = "!mainMenuOpened"/>
	
	<x-current-picture-position v-if = "!mainMenuOpened">
		<CurrentPicture />
	</x-current-picture-position>


	<TextArea v-if = "!mainMenuOpened"/>
</template>


<style scoped>
main {
	width: 100%;
	height: 100vh;
	transition: all 5s;
}



x-current-picture-position {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>