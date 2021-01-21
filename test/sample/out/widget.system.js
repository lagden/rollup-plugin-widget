;(() => {
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
