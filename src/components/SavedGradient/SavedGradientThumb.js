import { gradientStops } from "../../lib/gradient-stops";
import { createGradientString } from "../GradientContainer";

export function createSavedGradientThumb(savedGradientStops) {
	return `
		<div class="saved-gradient-thumb" style="${savedGradientThumbBackground(savedGradientStops)}"></div>
	`
}

function savedGradientThumbBackground(savedGradientStops) {
	let gradientString;

	if (savedGradientStops) {
		gradientString = createGradientString(savedGradientStops);
	} else {
		gradientString = createGradientString(gradientStops);
	}

	return `background: linear-gradient(to right, ${gradientString})`;
}