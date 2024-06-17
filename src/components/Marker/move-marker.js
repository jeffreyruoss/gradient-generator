import { getGradientRectangle } from "../GradientContainer";
import { autoSave } from "../../lib/auto-save";
import { gradientStops } from "../../lib/gradient-stops";
import { updateMarkerIndices } from "./Marker"
import { updateGradient } from "../GradientContainer";
import { updatePercentInputValue } from "./PercentInput";

function handleMouseMove(e, marker, startX) {
	const position = Math.max(0, Math.min(100, ((e.clientX - startX) / marker.parentElement.offsetWidth) * 100));
	updateMarkerMove(marker, position);
	reorderMarkers();
}

export function updateMarkerMove(marker, position) {
	const gradientRectangle = getGradientRectangle();
	const index = marker.dataset.stopIndex;
	gradientStops[index].position = position;
	marker.style.left = `${position}%`;
	updateGradient(gradientRectangle);
	updatePercentInputValue(marker, position);
}

function handleMouseUp(onMouseMove) {
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
	autoSave();
}

export function handleMouseDown(event, marker, startX) {
	const onMouseMove = (e) => handleMouseMove(e, marker, startX);
	const onMouseUp = () => handleMouseUp(onMouseMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}

function reorderMarkers() {
	const gradientRectangle = getGradientRectangle();
	const markers = Array.from(gradientRectangle.getElementsByClassName('marker'));

	// Sort markers based on their left style property
	markers.sort((a, b) => parseFloat(a.style.left) - parseFloat(b.style.left));

	// Create a new array of gradientStops in the same order as the markers
	const newGradientStops = markers.map(marker => gradientStops[marker.dataset.stopIndex]);

	// Replace the old gradientStops array with the new one
	gradientStops.length = 0;
	gradientStops.push(...newGradientStops);

	// Remove all markers from the DOM
	markers.forEach(marker => gradientRectangle.removeChild(marker));

	// Append markers back to the DOM in the sorted order
	markers.forEach(marker => gradientRectangle.appendChild(marker));

	updateMarkerIndices();
}