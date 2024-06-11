import { createMarker } from './components/Marker.js';

export let gradientStops = [
	{ color: '#fff', position: 0 },
	{ color: '#999', position: 25 },
	{ color: '#666', position: 50 },
	{ color: '#333', position: 75 },
	{ color: '#000', position: 100 }
];

function createGradientString(stops) {
	return stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
}

function updateGradient(gradientRectangle) {
	const gradientString = createGradientString(gradientStops);
	gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
}

function handleMouseMove(e, marker, startX, gradientRectangle) {
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

function handleMouseDown(event, marker, startX, gradientRectangle) {
	const onMouseMove = (e) => handleMouseMove(e, marker, startX, gradientRectangle);
	const onMouseUp = () => handleMouseUp(onMouseMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}

function initMarkers(gradientRectangle) {
	const markers = gradientRectangle.getElementsByClassName('marker');
	Array.from(markers).forEach((marker, index) => {
		marker.dataset.stopIndex = index;
		const startX = gradientRectangle.offsetLeft;
		marker.addEventListener('mousedown', (event) => handleMouseDown(event, marker, startX, gradientRectangle));
	});
}

function handlePickerInput(picker, gradientRectangle) {
	let pickedColor = picker.value;
	let marker = picker.parentElement;
	marker.dataset.colorValue = pickedColor;
	updateGradientStops();
	updateGradient(gradientRectangle);
	picker.parentElement.querySelector('.color-swatch').style.backgroundColor = pickedColor;
	if (event) event.stopPropagation();
}

function initColorisPickers(gradientRectangle) {
	let colorisPickers = document.querySelectorAll('.coloris-picker');
	colorisPickers.forEach(picker => {
		picker.addEventListener('input', (event) => handlePickerInput(picker, gradientRectangle));
	});
}

function updateGradientStops() {
	const markers = document.getElementsByClassName('marker');
	gradientStops = Array.from(markers).map(marker => {
		return {
			color: marker.dataset.colorValue,
			position: Number(marker.style.left.replace('%', ''))
		};
	});
}

function handleSwatchClick(swatch, event) {
	let marker = swatch.parentElement;
	marker.querySelector('.coloris-picker').click();
	event.stopPropagation();
}

function initColorSwatches() {
	const colorSwatches = document.querySelectorAll('.color-swatch');
	colorSwatches.forEach(swatch => {
		swatch.addEventListener('click', (event) => handleSwatchClick(swatch, event));
	});
}

function initTrashButtons(gradientRectangle) {
	const trashButtons = document.querySelectorAll('.trash');
	trashButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleTrashButtonClick(button.parentElement, gradientRectangle);
		});
	});
}

function handleTrashButtonClick(marker, gradientRectangle) {
	marker.remove();
	updateMarkerIndices();
	updateGradientStops();
	updateGradient(gradientRectangle);
}

function updateMarkerIndices() {
	const markers = document.getElementsByClassName('marker');
	Array.from(markers).forEach((marker, index) => {
		marker.dataset.stopIndex = index;
	});
}

function addMarker(gradientRectangle) {
	gradientRectangle.addEventListener('click', (event) => {
		if (event.target !== gradientRectangle) {
			return;
		}
		let x = event.clientX - gradientRectangle.offsetLeft;

		// get the color of the closest marker to the left of the x position
		let closestMarker = null;
		let closestDistance = Infinity;
		const markers = gradientRectangle.getElementsByClassName('marker');
		Array.from(markers).forEach(marker => {
			if (marker.offsetLeft < x) {
				let distance = Math.abs(marker.offsetLeft - x);
				if (distance < closestDistance) {
					closestMarker = marker;
					closestDistance = distance;
				}
			}
		});

		let color = closestMarker.dataset.colorValue;

		let index = closestMarker.dataset.stopIndex + 1;

		let position = Math.round((x / gradientRectangle.offsetWidth) * 100) + '%';

		const marker = createMarker(position, color, index);

		closestMarker.insertAdjacentHTML('afterend', marker);

		updateMarkerIndices();

		updateGradientStops();

		updateGradient(gradientRectangle);

		initColorisPickers(gradientRectangle);
		initColorSwatches();
		initMarkers(gradientRectangle);
		initTrashButtons(gradientRectangle);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const gradientRectangle = document.getElementById('gradient-rectangle');

	updateGradient(gradientRectangle);
	initMarkers(gradientRectangle);
	initColorisPickers(gradientRectangle);
	initColorSwatches();
	initTrashButtons(gradientRectangle);
	addMarker(gradientRectangle);
});
