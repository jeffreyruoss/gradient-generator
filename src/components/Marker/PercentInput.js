import { autoSave } from '../../lib/auto-save';
import { gradientStops } from '../../lib/gradient-stops';
import { getGradientRectangle, updateGradient } from '../GradientContainer';
import { updateMarkerMove, reorderMarkers } from './move-marker';

export function createPercentInput(value) {
	value = value.replace('%', '');
	value = Math.round(parseFloat(value));
	return `
		<div class="percent-input-container">
			<input class="percent-input" min="0" max="100" value="${value}" />
		</div>
	`;
}

export function updatePercentInputValue(marker, position) {
	const percentInput = marker.querySelector('.percent-input');
	percentInput.value = Math.round(position);
}

function handleInputChange(event) {
	const input = event.target;
	const value = Math.round(parseFloat(input.value));
	input.value = value;
	if (value < 0 || isNaN(value)) {
		input.value = 0;
	}
	if (value > 100) {
		input.value = 100;
	}
}

function handleInputSubmit(event, marker) {
	event.preventDefault();
	const input = marker.querySelector('.percent-input');
	const value = Math.round(parseFloat(input.value));
	if (value < 0 || isNaN(value)) {
		input.value = 0;
	}
	if (value > 100) {
		input.value = 100;
	}
	const position = Number(input.value);
	updateMarkerMove(marker, position);
	reorderMarkers();
	const gradientRectangle = getGradientRectangle();
	updateGradient(gradientRectangle);
	autoSave();
}

export function initPercentInput() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker) => {
		const percentInput = marker.querySelector('.percent-input');
		if (!percentInput.hasInputListener) {
			percentInput.addEventListener('input', handleInputChange);
			percentInput.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					handleInputSubmit(event, marker);
				}
			});
			percentInput.hasInputListener = true;
		}
	});
}