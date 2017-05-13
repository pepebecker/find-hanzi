'use strict'

const readline = require('readline')
const fs = require('fs')

let data = {}

const rl = readline.createInterface({
	input: fs.createReadStream('build/Unihan/Unihan_Readings.txt')
})

rl.on('line', (line) => {

	if (line == "" || /^#/.test(line)) {
		return
	}

	const params = line.split('\t')

	let codepoint = params[0]
	codepoint = '0x' + codepoint.replace('U+', '')

	const hanzi = String.fromCodePoint(codepoint)
	const key = params[1]
	const value = params[2]

	if (key === 'kHanyuPinyin') {
		let pinyin = value.split(':')[1]
		pinyin = pinyin.split(',')[0]
		data[pinyin] = data[pinyin] || []
		data[pinyin].push(hanzi)
	}
})

rl.on('close', () => {
	const json = JSON.stringify(data)
	process.stdout.write(json)
})
