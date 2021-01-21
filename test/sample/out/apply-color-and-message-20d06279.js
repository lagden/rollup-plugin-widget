System.register([], function (exports) {
	'use strict';
	return {
		execute: function () {

			exports('default', applyColorsAndMessage);

			function $(selector) {
				return document.querySelector(selector);
			}

			function applyColorsAndMessage(selector, { color, message }) {
				const node = $(selector);
				node.style.backgroundColor = color;
				node.textContent = message;
			}

		}
	};
});
