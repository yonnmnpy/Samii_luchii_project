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

	target.concat(Array.from({ length: diff }).fill(fill) as T[]);
	return target;
}