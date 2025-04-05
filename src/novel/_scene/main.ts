import { _makeUtilsBy } from "@/novel/_scene/makeUtils";
import { useSceneState } from "@/novel/scene/singleton";
import { sleep } from "@/sleep";
import { SECOND } from "@/time/constants";
import type { Ref } from "vue";

export async function _run_scene(texthere_text: Ref<string>, deadline_end: Function) {
	const {write: w, use_pause, empty, currentText, glitch, switch_bold} = _makeUtilsBy(texthere_text, deadline_end)
	const scene = useSceneState();
	while (true) {
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
		await w(".");
		empty();
	}
}
