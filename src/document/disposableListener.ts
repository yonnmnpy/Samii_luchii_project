export function disposableListener(event: keyof DocumentEventMap, listener: EventListenerOrEventListenerObject){
	document.addEventListener(event, listener)
	return () => document.removeEventListener(event, listener)
}

