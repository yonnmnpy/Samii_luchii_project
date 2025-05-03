<script setup lang="ts">
import { useDisposableFactory } from '@/disposable/useDisposableFactory';
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
const { deadline_end } = useDisposableFactory(onUnmounted)

const {scenario} = defineProps<{
	scenario: (textRef: Ref<string>, deadline_end: () => void) => void
}>()


const texthere_text = ref("");

onMounted(async () => {
	scenario(texthere_text, deadline_end)
})

const template_texthere = ref<HTMLDivElement>();

watch(texthere_text, () => {
	CSS.highlights.delete("apparance");
	if (!template_texthere.value){
		return
	}
	template_texthere.value.innerHTML = texthere_text.value;
	const text_node = (() => {
		let current: ChildNode = template_texthere.value!
		while (true){
			if (current instanceof Text){
				return current
			}
			if (!current){
				return
			}
			current = current.childNodes[current.childNodes.length - 1]
		}
	})() as Text
	if (!text_node?.textContent){
		return;
	}
	const {textContent} = text_node;
	if (!textContent.length){
		return
	}

	const highlight_please = text_node.textContent.trimEnd().length - 1;
	if (highlight_please === -1){
		return
	}
	
	const range = new Range();
	range.setStart( text_node!, highlight_please)
	range.setEnd( text_node!, highlight_please + 1)
	CSS.highlights.set("apparance", new Highlight(range))
})
</script>


<template>
	<div id="texthere" ref = "template_texthere"/>
</template>


<style scoped>
#texthere {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 5em;
	color: white;
	background: #0009;
	text-align: center;
	padding-inline: 5vw;
}

#texthere::highlight(apparance){
	color: color-mix(in srgb, white, transparent);
}
</style>