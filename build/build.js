'use strict'

const execSync = require('child_process').execSync

console.log('Downloading Unihan files')
execSync('curl -sL www.unicode.org/Public/UNIDATA/Unihan.zip > build/Unihan.zip')

console.log('Unpacking Unihan files')
execSync('unzip -n -d build/Unihan build/Unihan.zip')

execSync('mkdir -p data')

console.log('Building hanzi2pinyin')
execSync('node build/hanzi2pinyin.js > data/hanzi2pinyin.json')
console.log('Building hanzi2cangjie')
execSync('node build/hanzi2cangjie.js > data/hanzi2cangjie.json')
console.log('Building hanzi2definition')
execSync('node build/hanzi2definition.js > data/hanzi2definition.json')
console.log('Building hanzi2strokes')
execSync('node build/hanzi2strokes.js > data/hanzi2strokes.json')
console.log('Building hanzi2frequency')
execSync('node build/hanzi2frequency.js > data/hanzi2frequency.json')
console.log('Building cangjie2hanzi')
execSync('node build/cangjie2hanzi.js > data/cangjie2hanzi.json')
console.log('Building pinyin2hanzi')
execSync('node build/pinyin2hanzi.js > data/pinyin2hanzi.json')

console.log('Cleaning up')
execSync('rm -rf build/Unihan build/Unihan.zip')
