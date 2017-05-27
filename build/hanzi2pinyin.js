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

    data[codepoint] = data[codepoint] || {hanzi}

    if (key === 'kHanyuPinyin' || (key === 'kXHC1983' && !data[codepoint].pinyin)) {
        let pinyin = value.split(' ')
        pinyin = pinyin.map((p) => p.split(':')[1].split(','))
        pinyin = [].concat.apply([], pinyin)
        data[codepoint].pinyin = removeDuplicates(pinyin)
    }

    if (key === 'kMandarin') {
        let pinyin = data[codepoint].pinyin || []
        pinyin.unshift(value)
        data[codepoint].pinyin = removeDuplicates(pinyin)
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
