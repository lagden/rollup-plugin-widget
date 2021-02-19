'use strict'

const {readFile} = require('fs')
const {promisify} = require('util')
const test = require('ava')
const {rollup} = require('rollup')
const widget = require('../src/widget')

const readFileAsync = promisify(readFile)

test('es', async t => {
	const format = 'es'
	const bundle = await rollup({
		input: [
			'test/helper/in/main-a.js',
			'test/helper/in/main-b.js'
		],
		plugins: [
			widget({
				publicPath: '.',
				output: 'widget.es.js',
				nodeEnv: 'production',
				es: format === 'es'
			})
		]
	})

	await bundle.write({
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'test/helper/out',
		format
	})

	const _widget = await readFileAsync('./test/helper/out/widget.es.js', {encoding: 'utf8'})
	t.snapshot(_widget)
})

test('system', async t => {
	const format = 'system'
	const bundle = await rollup({
		input: [
			'test/helper/in/main-a.js',
			'test/helper/in/main-b.js'
		],
		plugins: [
			widget({
				publicPath: '/out',
				output: 'widget.system.js',
				es: format === 'es'
			})
		]
	})

	await bundle.write({
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'test/helper/out',
		format
	})

	const _widget = await readFileAsync('./test/helper/out/widget.system.js', {encoding: 'utf8'})
	t.snapshot(_widget)
})
