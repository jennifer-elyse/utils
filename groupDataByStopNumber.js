
/**
 * Takes an array of objects that each contain a `key` string and a `data` array, and groups the data by the `stopNumber` attribute.
 * Each object in the `data` array is expected to contain a `stopNumber` attribute. 
 * The function validates the structure of the `keyDataPairs` and the `data` arrays, and throws an error if they don't conform.
 * It then groups the data by `stopNumber`, and returns an array of objects, each containing a `stopNumber` and arrays of data grouped by `key`.
 *
 * @param {Array<{key: string, data: Array<{stopNumber: string}>}>} keyDataPairs - The array of key-data pairs to be grouped.
 *
 * @returns {Array<{stopNumber: string}>} An array of objects, each containing a `stopNumber` and arrays of data grouped by `key`.
 *
 * @throws {Error} If any of the `keyDataPairs` does not contain a `key` or `data`, or if these properties are not the expected types,
 * or if any of the `data` objects does not contain a `stopNumber` attribute, or if this attribute is not a string containing only digits,
 * or if the stop number is not greater than 0.
 */
export function groupDataByStopNumber(keyDataPairs) {
	// Validate Data
	const stopNumberRegExp = /^\d+$/;
	for (const pair of keyDataPairs) {
		if (!Object.hasOwn(pair, 'key')) {
			throw new Error('Missing "key" property in keyDataPairs entry.');
		}
		if (!Object.hasOwn(pair, 'data')) {
			throw new Error('Missing "data" property in keyDataPairs entry.');
		}
		if (typeof pair.key !== 'string') {
			throw new Error(`Non-string "key" property found in keyDataPairs entry. Found: ${pair.key} (type: ${typeof pair.key})`);
		}
		if (!Array.isArray(pair.data)) {
			throw new Error(`Non-array "data" property found in keyDataPairs entry. Found: ${pair.data} (type: ${typeof pair.data})`);
		}
		for (const item of pair.data) {
			if (!Object.hasOwn(item, 'stopNumber')) {
				throw new Error(`Missing "stopNumber" property in the data for key "${pair.key}".`);
			}
			if (typeof item.stopNumber !== 'string') {
				throw new Error(`Non-string "stopNumber" property found in the data for key "${pair.key}". Found: ${item.stopNumber} (type: ${typeof item.stopNumber})`);
			}
			if (!stopNumberRegExp.test(item.stopNumber)) {
				throw new Error(`Found a "stopNumber" property containing non-digit characters in the data for key "${pair.key}". Found: "${item.stopNumber}"`);
			}
			if (parseInt(item.stopNumber, 10) === 0) {
				throw new Error(`Stop numbers must be greater than 0. Violation found in the data for key "${pair.key}". Found: "${item.stopNumber}"`);
			}
		}
	}

	// Process Data
	const tempGroupingMap = new Map();
	for (const { key, data } of keyDataPairs) {
		for (const item of data) {
			if (!tempGroupingMap.has(item.stopNumber)) {
				const newReportDetails = { stopNumber: item.stopNumber };
				for (const pair of keyDataPairs) {
					newReportDetails[pair.key] = [];
				}
				tempGroupingMap.set(item.stopNumber, newReportDetails);
			}
			const reportDetails = tempGroupingMap.get(item.stopNumber);
			reportDetails[key].push(item);
		}
	}

	const stopsArray = Array.from(tempGroupingMap.values());
	stopsArray.sort((a, b) => parseInt(a.stopNumber, 10) - parseInt(b.stopNumber, 10));
	return stopsArray;
}

		// const tempGroupingMap = new Map();

		// for (const associate of results[1]) {
		// 	if (!tempGroupingMap.has(associate.stopNumber)) {
		// 		tempGroupingMap.set(associate.stopNumber, {
		// 			stopNumber: associate.stopNumber,
		// 			associates: [associate],
		// 			signatures: []
		// 		});
		// 	} else {
		// 		const reportDetails = tempGroupingMap.get(associate.stopNumber);
		// 		reportDetails.associates.push(associate);
		// 	}
		// }

		// for (const signature of results[2]) {
		// 	if (!tempGroupingMap.has(signature.stopNumber)) {
		// 		tempGroupingMap.set(signature.stopNumber, {
		// 			stopNbr: signature.stopNumber,
		// 			associates: [],
		// 			signatures: [signature]
		// 		});
		// 	} else {
		// 		const reportDetails = tempGroupingMap.get(signature.stopNumber);
		// 		reportDetails.signatures.push(signature);
		// 	}
		// }

		// const stopsArray = Array.from(tempGroupingMap.values());
		// stopsArray.sort((a, b) => parseInt(a.stopNumber, 10) - parseInt(b.stopNumber, 10));
