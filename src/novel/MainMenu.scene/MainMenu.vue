<script setup lang="ts">
import { usePointer } from '@/document/usePoiner';
import JustPointerBall from '@/JustPointerBall/JustPointerBall.vue';
import { useSceneState } from '@/novel/Game/current_scene_state';
import { sleep } from '@/sleep';
import { SECOND } from '@/time/constants';
import { Routes } from '../router';


const scene = useSceneState();

async function runGame() {
	scene.updateBackgroundRule("#000")
	await sleep(SECOND * 3)
	scene.currentRoute = Routes.Scene
}

const { x, y } = usePointer()
</script>


<template>
	<x-main-menu>
			<button @click="runGame">Запустить</button> 
			<span>|</span>
			<button @click="scene.currentRoute = Routes.AuthorsText">От авторов</button>
	</x-main-menu>
	<JustPointerBall :x="x!" :y="y!"/>
</template>


<style scoped>
span {
	user-select: none;
}
x-main-menu {
	position: fixed;
	left: 50%;
	top: 50%;
	translate: -50% -50%;
	color: white;
	display: flex;
	gap: 0.5em;
}
button {
	background: none;
	outline: none;
	border: none;
	text-decoration: underline;
	cursor: pointer;
	color: white;
}

</style>