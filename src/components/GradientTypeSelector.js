import { updateGradient } from "./GradientContainer";

export function createGradientTypeSelector() {
	return `
		<div class="gradient-type-selector">
			<div class="gradient-type-button gradient-type-button-checked">
				<input type="radio" id="linear" name="gradientType" value="linear" checked>
				<label for="linear">Linear</label>
			</div>
			<div class="gradient-type-button">
				<input type="radio" id="radial" name="gradientType" value="radial">
				<label for="radial">Radial</label>
			</div>
			<div class="gradient-type-select-degrees">
				<input type="text" id="degrees" name="degrees" value="" placeholder="0">
			</div>
		</div>
	`;
}

export let gradientType = 'linear';
export let gradientDegrees = 0;

let gradientTypeButtons;
let gradientDegreesParent;
let gradientDegreesInput;

export function initGradientTypeSelector() {
	const gradientTypeSelector = document.querySelector('.gradient-type-selector');
	gradientTypeButtons = gradientTypeSelector.querySelectorAll('.gradient-type-button');
	gradientTypeSelector.addEventListener('change', handleGradientTypeChange);

	gradientDegreesParent = document.querySelector('.gradient-type-select-degrees');

	gradientDegreesInput = document.querySelector('#degrees');
	gradientDegreesInput.addEventListener('keyup', handleDegreesChange);
}

function handleGradientTypeChange(event) {
	if (!event.target.parentNode.classList.contains('gradient-type-select-degrees')) {
		gradientTypeButtons.forEach(button => {
			button.classList.remove('gradient-type-button-checked');
		});
		event.target.parentNode.classList.add('gradient-type-button-checked');
	}

	if (event.target.value === 'radial') {
		gradientDegreesParent.classList.add('hide');
	} else {
		gradientDegreesParent.classList.remove('hide');
	}

	gradientType = event.target.value;
	updateGradient();
}

function handleDegreesChange(event) {
	if (isNaN(event.target.value) || event.target.value < 0 || event.target.value > 360 || event.target.value === '') {
		gradientDegrees = '0';
		gradientDegreesInput.value = '';
	} else {
		gradientDegrees = event.target.value;
	}
	updateGradient();
}