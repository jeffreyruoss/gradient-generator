import { init } from './init.js';
import { gradientStops, updateGradientStops } from './store.js';
import { getGradientRectangle, updateGradient } from './components/GradientContainer.js';
import { updateMarkerIndices } from './components/Marker.js';

function handleMouseMove(e, marker, startX) {
	const gradientRectangle = getGradientRectangle();
	const newLeft = Math.min(Math.max(0, e.clientX - startX), gradientRectangle.offsetWidth);
	const newPosition = (newLeft / gradientRectangle.offsetWidth) * 100;
	const index = marker.dataset.stopIndex;
	gradientStops[index].position = newPosition;
	marker.style.left = `${newPosition}%`;
	updateGradient(gradientRectangle);
}

function handleMouseUp(onMouseMove) {
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
}

export function handleMouseDown(event, marker, startX) {
	const onMouseMove = (e) => handleMouseMove(e, marker, startX);
	const onMouseUp = () => handleMouseUp(onMouseMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}

function handlePickerInput(picker) {
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
	});
}

function handleSwatchClick(swatch, event) {
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

export function initTrashButtons() {
	const trashButtons = document.querySelectorAll('.trash');
	trashButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleTrashButtonClick(button.parentElement);
		});
	});
}

function handleTrashButtonClick(marker) {
	marker.remove();
	updateMarkerIndices();
	updateGradientStops();
	updateGradient();
}

document.addEventListener('DOMContentLoaded', () => init());
