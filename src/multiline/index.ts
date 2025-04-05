/*
Пропустить элемент, если false, null или undefined
Если элемент — строка, добавить символ перевода строки
*/

export function multiline( contents: any[] ): string {
	return contents
		.map($ => $ instanceof String ? `${$}\n` : $)
		.flat()
		.filter(
			content =>
				content !== false && content !== null && content !== undefined ,
		)
		.map( String )
		.join( '' )
}