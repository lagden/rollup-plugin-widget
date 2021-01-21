import { u as usedByBoth } from './used-by-both-77b986b5.js';

var usedByA = {
	color: 'darkslategray',
	message: 'this is only used by the main-a.js entry point, so will be bundled with it'
};

import('./apply-color-and-message-764be206.js').then(({ default: apply }) => {
	apply('#a [data-used-by="a"]', usedByA);
	apply('#a [data-used-by="both"]', usedByBoth);
});
