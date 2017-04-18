const readline = require('readline')
const fs = require('fs')
const utils = require('pinyin-utils')

let lines = []
lastLineCount = 0

const rl1 = readline.createInterface({
	input: fs.createReadStream('./Unihan/Unihan_Cangjie.txt')
})

rl1.on('line', function (line) {
	lines.push(line)
})

rl1.on('close', function () {
	console.log('Done Reading Unihan_Cangjie.txt')
	console.log('Read %d lines', lines.length)
	lastLineCount = lines.length

	const rl2 = readline.createInterface({
		input: fs.createReadStream('./Unihan/Unihan_Readings.txt')
	})

	let list = []
	let currentItem = {}

	rl2.on('line', function (line) {
		if (line.length === 0 || line.substring(0, 1) === "#") return

		let params = line.split('\t')
		
		if (currentItem.unicode && currentItem.unicode !== params[0]) {
			if (currentItem.mandarin && currentItem.definition && currentItem.cangjie) {
				list.push(currentItem)
			}
			currentItem = {}
		}

		currentItem.unicode = params[0]
		currentItem.hanzi = utils.unicodeToHanzi(currentItem.unicode)

		if (params[1] === "kMandarin") {
			currentItem.mandarin = params[2]
		}

		if (currentItem.mandarin) {
			currentItem.pinyin = utils.mandarinToPinyin(currentItem.mandarin)
		}

		if (params[1] === "kDefinition") {
			currentItem.definition = params[2]
		}

		if (currentItem.cangjie === undefined) {
			var found = false
			for (var i = 0; i < lines.length; i++) {
				params = lines[i].split('\t')
				if (params[0] === currentItem.unicode) {
					found = true
					if (lastLineCount - lines.length > 100) {
						console.log('Remaining Lines:', lines.length)
						lastLineCount = lines.length
					}
					if (params[1] === 'kCangjie') {
						currentItem.cangjie = params[2]
					}
					if (params[1] === 'kFrequency') {
						currentItem.frequency = params[2]
					}
					lines.splice(i, 1)
					i --
				} else {
					if (found) {
						found = false
						return
					}
				}
			}
		}
	})

	rl2.on('close', function () {
		let outLines = []

		list = list.map((item) => {
				item.frequency = item.frequency || 9
				return item
			})


		list = list.sort((a, b) => a.frequency - b.frequency)

		for (let item of list) {
			let line = item.unicode + '\t'
			line += item.hanzi + '\t'
			line += item.mandarin + '\t'
			// line += item.pinyin + '\t'
			line += item.cangjie + '\t'
			line += item.definition + '\t'
			line += item.frequency
			outLines.push(line)
		}

		fs.writeFile('../data.txt', outLines.join('\n'), 'utf8', function () {
			console.log('Parsed %d characters', list.length)
		})
	})
})