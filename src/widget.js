import {createWriteStream} from 'node:fs'
import path from 'node:path'

function _snippet(files) {
	return files.filter(js => js.isEntry).map(js => `await import('${js.pathname}')`).join('\n')
}

function createFile(output, files) {
	return new Promise((resolve, reject) => {
		const stream = createWriteStream(output)
		stream
			.on('finish', resolve)
			.on('error', reject)
			.end(_snippet(files))
	})
}

export default function widget(options = {}) {
	options = {
		output: 'widget.js',
		path: '.',
		more: [],
		...options,
	}

	return {
		name: 'widget',
		async writeBundle(opts, bundle) {
			const bundleList = Object
				.keys(bundle)
				.filter(f => !bundle[f].isDynamicEntry)
				.map(f => ({
					isEntry: bundle[f].isEntry,
					pathname: `${options.path}${f}`,
				}))

			const files = [
				...options.more,
				...bundleList,
			]

			const _dir = opts.file ? path.dirname(opts.file) : opts?.dir ?? ''
			await createFile(path.join(_dir, options.output), files)
		}
	}
}
