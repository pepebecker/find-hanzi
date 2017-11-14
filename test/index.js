'use strict'

const findHanzi = require('../index')

describe('Get character from cangjie code', () => {
	it('should return 我', () => {
		return findHanzi('竹手戈').then((data) => {
			data.length.should.equal(1)
			data[0].hanzi.should.equal('我')
		})
	})
})

describe('Get character from romanized cangjie code', () => {
	it('should return 你', () => {
		return findHanzi('ONF').then((data) => {
			data.length.should.equal(1)
			data[0].hanzi.should.equal('你')
		})
	})
})

describe('Get pinyin from character', () => {
	it('should return wǒ', () => {
		return findHanzi('我').then((data) => {
			data.length.should.equal(1)
			data[0].pinyin.should.deepEqual('wǒ')
		})
	})
})
