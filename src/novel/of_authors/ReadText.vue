<script setup lang="ts">
import { sleep } from '@/sleep';
import { SECOND } from '@/time/constants';
import type { Ref } from 'vue';
import { useSceneState } from '../Game/current_scene_state';
import { _makeUtilsBy } from '../Game/makeUtils';
import TextArea from '../TextArea.vue';


async function scenario(target_text: Ref<string>, deadline_end: Function) {
	const { write: w, use_pause, empty, currentText, glitch, switch_bold, waitClick } = _makeUtilsBy(target_text, deadline_end)
	const scene = useSceneState()
	await w("Псевдоним: Енот.")
	await waitClick();
	await glitch(currentText(), "Главный, но не единственный баловень,");
	await sleep(1.5 * SECOND)
	await w(" среди создателей этой небольшой игры.")
	await waitClick()
	empty()
	await w("Я думаю, что научился и хочу говорить искренне.")
	await waitClick()
	scene.updateBackgroundRule("skyblue");
	empty()
	await w("Как я понимаю большинству читающих здесь около семнадцати лет.")
	await waitClick()
	await w(" Мне, пока пишу, девятнадцать.")
	await waitClick()
	empty();
	await w("... Скоро двадцать")
	await sleep(SECOND * 5);
	empty()
	await sleep(SECOND)
	await w("Если говорить об")
	await w("определении искренности как гармонии сознательного и бессознательного, то говорить искренне я особо не научился")
	
}
</script>


<template>
	<TextArea :scenario :style="{ bottom: `50%` }" />
</template>


<style scoped></style>