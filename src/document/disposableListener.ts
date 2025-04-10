export function disposableListener(event: keyof DocumentEventMap, listener: (evt: Event) => unknown){
	document.addEventListener(event, listener)
	return () => document.removeEventListener(event, listener)
}

