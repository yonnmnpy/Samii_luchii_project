<script setup lang = "ts">
import { world_2d_singleton } from './singleton';

	
</script>


<template>
	<main>
		<component :is = "$.vnode" v-for = "$ of world_2d_singleton.entities"/>
	</main>
</template>


<style scoped>
	
</style>