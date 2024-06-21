import { autoSave } from "../lib/auto-save";
import { updateGradient } from "./GradientContainer";

export let gradientType = 'linear';
export let gradientDegrees = 45;

let gradientTypeButtons;
let gradientDegreesParent;
let gradientDegreesInput;

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

export function initGradientTypeSelector() {
	const gradientTypeSelector = document.querySelector('.gradient-type-selector');
	gradientTypeButtons = gradientTypeSelector.querySelectorAll('.gradient-type-button');
	gradientDegreesParent = document.querySelector('.gradient-type-select-degrees');
	gradientDegreesInput = document.querySelector('#degrees');

	const { degrees, type } = JSON.parse(localStorage.getItem('gradient_generator_current_gradient')) || {};

	gradientDegrees = degrees || 45;
	gradientType = type || 'linear';

	gradientDegreesInput.value = gradientDegrees;

	updateGradientTypeUI();

	addEventListeners();
}

function updateGradientTypeUI() {
	const isRadial = gradientType === 'radial';
	const [linearButton, radialButton] = gradientTypeButtons;

	linearButton.classList.toggle('gradient-type-button-checked', !isRadial);
	radialButton.classList.toggle('gradient-type-button-checked', isRadial);

	linearButton.querySelector('input').checked = !isRadial;
	radialButton.querySelector('input').checked = isRadial;

	gradientDegreesParent.classList.toggle('hide', isRadial);
}

function addEventListeners() {
	gradientTypeButtons.forEach(button => button.addEventListener('change', handleGradientTypeChange));
	gradientDegreesInput.addEventListener('keyup', handleDegreesChange);
}

function handleGradientTypeChange(event) {
	gradientType = event.target.value;
	updateGradientTypeUI();
	updateGradient();
	autoSave();
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

export function setGradientDegrees(degrees) {
	gradientDegrees = degrees;
	gradientDegreesInput.value = degrees;
	updateGradientTypeUI();
	updateGradient();
	autoSave();
}

export function setGradientType(type) {
	gradientType = type;
	updateGradientTypeUI();
	updateGradient();
	autoSave();
}