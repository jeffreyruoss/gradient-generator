import { updateGradient } from "./GradientContainer";

export function createGradientTypeSelector() {
	return `
		<div class="gradient-type-selector">
			<input type="radio" id="linear" name="gradientType" value="linear" checked>
			<label for="linear">Linear</label><br>
			<input type="radio" id="radial" name="gradientType" value="radial">
			<label for="radial">Radial</label>
		</div>
	`;
}

export let gradientType = 'linear';

export function initGradientTypeSelector() {
	const gradientTypeSelector = document.querySelector('.gradient-type-selector');
	gradientTypeSelector.addEventListener('change', handleGradientTypeChange);
}

function handleGradientTypeChange(event) {
	gradientType = event.target.value;
	updateGradient();
}