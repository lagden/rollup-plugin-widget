import {readFile} from 'node:fs/promises'
import {rollup} from 'rollup'
import test from 'ava'
import widget from '../src/widget.js'

test('widget', async t => {
	const bundle = await rollup({
		input: [
			'test/helper/in/main-a.js',
			'test/helper/in/main-b.js',
		],
		plugins: [
			widget(),
		],
	})

	await bundle.write({
		entryFileNames: '[name]-[hash].js',
		dir: 'test/helper/out',
		format: 'es',
	})

	const file = new URL('helper/out/widget.js', import.meta.url)
	const _widget = await readFile(file, {encoding: 'utf8'})

	t.snapshot(_widget)
})
