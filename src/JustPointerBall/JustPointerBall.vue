<script setup lang="ts">
import RedPoint from '@/debug/RedPoint.vue';
import { from_angle_to_angle_as_short_way } from '@/math/angle';
import { sleep } from '@/sleep';
import { computed, onMounted, onUnmounted, ref, toValue } from 'vue';

const props = defineProps<{
	x: number
	y: number
}>()


const my_x = ref(toValue(300));
const my_y = ref(toValue(300));
const xlabel = ref("");
const target_angle = computed(() => (Math.atan2(
	((my_y.value || 0) - props.y),
	((my_x.value || 0) - props.x)
) + Math.PI))
onMounted(async () => {
	let unmouned = false
	onUnmounted(() => unmouned = true)
	while (true) {
		if (unmouned) {
			return
		}

		
		const diff = from_angle_to_angle_as_short_way(target_angle.value, angle.value)
		if (Math.abs(diff) > 0.005){
			angle.value += diff > 0 ? 0.01 : -0.01;
			angle.value %= 2 * Math.PI
			if (angle.value < 0){
				angle.value += 2 * Math.PI;
			}
			velocity.value /= 1.002
		}
			
		
		my_x.value += Math.cos(angle.value) * velocity.value
		my_y.value += Math.sin(angle.value) * velocity.value
		velocity.value += 0.05;
		velocity.value = Math.min(velocity.value, 5)
		if (isNaN(my_x.value)) {
			my_x.value = 0
		}
		if (isNaN(my_x.value)) {
			my_y.value = 0
		}
		await sleep(20)
	}
})


const angle = ref(0)
const velocity = ref(0)



</script>


<template>
	<div class="ball">{{ xlabel }}</div>
	<RedPoint :left = "`${300 + Math.cos(angle) * 100}px`" :top = "`${300 + Math.sin(angle) * 100}px`"/>
</template>


<style scoped>
.ball {
	position: fixed;
	left: v-bind("`${Math.floor(my_x)}px`");
	top: v-bind("`${Math.floor(my_y)}px`");
	translate: -50% -50%;

	border: 1px solid white;
	border-radius: 50%;
	padding: 1em;
	background: none;
	pointer-events: none;
}
</style>