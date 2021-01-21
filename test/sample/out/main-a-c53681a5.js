System.register(['./used-by-both-5f3501f5.js'], function (exports, module) {
	'use strict';
	var usedByBoth;
	return {
		setters: [function (module) {
			usedByBoth = module.u;
		}],
		execute: function () {

			var usedByA = {
				color: 'darkslategray',
				message: 'this is only used by the main-a.js entry point, so will be bundled with it'
			};

			module.import('./apply-color-and-message-20d06279.js').then(({ default: apply }) => {
				apply('#a [data-used-by="a"]', usedByA);
				apply('#a [data-used-by="both"]', usedByBoth);
			});

		}
	};
});
