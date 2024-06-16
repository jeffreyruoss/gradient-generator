export function createPercentInput(value) {
	return `
		<input type="text" class="percent-input" value="${value}" />
	`;
}

export function updatePercentInputValue(marker, position) {
	const percentInput = marker.querySelector('.percent-input');
	percentInput.value = Math.round(position);
}