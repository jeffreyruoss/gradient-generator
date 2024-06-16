import { createTrashIcon } from '../TrashIcon.js';
import { createColorPicker } from '../ColorPicker.js';
import { createPercentInput } from './PercentInput.js';
import { getGradientRectangle, updateGradient } from '../GradientContainer.js';
import { updateGradientStops } from '../../lib/gradient-stops.js';
import { initColorisPickers, initColorSwatches } from '../ColorPicker.js';
import { initTrashButtons } from '../TrashIcon.js';
import { handleMouseDown } from './move-marker.js';

export function createMarker(position, color, index) {
	return `
    <div class="marker" style="left: ${position};" data-color-value="${color}" data-stop-index="${index + 1}">
			${createTrashIcon()}
			${createColorPicker(color)}
			</div>
			${createPercentInput(position)}
    </div>
  `;
}

export function initMarkers() {
	const gradientRectangle = getGradientRectangle();
	const markers = gradientRectangle.getElementsByClassName('marker');
	Array.from(markers).forEach((marker, index) => {
		marker.dataset.stopIndex = index;
		const startX = gradientRectangle.offsetLeft;
		marker.addEventListener('mousedown', (event) => handleMouseDown(event, marker, startX));
	});
}

export function updateMarkerIndices() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker, index) => {
		marker.dataset.stopIndex = index;
	});
}

export function updateUI() {
	updateMarkerIndices();
	updateGradientStops();
	initMarkers();
	initColorSwatches();
	initColorisPickers();
	initTrashButtons();
	updateGradient();
}