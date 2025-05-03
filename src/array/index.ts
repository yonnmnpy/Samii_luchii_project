export function arraySpliceItem<T>(array: T[], searchElement: T) {
	const index = array.indexOf(searchElement);
	if (index === -1) {
		return false;
	}
	array.splice(index, 1);
	return true;
}

export function arrayPadEnd<T>(target: T[], tolength: number, fill: T): T[] {
	const diff = tolength - target.length;
	if (diff <= 0) {
		return target;
	}

	return target.concat(Array.from({ length: diff }).fill(fill) as T[]);
}


export function arrayOf<T>(length: number, mapFn: (i: number) => T): T[] {
	return Array.from({length}, mapFn)
}

export function removeFromArray<T>(array: Array<T>, item: T){
	const index = array.indexOf(item)
	if (index === -1){
		return false
	}
	array.splice(index, 1)
	return true
}