'use strict'

const findHanzi = require('../index')

findHanzi('HQI', {fuzzy: false, definition: false, results: 3}).then((data) => {
	for (let item of data) {
		console.log('%s: %s, %s', item.hanzi, item.pinyin, item.definition)
	}
}, console.log)
