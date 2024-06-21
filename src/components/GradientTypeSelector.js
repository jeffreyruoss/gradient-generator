import { autoSave } from "../lib/auto-save";
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

	const gradient_generator_current_gradient = JSON.parse(localStorage.getItem('gradient_generator_current_gradient'));

	if (gradient_generator_current_gradient && gradient_generator_current_gradient.degrees) {
		gradientDegrees = gradient_generator_current_gradient.degrees;
		console.log(gradientDegrees);
	} else {
		gradientDegrees = 45;
	}

	if (gradient_generator_current_gradient && gradient_generator_current_gradient.type) {
		gradientType = gradient_generator_current_gradient.type;
	} else {
		gradientType = 'linear';
	}

	gradientDegreesInput.value = gradientDegrees;

	if (gradientType === 'radial') {
		gradientTypeButtons[1].classList.add('gradient-type-button-checked');
		gradientTypeButtons[1].querySelector('input').checked = true;
		gradientTypeButtons[0].classList.remove('gradient-type-button-checked');
		gradientTypeButtons[0].querySelector('input').checked = false;
		gradientDegreesParent.classList.add('hide');
	} else {
		gradientTypeButtons[0].classList.add('gradient-type-button-checked');
		gradientTypeButtons[0].querySelector('input').checked = true;
		gradientTypeButtons[1].classList.remove('gradient-type-button-checked');
		gradientTypeButtons[1].querySelector('input').checked = false;
	}

	addEventListeners();
}

export function setGradientDegrees(newDegrees) {
	gradientDegrees = newDegrees;
}

export function setGradientType(newType) {
	gradientType = newType;
}

function addEventListeners() {
	gradientTypeButtons.forEach(button => button.addEventListener('change', handleGradientTypeChange));
	gradientDegreesInput.addEventListener('keyup', handleDegreesChange);
}

function handleGradientTypeChange(event) {
	console.log('handleGradientTypeChange');
	toggleButtonChecked(event);
	toggleDegreesVisibility(event);
	gradientType = event.target.value;
	updateGradient();
	autoSave();
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
	autoSave();
	updateGradient();
}

function validateDegrees(degrees) {
	if (isNaN(degrees) || degrees < 0 || degrees > 360 || degrees === '') {
		gradientDegreesInput.value = '';
		return '0';
	}
	return degrees;
}