'use strict'

const {readFile} = require('fs')
const {promisify} = require('util')
const test = require('ava')
const {rollup} = require('rollup')
const widget = require('../src/widget')

const readFileAsync = promisify(readFile)

test('esm', async t => {
	const format = 'esm'
	const bundle = await rollup({
		input: [
			'test/sample/in/main-a.js',
			'test/sample/in/main-b.js'
		],
		plugins: [
			widget({
				publicPath: '/out',
				output: 'widget.esm.js',
				esm: format === 'esm'
			})
		]
	})

	await bundle.write({
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'test/sample/out',
		format
	})

	const _widget = await readFileAsync('./test/sample/out/widget.esm.js', {encoding: 'utf8'})
	t.is(_widget, `;(async () => {
	try {
		await import('/out/main-a-a521ca01.js')
		await import('/out/main-b-c93de69a.js')
	} catch (error) {
		console.error('@tadashi/rollup-plugin-widget', error)
	}
})();
`)
})

test('system', async t => {
	const format = 'system'
	const bundle = await rollup({
		input: [
			'test/sample/in/main-a.js',
			'test/sample/in/main-b.js'
		],
		plugins: [
			widget({
				publicPath: '/out',
				output: 'widget.system.js',
				esm: format === 'esm'
			})
		]
	})

	await bundle.write({
		entryFileNames: '[name]-[hash].js',
		chunkFileNames: '[name]-[hash].js',
		dir: 'test/sample/out',
		format
	})

	const _widget = await readFileAsync('./test/sample/out/widget.system.js', {encoding: 'utf8'})
	t.is(_widget, `;(() => {
	const _tadashiSystemJsLoaderTag = document.createElement('script')
	_tadashiSystemJsLoaderTag.defer = true
	_tadashiSystemJsLoaderTag.src = 'https://unpkg.com/systemjs@6.6.1/dist/s.min.js'
	_tadashiSystemJsLoaderTag.addEventListener('load', () => {
		System.import('/out/main-a-c53681a5.js')
		System.import('/out/main-b-563f696c.js')
		System.import('/out/used-by-both-5f3501f5.js')
	})
	document.head.append(_tadashiSystemJsLoaderTag)
})();
`)
})
