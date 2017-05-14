'use strict'

const cangjie2radicals	= require('./cangjie.json')
const cangjie2hanzi			= require('./data/cangjie2hanzi.json')
const hanzi2cangjie			= require('./data/hanzi2cangjie.json')
const hanzi2definition	= require('./data/hanzi2definition.json')
const hanzi2frequency		= require('./data/hanzi2frequency.json')
const hanzi2pinyin			= require('./data/hanzi2pinyin.json')
const hanzi2strokes			= require('./data/hanzi2strokes.json')
const pinyin2hanzi			= require('./data/pinyin2hanzi.json')

const utils = require('pinyin-utils')

const find = (query, options = {}) => new Promise((yay, nay) => {
	let cangjie = hanzi2cangjie[query]	// Input type: hanzi
	let hanzi = cangjie2hanzi[query]		// Input type: cangjie
	let hanzies = pinyin2hanzi[utils.numberToMark(query)] // Input type: pinyin

	// Input is hanzi
	if (cangjie) {
		const hanzi = query
		const pinyin = hanzi2pinyin[hanzi]
		const cangjie2 = cangjie.split('').map((c) => cangjie2radicals[c]).join('')
		const strokes = hanzi2strokes[hanzi]
		const frequency = hanzi2frequency[hanzi]
		const definition = hanzi2definition[hanzi]
		yay([{hanzi, pinyin, cangjie, cangjie2, strokes, frequency, definition}])
		return
	}

	// Input is cangjie
	if (hanzi) {
		cangjie = query
		const pinyin = hanzi2pinyin[hanzi]
		const cangjie2 = cangjie.split('').map((c) => cangjie2radicals[c]).join('')
		const strokes = hanzi2strokes[hanzi]
		const frequency = hanzi2frequency[hanzi]
		const definition = hanzi2definition[hanzi]
		yay([{hanzi, pinyin, cangjie, cangjie2, strokes, frequency, definition}])
		return
	}

	// Input is pinyin
	if (hanzies) {
		const list = []
		for (hanzi of hanzies) {
			cangjie = hanzi2cangjie[hanzi]
			if (!cangjie) continue
			const pinyin = hanzi2pinyin[hanzi] || utils.numberToMark(query)
			const cangjie2 = cangjie.split('').map((c) => cangjie2radicals[c]).join('')
			const strokes = hanzi2strokes[hanzi]
			const frequency = hanzi2frequency[hanzi] || 9
			const definition = hanzi2definition[hanzi]
			list.push({hanzi, pinyin, cangjie, cangjie2, strokes, frequency, definition})
		}
		yay(list.sort((a, b) => a.frequency - b.frequency))
		return
	}
	
	yay([])
})

module.exports = find
