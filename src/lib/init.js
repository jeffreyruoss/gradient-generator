import { initGradientRectangle, getGradientRectangle, updateGradient } from '../components/GradientContainer.js';
import { initMarkers } from '../components/Marker/Marker.js';
import { addMarker } from '../components/Marker/add-marker.js';
import { initColorisPickers, initColorSwatches } from '../components/ColorPicker.js';
import { initTrashButtons } from '../components/TrashIcon.js';
import { saveGradientsInit } from '../components/SavedGradientsSection.js';
import { initPercentInput } from '../components/Marker/PercentInput.js';

let gradientRectangle;

export function init() {
	initGradientRectangle();
	gradientRectangle = getGradientRectangle();
	updateGradient();
	initMarkers();
	initColorisPickers();
	initColorSwatches();
	initPercentInput();
	initTrashButtons();
	saveGradientsInit();

	gradientRectangle.addEventListener('click', (event) => {
		if (event.target !== gradientRectangle) {
			return;
		}
		addMarker(event);
	});
}
