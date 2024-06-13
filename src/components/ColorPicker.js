import { updateGradientStops } from '../lib/gradient-stops.js';
import { updateGradient } from './GradientContainer.js';
import { createPencilIcon } from './PencilIcon.js';

export function createColorPicker(color) {
	return `
	<input type="text" data-coloris class="coloris-picker">
	<div class="color-swatch" id="color-swatch" style="background-color: ${color}">
	${createPencilIcon()}
	`;
}

export function handlePickerInput(picker) {
	let pickedColor = picker.value;
	let marker = picker.parentElement;
	marker.dataset.colorValue = pickedColor;
	updateGradientStops();
	updateGradient();
	picker.parentElement.querySelector('.color-swatch').style.backgroundColor = pickedColor;
	if (event) event.stopPropagation();
}

export function initColorisPickers() {
	let colorisPickers = document.querySelectorAll('.coloris-picker');
	colorisPickers.forEach(picker => {
		picker.addEventListener('input', (event) => handlePickerInput(picker));
		picker.value = picker.parentElement.dataset.colorValue;
	});
}

export function handleSwatchClick(swatch, event) {
	let marker = swatch.parentElement;
	marker.querySelector('.coloris-picker').click();
	event.stopPropagation();
}

export function initColorSwatches() {
	const colorSwatches = document.querySelectorAll('.color-swatch');
	colorSwatches.forEach(swatch => {
		swatch.addEventListener('click', (event) => handleSwatchClick(swatch, event));
	});
}