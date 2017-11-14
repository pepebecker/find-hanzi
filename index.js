'use strict'

const cangjie2radical   = require('./cangjie.json')
const cangjie2hanzi     = require('./data/cangjie2hanzi.json')
const hanzi2cangjie     = require('./data/hanzi2cangjie.json')
const hanzi2definition  = require('./data/hanzi2definition.json')
const hanzi2frequency   = require('./data/hanzi2frequency.json')
const hanzi2pinyin      = require('./data/hanzi2pinyin.json')
const hanzi2strokes     = require('./data/hanzi2strokes.json')
const pinyin2hanzi      = require('./data/pinyin2hanzi.json')

const utils = require('pinyin-utils')
const invert = require('lodash/invert')

const cangjie2roman = invert(cangjie2radical)

const mapString = (input, object) => {
    let output = ''
    for (let i = 0; i < input.length; i++) {
        const char = input[i]
        output += object[char]
    }
    return output
}

const buildCharacterData = (hanzi, cangjie, cangjieRomanized) => {
    const pinyinList = hanzi2pinyin[hanzi]
    const pinyin = pinyinList.join(', ')
    const strokes = hanzi2strokes[hanzi]
    const frequency = hanzi2frequency[hanzi] || 100
    const definition = hanzi2definition[hanzi]
    return {
        hanzi,
        pinyin,
        pinyinList,
        cangjie,
        cangjieRomanized,
        strokes,
        frequency,
        definition
    }
}

const find = (query, options = {}) => new Promise((resolve, reject) => {
    if (/[A-z]/.test(query)) {
        if (pinyin2hanzi[utils.numberToMark(query)]) {
            // Check if input is Pinyin
            let hanziList = pinyin2hanzi[utils.numberToMark(query)]
            if (hanziList && hanziList.length > 1) {
                hanziList = hanziList.map(hanzi => {
                    const cangjie = hanzi2cangjie[hanzi]
                    const cangjieRomanized = mapString(cangjie, cangjie2roman)
                    return buildCharacterData(hanzi, cangjie, cangjieRomanized)
                })
                resolve(hanziList.sort((a, b) => a.frequency - b.frequency))
                return
            }
        } else {
            // Check if input is romanized Cangjie
            const cangjieRomanized = query
            const cangjie = mapString(query, cangjie2radical)
            const hanzi = cangjie2hanzi[cangjie]
            if (hanzi && cangjie && cangjieRomanized) {
                const data = buildCharacterData(hanzi, cangjie, cangjieRomanized)
                resolve([data])
                return
            }
        }
    } else {
        if (query.length > 1) {
            // Check if input is Cangjie
            const cangjieRomanized = mapString(query, cangjie2roman)
            const cangjie = query
            const hanzi = cangjie2hanzi[cangjie]
            if (hanzi && cangjie && cangjieRomanized) {
                const data = buildCharacterData(hanzi, cangjie, cangjieRomanized)
                resolve([data])
                return
            }
        } else {
            // Check if input is Hanzi
            const hanzi = query
            const cangjie = hanzi2cangjie[hanzi]
            const cangjieRomanized = mapString(cangjie, cangjie2roman)
            if (hanzi && cangjie && cangjieRomanized) {
                const data = buildCharacterData(hanzi, cangjie, cangjieRomanized)
                resolve([data])
                return
            }
        }
    }
    
    reject(new Error('Cannot find hanzi for query: ' + query))
})

module.exports = find
