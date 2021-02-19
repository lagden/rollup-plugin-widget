'use strict'

import {createWriteStream} from 'fs'
import {join, dirname} from 'path'

function _snippet(jss, _module, nodeEnv) {
	const _data = []
	if (nodeEnv) {
		_data.push(
			"globalThis.process = typeof globalThis.process === 'object' ? globalThis.process : {}",
			'globalThis.process.env = globalThis.process.env ?? {}',
			"globalThis.process.env = typeof globalThis.process.env === 'object' ? globalThis.process.env : {}",
			`globalThis.process.env = {...globalThis.process.env, NODE_ENV: '${nodeEnv}'}`
		)
	}
	if (_module) {
		return `${_data.join('\n')}
;(async () => {
	try {
		${jss.filter(js => js.isEntry).map(js => `await import('${js.path}')`).join('\n\t\t')}
	} catch (error) {
		console.error('@tadashi/rollup-plugin-widget', error)
	}
})();
`
	}

	return `${_data.join('')}
;(() => {
	const _tadashiSystemJsLoaderTag = document.createElement('script')
	_tadashiSystemJsLoaderTag.defer = true
	_tadashiSystemJsLoaderTag.src = 'https://unpkg.com/systemjs@6.8.3/dist/s.min.js'
	_tadashiSystemJsLoaderTag.addEventListener('load', () => {
		${jss.map(js => `System.import('${js.path}')`).join('\n\t\t')}
	})
	document.head.append(_tadashiSystemJsLoaderTag)
})();
`
}

export default function widget(options = {}) {
	let _dir = ''
	options = {
		output: 'widget.js',
		additional: [],
		publicPath: '',
		nodeEnv: '',
		es: false,
		...options
	}
	return {
		name: 'widget',
		generateBundle(opts) {
			_dir = (opts.file && dirname(opts.file)) || opts.dir || ''
		},
		writeBundle(opts, bundle) {
			const bundleList = Object.keys(bundle)
				.filter(f => !bundle[f].isDynamicEntry)
				.map(f => ({
					isEntry: bundle[f].isEntry,
					path: `${options.publicPath}/${f}`
				}))
			const files = [
				...options.additional,
				...bundleList
			]
			const stream = createWriteStream(join(_dir, options.output))
			stream.end(_snippet(files, options.es, options.nodeEnv))
		}
	}
}
