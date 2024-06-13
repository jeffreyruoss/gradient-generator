import { createTrashIcon } from './TrashIcon.js';
import { createColorPicker } from './ColorPicker.js';
import { getGradientRectangle } from './GradientContainer.js';
import { updateGradientStops } from '../lib/gradient-stops.js';
import { handleMouseDown } from '../main.js';
import { initColorisPickers, initColorSwatches } from './ColorPicker.js';
import { initTrashButtons } from './TrashIcon.js';

export function createMarker(position, color, index) {
	return `
    <div class="marker" style="left: ${position};" data-color-value="${color}" data-stop-index="${index + 1}">
			${createTrashIcon()}
			${createColorPicker(color)}
			</div>
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

export function addMarker(event) {
	const gradientRectangle = getGradientRectangle();
	let x = event.clientX - gradientRectangle.offsetLeft;

	// get the color of the closest marker to the left of the x position
	let closestMarker = null;
	let closestDistance = Infinity;
	const markers = gradientRectangle.getElementsByClassName('marker');
	Array.from(markers).forEach(marker => {
		if (marker.offsetLeft < x) {
			let distance = Math.abs(marker.offsetLeft - x);
			if (distance < closestDistance) {
				closestMarker = marker;
				closestDistance = distance;
			}
		}
	});

	let color = closestMarker.dataset.colorValue;
	let index = closestMarker.dataset.stopIndex + 1;
	let position = Math.round((x / gradientRectangle.offsetWidth) * 100) + '%';
	const marker = createMarker(position, color, index);
	closestMarker.insertAdjacentHTML('afterend', marker);

	updateMarkerIndices();
	updateGradientStops();
	initMarkers();
	initColorSwatches();
	initColorisPickers();
	initTrashButtons();
}