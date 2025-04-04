<script setup lang="ts">
import { useDisposableFactory } from "@/disposable/useDisposableFactory";
import { disposableListener } from "@/document/disposableListener";
import { GlitchText } from "@/GlitchText/GlitchText";
import { ofDisposableListener } from "@/OnceResolable/ofDisposableListener";
import { sleep } from "@/sleep/sleep";
import { SECOND } from "@/time/constants";
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
const TEXT_TARGET = "Lorem my loved lorem."

onMounted(async () => {
	while (true) {
		const _request_skip_if_clicked = ofDisposableListener(
			(resolve) => disposableListener("click", resolve as EventListenerOrEventListenerObject)
		);
		if (deadline_end()) {
			_request_skip_if_clicked.refuse()
			return
		}
		for (let index = 0; index < TEXT_TARGET.length; index++) {
			await Promise.race([sleep(50), _request_skip_if_clicked.promise]);
			const letter = TEXT_TARGET[index];
			texthere_text.value += letter;

			if (_request_skip_if_clicked.isResolved) {
				texthere_text.value = TEXT_TARGET
				break
			}
		}
		_request_skip_if_clicked.refuse()


		await sleep(SECOND)

		for (const state of new GlitchText(TEXT_TARGET, "")) {
			await sleep(50);
			texthere_text.value = state;
		}
	}
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


	<div id="texthere">
		{{ texthere_text }}
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