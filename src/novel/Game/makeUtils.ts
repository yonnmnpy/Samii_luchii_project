import { arraySpliceItem } from "@/array";
import { disposableListener } from "@/document/disposableListener";
import FullscreenImage from "@/FullscreenImage.vue";
import { ofDisposableListener } from "@/OnceResolable/ofDisposableListener";
import { sleep } from "@/sleep";
import { GlitchText } from "@/text/transformations/GlitchText";
import { LetterByLetterWriter } from "@/text/transformations/LetterByLetterWriter";
import { useBodyCustomSlots } from "@/useBodyCustomSlots";
import { h, Transition, type Ref } from "vue";

export function _makeUtilsBy(target_text: Ref<string>, deadline_end: Function) {
	const _opened_tags: string[] = [];

	async function write(text: string) {
		// @ts-expect-error es2021
		text = text.replaceAll("<", "&#60;").replaceAll(">", "&#62;");
		const _request_skip_if_clicked = ofDisposableListener((resolve) =>
			// @ts-expect-error
			disposableListener("click", resolve as EventListenerOrEventListenerObject)
		);
		if (deadline_end()) {
			_request_skip_if_clicked.refuse();
			return;
		}
		const ADDABLE_DELAY = 40;
		const MIN_DELAY = 60;
		for (const { value: next, index } of new LetterByLetterWriter(text)) {
			if (typeof next === "string") {
				await skippable_sleep(
					(index / text.length) * (ADDABLE_DELAY - MIN_DELAY) + MIN_DELAY
				);
				target_text.value += next;
				continue;
			}
			switch (next.commandKey) {
				case "pause": {
					await skippable_sleep(Number(next.values.time));
					break;
				}
				case "switch-bold": {
					if (_opened_tags.includes("<b>")) {
						target_text.value += "</b>";
						arraySpliceItem(_opened_tags, "<b>");
					} else {
						target_text.value += "<b>";
						_opened_tags.push("<b>");
					}
					break;
				}
				default:
					alert(`next.commandKey ${next.commandKey} is not defined`);
			}
			await sleep(20);
		}
		_request_skip_if_clicked.refuse();

		function skippable_sleep(ms: number) {
			if (_request_skip_if_clicked.isFinally) {
				return;
			}
			return Promise.race([sleep(ms), _request_skip_if_clicked.promise]);
		}
	}
	async function glitch(from: string, to: string) {
		const _request_skip_if_clicked = ofDisposableListener((resolve) =>
			// @ts-expect-error
			disposableListener("click", resolve as EventListenerOrEventListenerObject)
		);
		if (deadline_end()) {
			_request_skip_if_clicked.refuse();
			return;
		}

		for (const state of new GlitchText(from, to)) {
			target_text.value = state
				// @ts-expect-error es2021
				.replaceAll("<", "&#60;")
				.replaceAll(">", "&#62;");
			await skippable_sleep(50);
		}

		_request_skip_if_clicked.refuse();

		function skippable_sleep(ms: number) {
			if (_request_skip_if_clicked.isFinally) {
				return;
			}
			return Promise.race([sleep(ms), _request_skip_if_clicked.promise]);
		}
	}
	function empty() {
		target_text.value = "";
	}
	function currentText() {
		return target_text.value;
	}
	function use_pause(ms: number) {
		return `^[pause time=${ms}]`;
	}

	function switch_bold() {
		return `^[switch-bold]`;
	}

	return {
		use_pause,
		currentText,
		empty,
		glitch,
		write,
		switch_bold,
		async waitClick() {
			return ofDisposableListener((resolve) =>
				disposableListener("click", () => resolve())
			);
		},
		async display_fullscreen_image(src: string) {
			const dialog_vnode = h(FullscreenImage, {
				class: "fullscreen",
				src,
			});
			const vnode = h(
				Transition,
				{
					css: false,
					duration: 1_000,
				},
				() => dialog_vnode
			);
			const mounted = useBodyCustomSlots().pushComponent(vnode);
			return {
				remove() {
					dialog_vnode.el?.classList.add("before-remove");
					setTimeout(mounted.remove, 2_000);
				},
			};
		},
		async make_prompt(prompt: string, color: string) {},
	};
}
