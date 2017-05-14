'use strict'

const readline = require('readline')
const fs = require('fs')
const pickBy = require('lodash/pickBy')
const mapValues = require('lodash/mapValues')
const mapKeys = require('lodash/mapKeys')

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

	data[codepoint] = data[codepoint] || {hanzi}

	if (key === 'kHanyuPinyin') {
		const pinyin = value.split(':')[1]
		data[codepoint].pinyin = pinyin.split(',')
	}

	if (key === 'kDefinition') {
		data[codepoint].definition = value
	}
})

rl.on('close', () => {
	data = pickBy(data, (o) => {
		const a = o.definition
		const b = !(/Cant\./.test(o.definition))
		return a && b
	})

	data = mapKeys(data, (o, k) => o.hanzi)
	data = mapValues(data, (o) => o.pinyin)

	const json = JSON.stringify(data)
	process.stdout.write(json)
})