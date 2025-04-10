export async function orderedCall(callbacks: CallableFunction[]){
	for (const callback of callbacks) {
		await callback()
	}
}