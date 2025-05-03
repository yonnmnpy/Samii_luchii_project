import { removeFromArray } from "@/array";
import { useMemoize } from "@vueuse/core";
import { defineStore } from "pinia";
import { onUnmounted, reactive, type VNode } from "vue";

const _store = useMemoize(() =>
	defineStore("@/useBodyCustomSlots", (...x) => {
		return { components: reactive([] as VNode[]) };
	})()
);
export function useBodyCustomSlots() {
	return {
		_store,
		pushComponent(component: VNode) {
			_store().components.push(component);
			return {
				vnode: component,
				remove() {
					removeFromArray(_store().components, component);
				},
			};
		},
		defineComponent(component: VNode, { dispone_on_unmount = true } = {}) {
			_store().components.push(component);
			const dispose = () => removeFromArray(_store().components, component);
			dispone_on_unmount && onUnmounted(dispose);
			return dispose;
		},
	};
}
