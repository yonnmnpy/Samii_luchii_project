type Next = string | Command;
enum DefaultCommandKey {
	Pause,
	InsertHTML,
	StartBold,
	EndBold,
	StartItalic,
	EndItalic,
}

interface Command {
	commandKey: DefaultCommandKey | string;
	values: Record<string, string | boolean>;
}

export class LetterByLetterWriter {
	input: string;
	constructor(input: string) {
		this.input = input;
	}
	*[Symbol.iterator](): Generator<Next> {
		const { input } = this;
		for (let index = 0; index < input.length; index++) {
			const character = input[index];
			if (character === "^" && input[index + 1] === "[") {
				const _end = (() => {
					let _current = index + 1;
					while (_current < input.length) {
						if (input[_current] === "]") {
							return _current;
						}
						_current++;
					}
					throw new Error(
						`Invalid input command started at ${index} (${input[index]}), but not ended; Expected « ] »`
					);
				})();
				// ^[ .length = 2
				// ]  .length = 1
				const body = input.slice(index + 2, _end);
				const command = parseCommand(body);
				index = _end;
				yield command;
				continue;
			}
			yield character;
		}
	}
}

function parseCommand(commandBody: string) {
	const [commandKey, ...parameters] = commandBody.split(" ").filter(Boolean);
	const values = Object.fromEntries(
		parameters.map((raw) =>
			arrayPadEnd<string | boolean>(raw.split("="), 2, true)
		)
	);
	return {
		commandKey,
		values,
	};
}


function arrayPadEnd<T>(target: T[], tolength: number, fill: T): T[] {
	const diff = tolength - target.length;
	if (diff <= 0) {
		return target;
	}

	target.concat(Array.from({ length: diff }).fill(fill) as T[]);
	return target;
}
