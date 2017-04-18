'use strict'

const cangjie = require('./cangjie.json')
const utils = require('pinyin-utils')
const isNode = require('detect-node')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

let storedData

let matches = []

const onLine = (line, query, options, foundMatch) => {
	const params = line.split('\t')

	let item = {
		unicode: params[0],
		hanzi: params[1],
		pinyin: params[2],
		cangjie: params[3],
		definition: params[4],
		frequency: params[5]
	}

	if (options.search) {
		if (item.definition.match(new RegExp('\\b(' + query + ')\\b'))) {
			matches.push(item)
		}
	} else {
		if (options.fuzzy) {
			if (utils.removeTone(query) && utils.removeTone(query) === utils.removeTone(item.pinyin)) {
				matches.push(item)
			}
		} else {
			if (utils.numberToMark(query) === item.pinyin) {
				matches.push(item)
			}
		}
		if (query === item.cangjie || query === item.unicode || query === item.hanzi) {
			matches = [item]
			foundMatch()
		}
	}
}

const onDone = (options, yay, nay) => {
	if (matches.length > 0) {
		matches = matches.map((match) => {
			let code = match.cangjie.split('')
			code = code.map((c) => cangjie[c])
			match.kangjie = code.join('')
			match.frequency = match.frequency || 9
			return match
		})
		matches = matches.sort((a, b) => a.frequency - b.frequency)
		if (options && options.results) {
			matches = matches.slice(0, options.results)
		}
	}
	yay && yay(matches)
	matches = []
}

const loadData = (done) => {
	if (storedData) {
		done && done(storedData)
	} else {
		const client = new XMLHttpRequest()
		client.open('GET', '/data.txt')
		client.onreadystatechange = function() {
			storedData = client.responseText.split('\n')
			console.log('Data sucessfully loaded')
			loadData()
		}
		client.send()
	}
}

const find = (query, options = {}) => new Promise((yay, nay) => {
	if (isNode) {
		const rl = readline.createInterface({
			input: fs.createReadStream(path.join(__dirname, './data.txt'))
		})

		rl.on('line', function (line) {
			onLine(line, query, options, () => rl.close())
		})

		rl.on('close', function () {
			onDone(options, yay, nay)
		})
	} else {
		loadData((data) => {
			for (let line of data) {
				onLine(line, query, options, () => {
					onDone()
					return
				})
			}
			onDone(options, yay, nay)
		})
	}
})

if (!isNode) {
	loadData()
}

module.exports = find
