'use strict'

const hanzi2pinyin = require('../data/hanzi2pinyin.json')

const readline = require('readline')
const fs = require('fs')

let data = {}

const rl = readline.createInterface({
    input: fs.createReadStream('build/Unihan/Unihan_Readings.txt')
})

const removeDuplicates = (array) => {
    const seen = {}
    return array.filter((item) => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
}

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

    if (!hanzi2pinyin[hanzi]) return

    if (key === 'kHanyuPinyin') {
        let pinyins = value.split(' ')
        pinyins = pinyins.map((p) => p.split(':')[1].split(','))
        pinyins = [].concat.apply([], pinyins)
        pinyins = removeDuplicates(pinyins)
        for (let pinyin of pinyins) {
            let chars = data[pinyin] || []
            chars = chars.concat(hanzi)
            data[pinyin] = removeDuplicates(chars)
        }
    }

    if (key === 'kMandarin') {
        let chars = data[value] || []
        chars.push(hanzi)
        data[value] = removeDuplicates(chars)
    }
})

rl.on('close', () => {
    const json = JSON.stringify(data)
    process.stdout.write(json)
})
