
// Мы ищем кратчайший путь к точке "a" с точки "b", учитывая что перемещение идет по окружности
export function from_angle_to_angle_as_short_way(a: number, b: number){
	const base_diff = a - b;
	if (base_diff > Math.PI){
		return base_diff - 2 * Math.PI
	}
	if (base_diff < -Math.PI){
		return base_diff + 2 * Math.PI
	}
	return base_diff
}

// export function angle_short_delta(a: number, b: number){
// 	const diff = from_angle_to_angle_as_short_way(a, b);
// 	return {
// 		delta: Math.abs(diff),
// 		byclockwise: diff > 0
// 	}
// }


