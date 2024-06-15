import { gradientStops } from "../../lib/gradient-stops";
import { createGradientString } from "../GradientContainer";

export function createSavedGradientThumb() {
	return `
		<div class="saved-gradient-thumb" style="${savedGradientThumbBackground()}"></div>
	`
}

function savedGradientThumbBackground() {
	const gradientString = createGradientString(gradientStops);
	return `background: linear-gradient(to right, ${gradientString})`;
}