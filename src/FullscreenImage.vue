<script setup lang="ts">
const { src } = defineProps<{ src: string }>()
</script>


<template>
	<dialog open>
		<img :src />
	</dialog>
</template>


<style scoped>
dialog {
	position: absolute;
	top: 0;
	height: 100vh;
	background: transparent;
	animation: apparance 60s forwards, opacity 1s;
	transition: opacity 2s;

	display: flex;
	flex-direction: column;
	justify-content: center;
}

dialog:global(.before-remove) {
	opacity: 0;
}

@keyframes opacity {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes apparance {
	from {
		backdrop-filter: blur(1px) saturate(0.7) grayscale(0);
	}

	to {
		backdrop-filter: blur(100px) saturate(0.7) grayscale(0.8);	
	}
}
</style>

