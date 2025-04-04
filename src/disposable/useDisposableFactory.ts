export function useDisposableFactory(deadline: Function) {
	const disposables: Function[] = [];
	let deadline_end = false;
	deadline(() => {
		disposables.forEach(($) => $());
		deadline_end = true;
	});
	function useDisposable(disposable: Function) {
		disposables.push(disposable);
	}
	return {
		useDisposable,
		disposables,
		deadline_end() {
			return deadline_end;
		},
	};
}
