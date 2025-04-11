<script setup lang = "ts">
	const {left, top} = defineProps<{
		left: string
		top: string
	}>()
</script>


<template>
	<div class="point"></div>
</template>


<style scoped>
	.point {
		position: fixed;
		display: block;
		width: 7px;
		height: 7px;
		background: red;
		border-radius: 50%;
		left: v-bind("left");
		top: v-bind("top");
	}
</style>