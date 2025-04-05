import { _makeUtilsBy } from "@/novel/_scene/makeUtils";
import { sleep } from "@/sleep";
import { SECOND } from "@/time/constants";
import type { Ref } from "vue";

export async function _run_scene(texthere_text: Ref<string>, deadline_end: Function) {
	const {write, write_pause, empty, currentText, glitch} = _makeUtilsBy(texthere_text, deadline_end)
	while (true) {
		await write("Lorem my loved lorem.");
		await sleep(SECOND);
		await glitch(currentText(), "");
		await write("<Hop-hop-hop>");
		await sleep(50);
		empty();
		await write(
			`P(1)3P(1).P(1) 2P(1).P(1). P(2) 1P(1).P(1).. P(3)`.replace(
				/P\((?<time>\d)\)/g,
				(_0, _1, _2, _3, { time }) => write_pause(SECOND * time)
			)
		);
	}
}
