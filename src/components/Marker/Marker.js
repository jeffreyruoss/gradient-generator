import { createTrashIcon } from '../TrashIcon.js';
import { createColorPicker } from '../ColorPicker.js';
import { createPercentInput, initPercentInput } from './PercentInput.js';
import { getGradientRectangle, updateGradient } from '../GradientContainer.js';
import { gradientStops, updateGradientStops } from '../../lib/gradient-stops.js';
import { initColorisPickers, initColorSwatches } from '../ColorPicker.js';
import { initTrashButtons } from '../TrashIcon.js';
import { handleMouseDown } from './move-marker.js';

export function createMarker(position, color, index) {
	return `
    <div class="marker" style="left: ${position};" data-color-value="${color}" data-stop-index="${index + 1}">
			<div class="marker-triangle"></div>
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
	Array.from(markers).forEach((marker, index) => initMarker(marker, index, gradientRectangle));
}

function initMarker(marker, index, gradientRectangle) {
	marker.dataset.stopIndex = index;
	const startX = gradientRectangle.offsetLeft;
	marker.addEventListener('mousedown', (event) => {
		markerSelect(marker);
		if (!event.target.classList.contains('percent-input')) {
			event.preventDefault();
		}
		handleMouseDown(event, marker, startX);
	});
	marker.addEventListener('touchstart', (event) => {
		markerSelect(marker);
		if (!event.target.classList.contains('percent-input')) {
			event.preventDefault();
		}
		handleMouseDown(event, marker, startX);
	});
}

function markerSelect(marker) {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker) => marker.classList.remove('selected'));
	marker.classList.add('selected');
}

export function updateMarkerIndices() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker, index) => {
		marker.dataset.stopIndex = index;
	});
}

export function createMarkers() {
	const markers = gradientStops.map((stop, index) => createMarker(`${stop.position}%`, stop.color, index));
	return markers.join('');
}

export function clearMarkers() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker) => marker.remove());
}

export function updateUI() {
	updateMarkerIndices();
	updateGradientStops();
	initMarkers();
	initPercentInput();
	initColorSwatches();
	initColorisPickers();
	initTrashButtons();
	updateGradient();
}