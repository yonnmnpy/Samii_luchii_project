import { PromiseHack } from "@/promisehack/PromiseNext";

export function ofDisposableListener<T>(cb: (resolve: Function) => () => void) {
	const promise_hack = new PromiseHack<T>()
	const dispose = cb(promise_hack.resolve);
	promise_hack.finally(dispose);
	return promise_hack;
}
