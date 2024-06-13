import { getGradientRectangle } from "../GradientContainer.js";
import { createMarker, updateUI } from "./Marker.js";

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