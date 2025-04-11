import { disposableListener } from "@/document/disposableListener";
import { onMounted, onUnmounted, ref } from "vue";
export function usePointer() {
	const x = ref<number>(0)
	const y = ref<number>(0);
	onMounted(() => {
		// @ts-expect-error
		const dispose = disposableListener("pointermove", (pointerEvent: PointerEvent) => {
			x.value = pointerEvent.x
			y.value = pointerEvent.y
		})
		onUnmounted(dispose)
	})

	return { x, y };
}