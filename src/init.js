import { initGradientRectangle, getGradientRectangle, updateGradient } from './components/GradientContainer.js';
import { initMarkers, addMarker } from './components/Marker.js';
import { initColorisPickers, initColorSwatches } from './main.js';
import { initTrashButtons } from './components/TrashIcon.js';

let gradientRectangle;

export function init() {
	initGradientRectangle();
	gradientRectangle = getGradientRectangle();
	updateGradient();
	initMarkers();
	initColorisPickers();
	initColorSwatches();
	initTrashButtons();
	addMarker();
}