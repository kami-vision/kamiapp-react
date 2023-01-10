export default class CustomFormatter {
	constructor() {}
	replaceChange(message, value, regex) {
		for (let key of message.match(regex)) {
			message = message.replace(key, value[key.replace(/\{|\}/g, "")]);
		}
		return message;
	}
	interpolate(message, value) {
		let regex = message.match(/\{[a-zA-Z]+\}/g)
			? /\{[a-zA-Z]+\}/gm
			: message.match(/\{[0-9]+\}/g)
			? /\{[0-9]+\}/gm
			: null;
		message = message.replace(/\’/gm, "'");
		return [regex ? this.replaceChange(message, value, regex) : message];
	}
}
