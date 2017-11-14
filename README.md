# Find Hanzi

[![npm version](https://img.shields.io/npm/v/find-hanzi.svg)](https://www.npmjs.com/package/find-hanzi)
[![Travis Build Status](https://travis-ci.org/pepebecker/find-hanzi.svg)](https://travis-ci.org/pepebecker/find-hanzi)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/find-hanzi/badge.svg)](https://coveralls.io/github/pepebecker/find-hanzi)
[![dependency status](https://img.shields.io/david/pepebecker/find-hanzi.svg)](https://david-dm.org/pepebecker/find-hanzi)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/find-hanzi.svg)](https://david-dm.org/pepebecker/find-hanzi#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/find-hanzi.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install find-hanzi
```

## Usage

```js
const findHanzi = require('find-hanzi')

findHanzi('我')
.then(console.log)
.catch(console.error)
// [ {
//   hanzi: '我',
//   pinyin: 'wǒ',
//   pinyinList: ['wǒ'],
//   cangjie: '竹手戈',
//   cangjieRomanized: 'HQI',
//   strokes: '7',
//   frequency: '1',
//   definition: 'our, us, i, me, my, we'
// } ]

findHanzi('AMYO')
.then(console.log)
.catch(console.error)
// [ {
//   hanzi: '是',
//   pinyin: 'shì, tí',
//   pinyinList: ['shì', 'tí'],
//   cangjie: '日一卜人',
//   cangjieRomanized: 'AMYO',
//   strokes: '9',
//   frequency: '1',
//   definition: 'indeed, yes, right; to be; demonstrative pronoun, this, that'
// } ]
```

## Related

- [`pinyin-utils`](https://github.com/pepebecker/pinyin-utils)
- [`pinyin-split`](https://github.com/pepebecker/pinyin-split)
- [`hsk-words`](https://github.com/pepebecker/hsk-words)
- [`pinyin-or-hanzi`](https://github.com/pepebecker/pinyin-or-hanzi)
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)
- [`pinyin-convert`](https://github.com/pepebecker/pinyin-convert)
- [`pinyin-rest`](https://github.com/pepebecker/pinyin-rest)
- [`pinyin-api`](https://github.com/pepebecker/pinyin-api)
- [`pinyin-bot-core`](https://github.com/pepebecker/pinyin-bot-core)
- [`pinyin-telegram`](https://github.com/pepebecker/pinyin-telegram)
- [`pinyin-messenger`](https://github.com/pepebecker/pinyin-messenger)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/find-hanzi/issues).