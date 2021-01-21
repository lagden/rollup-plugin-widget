import { u as usedByBoth } from './used-by-both-77b986b5.js';

var usedByB = {
	color: 'darkslateblue',
	message: 'this is only used by the main-b.js entry point, so will be bundled with it'
};

import('./apply-color-and-message-764be206.js').then(({ default: apply }) => {
	apply('#b [data-used-by="b"]', usedByB);
	apply('#b [data-used-by="both"]', usedByBoth);
});
