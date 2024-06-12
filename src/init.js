import { initGradientRectangle, getGradientRectangle, updateGradient } from './components/GradientContainer.js';
import { initMarkers, addMarker } from './components/Marker.js';
import { initColorisPickers, initColorSwatches, initTrashButtons } from './main.js';

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