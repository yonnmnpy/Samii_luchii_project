<script setup lang="ts">
import { disposableListener } from '@/document/disposableListener';
import { useSceneState } from '@/novel/Game/current_scene_state';
import { sleep } from '@/sleep';
import { SECOND } from '@/time/constants';
import { computed, onMounted, onUnmounted, ref } from 'vue';
const scene = useSceneState();

async function runGame() {
	scene.updateBackgroundRule("#000")
	await sleep(SECOND * 3)
	scene.mainMenuOpened = false
}

function usePointer() {
	const x = ref<number | null>(null)
	const y = ref<number | null>(null);
	onMounted( () => {
		// @ts-expect-error
		const dispose = disposableListener("pointermove", (pointerEvent: PointerEvent) => {
			x.value = pointerEvent.x
			y.value = pointerEvent.y 
		})
		onUnmounted(dispose)
	})
	
	return { x, y };
}

const {x, y} = usePointer()
const translate_x = computed(() => `${100 * Math.sin(x.value || 0)}%`)
const translate_y = computed(() => `${100 * Math.sin(y.value || 0)}%`)
</script>


<template>
	<button @click="runGame"></button>
</template>


<style scoped>
button {
	position: fixed;
	left: 50%;
	top: 50%;
	translate: v-bind("translate_x") v-bind("translate_y");

	color: white;
	cursor: pointer;

	border: 1px solid currentColor;
	border-radius: 50%;
	padding: 1em;
	background: none;
	transition: translate 50ms;
}
</style>