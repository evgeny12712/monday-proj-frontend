export const utilService = {

	getRandomColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	},

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	},
	makeId(length = 5) {
		let txt = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++)
			txt += possible.charAt(Math.floor(Math.random() * possible.length));

		return txt;
	},

	applyDrag(arr, dragResult) {
		const { removedIndex, addedIndex, payload } = dragResult;
		if (removedIndex === null && addedIndex === null) return arr;

		const result = [...arr];
		let itemToAdd = payload;

		if (removedIndex !== null) {
			itemToAdd = result.splice(removedIndex, 1)[0];
		}

		if (addedIndex !== null) {
			result.splice(addedIndex, 0, itemToAdd);
		}

		return result;
	},

	generateItems(count, creator) {
		const result = [];
		for (let i = 0; i < count; i++) {
			result.push(creator(i));
		}
		return result;
	},


	calcDaysPassed(date1, date2) {
		return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	},

	limitStr(str, limit = 15) {
		return str.length > limit ? str.substr(0, limit) : str;
	},
	// Format Currency
	formatCur(value, currency = 'USD', locale = 'en-Us') {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
		}).format(value);
	},
	getJSON(url, errorMsg = 'Something went wrong') {
		console.log(url);
		return fetch(url).then((response) => {
			if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
			const temp = response.json();
			return temp;
		});
	},
	months:
		'January, February, March, April, May, June, July, August, September, October, November, December'.split(
			', '
		),
};
