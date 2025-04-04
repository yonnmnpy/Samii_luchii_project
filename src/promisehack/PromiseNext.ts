export enum PromiseState {
	Pending = 0,
	Fullfilled = 1,
	Rejected = 2,
}
export class PromiseHack<T> implements Promise<T> {
	status = PromiseState.Pending;
	resolve: Function;
	reject: Function;
	promise: Promise<T>
	constructor(
		cb: (resolve: Function, reject: Function) => void = () => void 0
	) {
		const {promise, resolve, reject} = Promise.withResolvers();
		this.promise = promise;
		this.resolve = resolve;
		this.reject = reject;
		this.then(() => (this.status = PromiseState.Fullfilled))
		this.catch(
		 	() => (this.status = PromiseState.Rejected)
		)
		cb(resolve, reject);
	}
	then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) {
		this.promise.then(onfulfilled, onrejected)
		return this;
	}
	catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) {
		this.promise.catch(onrejected)
		return this
	}
	finally(onfinally?: (() => void) | null | undefined) {
		this.promise.finally(onfinally)
		return this
	}
	get isResolved() {
		return this.status === PromiseState.Fullfilled;
	}
	get isRejected() {
		return this.status === PromiseState.Rejected;
	}
	get isFinally() {
		return this.status !== PromiseState.Pending;
	}
	get [Symbol.toStringTag](){
		return Promise.prototype[Symbol.toStringTag]
	}
}
