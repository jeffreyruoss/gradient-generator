import { createTrashIcon } from './TrashIcon.js';
import { createColorPicker } from './ColorPicker.js';
import { getGradientRectangle, updateGradient } from './GradientContainer.js';
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

export function getClosestMarker(x, markers) {
	let closestMarker = null;
	let closestDistance = Infinity;
	Array.from(markers).forEach(marker => {
		if (marker.offsetLeft < x) {
			let distance = Math.abs(marker.offsetLeft - x);
			if (distance < closestDistance) {
				closestMarker = marker;
				closestDistance = distance;
			}
		}
	});
	return closestMarker;
}

export function createAndInsertMarker(closestMarker, color, index, position) {
	const marker = createMarker(position, color, index);
	closestMarker.insertAdjacentHTML('afterend', marker);
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

export function addMarker(event) {
	const gradientRectangle = getGradientRectangle();
	let x = event.clientX - gradientRectangle.offsetLeft;
	const markers = gradientRectangle.getElementsByClassName('marker');
	let closestMarker = getClosestMarker(x, markers);

	let color = closestMarker.dataset.colorValue;
	let index = closestMarker.dataset.stopIndex + 1;
	let position = Math.round((x / gradientRectangle.offsetWidth) * 100) + '%';

	createAndInsertMarker(closestMarker, color, index, position);
	updateUI();
}