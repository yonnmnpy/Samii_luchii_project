<script setup lang = "ts">
import { useSceneState } from './scene/singleton';

	
	useSceneState
</script>


<template>
	<x-game-picture-area>
		<img src="" class = "main_image" alt="">
		<img src="./img.png" alt="">
	</x-game-picture-area>
</template>


<style scoped>
	x-game-picture-area {
		aspect-ratio: 1/1;
		width: min(700px, max(300px, 80vmin));
		max-width: 90vw;
		/* height: 700px; */
		display: block;
		background: #eee;
		border: 2px solid;
		box-shadow: 0px 0px 3px #0009;
	}
</style>