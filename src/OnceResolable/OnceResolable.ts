export enum PromiseStatus {
	Pending = 0,
	Fullfilled = 1,
	Refused = 2
}
export class OnceResolable<T> {
	status = PromiseStatus.Pending;

	value?: T;
	_resolve: Function;
	promise: Promise<T>;
	constructor(
		cb: (resolve: Function, reject: Function) => void = () => void 0
	) {
		const { promise, resolve } = Promise.withResolvers();
		this.promise = promise;
		this._resolve = resolve;
		cb(this.resolve, this.refuse);
	}

	get resolve(){
		return (value: T) => {
			if (this.status === PromiseStatus.Pending){
				this.status = PromiseStatus.Fullfilled;
				this.value = value;
			}
			this.resolve(value)
		}
	}

	then<TResult1 = T>(
		onfulfilled?:
			| ((value: T) => TResult1 | PromiseLike<TResult1>)
			| null
			| undefined
	) {
		this.promise.then(onfulfilled);
		return this;
	}
	refuse(){
		this.status = PromiseStatus.Refused;
		this._resolve();
	}
	finally(onfinally?: (() => void) | null | undefined) {
		this.promise.finally(onfinally);
		return this;
	}
	get isResolved() {
		return this.status === PromiseStatus.Fullfilled;
	}
	get isRefused() {
		return this.status === PromiseStatus.Refused;
	}
	get isFinally() {
		return this.status !== PromiseStatus.Pending;
	}
	get [Symbol.toStringTag]() {
		return Promise.prototype[Symbol.toStringTag];
	}
}
