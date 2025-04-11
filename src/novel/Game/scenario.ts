import { useSceneState } from "@/novel/Game/current_scene_state";
import { _makeUtilsBy } from "@/novel/Game/makeUtils";
import { orderedCall } from "@/promise/orderedCall";
import { sleep } from "@/sleep";
import { SECOND } from "@/time/constants";
import type { Ref } from "vue";

export async function _run_scene(target_text: Ref<string>, deadline_end: Function) {
	const {write: w, use_pause, empty, currentText, glitch, switch_bold, waitClick} = _makeUtilsBy(target_text, deadline_end)
	const scene = useSceneState();
	while (true) {
		if (deadline_end()){
			return;
		}
		
		await sleep(SECOND)
		await w(".")
		await sleep(SECOND)
		await w(".")
		await sleep(SECOND)
		await w(".")
		await sleep(SECOND)
		empty()
		await w("Привет!")

		await waitClick()
		empty()
		await orderedCall(
			`До того как движение шара стало похожим на движение по орбите получилась ещё одна игра — попади белым шариком по красному. Было сложно!
Хорошего дня`
				.split("\n")
				.map(line => [() => w(line), waitClick, empty])
				.flat()
		)
		
		
		scene.updateBackgroundRule("#ffffbb");
		await w("Lorem my loved lorem.");
		await sleep(SECOND);
		await glitch(currentText(), "");
		await w("<Hop-hop-hop>");
		await sleep(50);
		empty();
		scene.updateBackgroundRule("#ffbbff");
		await w(
			`P(1)3P(1).P(1) 2P(1).P(1). P(2) 1P(1).P(1).P(1). P(3)`.replace(
				/P\((?<time>\d)\)/g,
				(_0, _1, _2, _3, { time }) => use_pause(SECOND * time)
			)
		);
		await w(switch_bold());
		await w("Lorem my loved lorem.");
		await w(switch_bold());
		await w(" Hello, World")
		empty();
	}
}
