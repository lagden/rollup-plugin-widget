'use strict'

const config = [
	{
		input: 'src/widget.js',
		output: [
			{
				file: 'dist/index.js',
				format: 'es',
				sourcemap: true,
				strict: false
			}, {
				file: 'dist/index.cjs.js',
				format: 'cjs',
				exports: 'default',
				sourcemap: true,
				strict: false
			}
		],
		external: ['fs', 'path']
	}
]

export default config
