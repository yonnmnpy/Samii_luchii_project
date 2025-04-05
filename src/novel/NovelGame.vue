<script setup lang="ts">
import { useDisposableFactory } from "@/disposable/useDisposableFactory";
import { _run_scene } from "@/novel/_scene/main";
import { storeToRefs } from "pinia";
import { h, onMounted, onUnmounted, reactive, ref, watch, type Reactive, type Ref } from "vue";
import CurrentPicture from './CurrentPicture.vue';
import { useSceneState } from "./scene/singleton";
const scene_state_singleton = useSceneState()


const { deadline_end } = useDisposableFactory(onUnmounted)


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
				width: "3em",
				height: "3em",
				left: `${Math.floor(Math.random() * 100)}vw`,
				border: "solid 1px"

			},
			id
		})
	}
}
const list: Reactive<ReturnType<typeof createX>[]> = reactive([])
const { backgroundRule } = storeToRefs(scene_state_singleton);
watch(backgroundRule, () => {
	list.push(createX(backgroundRule))
})
const texthere_text = ref("");


onMounted(async () => {
	_run_scene(texthere_text, deadline_end)
})
</script>


<template>
	<main ref="template_main" :style="{
		background: scene_state_singleton.backgroundRule
	}">
		<component :is="$.vnode" :key="$.id" v-for="$ of list" />
		<button @click="
			() => scene_state_singleton.updateBackgroundRule('#' + (256 + Math.floor(Math.random() * 3000)).toString(16))
		">Change BG</button>
	</main>

	<x-current-picture-position>
		<CurrentPicture />
	</x-current-picture-position>


	<!-- @vue-expect-error -->
	<div id="texthere" v-html = "texthere_text.replaceAll('<', '&#60;').replaceAll('>', '&#62;')">
	</div>
</template>


<style scoped>
main {
	width: 100%;
	height: 100vh;
	transition: all 5s;
}

#texthere {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 5em;
	color: white;
	background: #0009;
	text-align: center;
}

x-current-picture-position {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
}
</style>