import { autoSave } from '../../lib/auto-save';
import { updateGradientStops } from '../../lib/gradient-stops';
import { getGradientRectangle, updateGradient } from '../GradientContainer';
import { updateMarkerMove } from './move-marker';
import { reorderMarkers } from "./reorder-markers";

let isSubmitting = false;

function clampValue(value, min = 0, max = 100) {
	return Math.max(min, Math.min(max, value));
}

export function handleInputChange(event) {
	const input = event.target;
	input.value = clampValue(Math.round(parseFloat(input.value)) || 0);
}

export function handleInputSubmit(event, marker) {
	event.preventDefault();
	const input = marker.querySelector('.percent-input');
	input.value = clampValue(Math.round(parseFloat(input.value)));

	updateMarkerMove(marker, Number(input.value));
	reorderMarkers();
	updateGradientStops();
	updateGradient(getGradientRectangle());
	autoSave();

	if (event.type === 'keydown') {
		input.blur();
	}
}

function submitIfNotAlreadySubmitting(event, marker) {
	if (isSubmitting) return;
	isSubmitting = true;
	handleInputSubmit(event, marker);
	isSubmitting = false;
}

export function addInputListeners(marker) {
	const percentInput = marker.querySelector('.percent-input');
	if (percentInput.hasInputListener) return;

	percentInput.addEventListener('input', handleInputChange);
	percentInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			submitIfNotAlreadySubmitting(event, marker);
		}
	});
	percentInput.addEventListener('blur', (event) => submitIfNotAlreadySubmitting(event, marker));

	percentInput.addEventListener('touchstart', () => {
		percentInput.focus();
		percentInput.select();
	});

	percentInput.hasInputListener = true;
}