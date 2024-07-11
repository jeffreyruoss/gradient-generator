import { addInputListeners } from './percent-input-handlers';

export function createPercentInput(value) {
	const sanitizedValue = Math.round(parseFloat(value.replace('%', '')));
	return `
		<div class="percent-input-container">
			<input type="number" class="percent-input" min="0" max="100" value="${sanitizedValue}" />
		</div>
	`;
}

export function updatePercentInputValue(marker, position) {
	marker.querySelector('.percent-input').value = Math.round(position);
}

export function initPercentInput() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach(addInputListeners);
}