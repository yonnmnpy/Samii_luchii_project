import { OnceResolable } from "@/OnceResolable/OnceResolable";

export function ofDisposableListener<T>(cb: (resolve: Function) => () => void) {
	const promise_like = new OnceResolable<T>()
	const dispose = cb(promise_like.resolve);
	promise_like.finally(dispose);
	return promise_like;
}
