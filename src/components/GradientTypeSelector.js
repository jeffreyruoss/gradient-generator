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
                <input type="text" id="degrees" name="degrees" value="45">
            </div>
        </div>
    `;
}

export let gradientType = 'linear';
export let gradientDegrees = 45;

let gradientTypeButtons;
let gradientDegreesParent;
let gradientDegreesInput;

export function initGradientTypeSelector() {
	const gradientTypeSelector = document.querySelector('.gradient-type-selector');
	gradientTypeButtons = gradientTypeSelector.querySelectorAll('.gradient-type-button');
	gradientDegreesParent = document.querySelector('.gradient-type-select-degrees');
	gradientDegreesInput = document.querySelector('#degrees');

	addEventListeners();
}

function addEventListeners() {
	gradientTypeButtons.forEach(button => button.addEventListener('change', handleGradientTypeChange));
	gradientDegreesInput.addEventListener('keyup', handleDegreesChange);
}

function handleGradientTypeChange(event) {
	toggleButtonChecked(event);
	toggleDegreesVisibility(event);
	gradientType = event.target.value;
	updateGradient();
}

function toggleButtonChecked(event) {
	gradientTypeButtons.forEach(button => button.classList.remove('gradient-type-button-checked'));
	event.target.parentNode.classList.add('gradient-type-button-checked');
}

function toggleDegreesVisibility(event) {
	if (event.target.value === 'radial') {
		gradientDegreesParent.classList.add('hide');
	} else {
		gradientDegreesParent.classList.remove('hide');
	}
}

function handleDegreesChange(event) {
	gradientDegrees = validateDegrees(event.target.value);
	updateGradient();
}

function validateDegrees(degrees) {
	if (isNaN(degrees) || degrees < 0 || degrees > 360 || degrees === '') {
		gradientDegreesInput.value = '';
		return '0';
	}
	return degrees;
}