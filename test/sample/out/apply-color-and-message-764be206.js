function $(selector) {
	return document.querySelector(selector);
}

function applyColorsAndMessage(selector, { color, message }) {
	const node = $(selector);
	node.style.backgroundColor = color;
	node.textContent = message;
}

export default applyColorsAndMessage;
