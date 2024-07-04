import { gradientStops } from "../../lib/gradient-stops";
import { getGradientRectangle } from "../GradientContainer";
import { updateMarkerIndices } from "./Marker";


export function reorderMarkers() {
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
