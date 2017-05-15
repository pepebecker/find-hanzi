# Find Hanzi

[![Travis Build Status](https://travis-ci.org/pepebecker/find-hanzi.svg)](https://travis-ci.org/pepebecker/find-hanzi)
[![Coverage Status](https://coveralls.io/repos/github/pepebecker/find-hanzi/badge.svg)](https://coveralls.io/github/pepebecker/find-hanzi)
[![dependency status](https://img.shields.io/david/pepebecker/find-hanzi.svg)](https://david-dm.org/pepebecker/find-hanzi)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/find-hanzi.svg)](https://david-dm.org/pepebecker/find-hanzi#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/find-hanzi.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install find-hanzi@pepebecker/find-hanzi
```

## Usage

```js
const findHanzi = require('find-hanzi')

findHanzi('我')
.then(console.log)
.catch(console.error)
// Output:
// [
//   {
//     hanzi: '我',
//     pinyin: ['wǒ'],
//     cangjie: 'HQI',
//     cangjie2: '竹手戈',
//     strokes: '7',
//     frequency: '1',
//     definition: 'our, us, i, me, my, we'
//   }
// ]

findHanzi('AMYO')
.then(console.log)
.catch(console.error)
// Output:
// [
//   {
//     hanzi: '是',
//     pinyin: ['shì', 'tí'],
//     cangjie: 'AMYO',
//     cangjie2: '日一卜人',
//     strokes: '9',
//     frequency: '1',
//     definition: 'indeed, yes, right; to be; demonstrative pronoun, this, that'
//   }
// ]
```

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/find-hanzi/issues).