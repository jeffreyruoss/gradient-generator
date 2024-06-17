import { setGradientStops, updateGradientStops } from "../../lib/gradient-stops";
import { initColorisPickers, initColorSwatches } from "../ColorPicker";
import { getGradientRectangle, initGradientRectangle, updateGradient } from "../GradientContainer";
import { clearMarkers, createMarkers, initMarkers, updateMarkerIndices, updateUI } from "../Marker/Marker";
import { initPercentInput } from "../Marker/PercentInput";
import { initTrashButtons } from "../TrashIcon";



export function createLoadSavedGradientButton() {
	return `
		<button class="load-saved-gradient">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/></svg>
		</button>
	`
}

export function loadSavedGradientInit(savedGradientElement) {
	const loadGradientButton = savedGradientElement.querySelector('.load-saved-gradient');
	loadGradientButton.addEventListener('click', () => loadSavedGradient(savedGradientElement));
}

function loadSavedGradient(savedGradientElement) {
	const savedGradientData = savedGradientElement.dataset.savedGradientStops;

	const gradientStops = JSON.parse(savedGradientData.replace(/'/g, '"'));

	setGradientStops(gradientStops);

	updateGradient();

	clearMarkers();

	initGradientRectangle();
	const gradientRectangle = getGradientRectangle();

	const markers = createMarkers();

	gradientRectangle.innerHTML = markers;

	initMarkers();
	initPercentInput();
	initColorSwatches();
	initColorisPickers();
	initTrashButtons();
}