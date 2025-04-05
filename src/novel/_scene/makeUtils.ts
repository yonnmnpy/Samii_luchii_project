import { disposableListener } from "@/document/disposableListener";
import { ofDisposableListener } from "@/OnceResolable/ofDisposableListener";
import { sleep } from "@/sleep";
import { GlitchText } from "@/text/transformations/GlitchText";
import { LetterByLetterWriter } from "@/text/transformations/LetterByLetterWriter";
import type { Ref } from "vue";

export function _makeUtilsBy(texthere_text: Ref<string>, deadline_end: Function){
	async function write(text: string) {
		const _request_skip_if_clicked = ofDisposableListener((resolve) =>
			disposableListener("click", resolve as EventListenerOrEventListenerObject)
		);
		if (deadline_end()) {
			_request_skip_if_clicked.refuse();
			return;
		}
		for (const next of new LetterByLetterWriter(text)) {
			if (typeof next === "string") {
				texthere_text.value += next;
				await Promise.race([sleep(50), _request_skip_if_clicked.promise]);
				if (_request_skip_if_clicked.isResolved) {
					texthere_text.value = text;
					break;
				}
				continue;
			}
			switch (next.commandKey) {
				case "pause": {
					await Promise.race([
						sleep(Number(next.values.time)),
						_request_skip_if_clicked.promise,
					]);
					break;
				}
			}
		}
		_request_skip_if_clicked.refuse();
	}
	async function glitch(from: string, to: string) {
		for (const state of new GlitchText(from, to)) {
			texthere_text.value = state;
			await sleep(50);
		}
	}
	function empty() {
		texthere_text.value = "";
	}
	function currentText() {
		return texthere_text.value;
	}
	function write_pause(ms: number) {
		return `^[pause time=${ms}]`;
	}

	return {
		write_pause,
		currentText,
		empty,
		glitch,
		write
	}
}