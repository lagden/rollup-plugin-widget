System.register([], function (exports) {
	'use strict';
	return {
		execute: function () {

			var usedByBoth = exports('u', {
				color: 'slategrey',
				message: 'this is used by both entry points, so will be put in its own chunk'
			});

		}
	};
});
