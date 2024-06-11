import { createMarker } from './components/Marker.js';

export let gradientStops = [
	{ color: '#fff', position: 0 },
	{ color: '#999', position: 25 },
	{ color: '#666', position: 50 },
	{ color: '#333', position: 75 },
	{ color: '#000', position: 100 }
];

document.addEventListener('DOMContentLoaded', () => {
	const gradientRectangle = document.getElementById('gradient-rectangle');
	const markers = gradientRectangle.getElementsByClassName('marker');

	function createGradientString(stops) {
		return stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
	}

	function updateGradient() {
		const gradientString = createGradientString(gradientStops);
		gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
	}

	function handleMouseMove(e, marker, startX) {
		const newLeft = Math.min(Math.max(0, e.clientX - startX), gradientRectangle.offsetWidth);
		const newPosition = (newLeft / gradientRectangle.offsetWidth) * 100;
		const index = marker.dataset.stopIndex;
		gradientStops[index].position = newPosition;
		marker.style.left = `${newPosition}%`;
		updateGradient();
	}

	function handleMouseUp(onMouseMove) {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleMouseDown(event, marker, startX) {
		const onMouseMove = (e) => handleMouseMove(e, marker, startX);
		const onMouseUp = () => handleMouseUp(onMouseMove);

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function initMarkers() {
		Array.from(markers).forEach((marker, index) => {
			marker.dataset.stopIndex = index;
			const startX = gradientRectangle.offsetLeft;
			marker.addEventListener('mousedown', (event) => handleMouseDown(event, marker, startX));
		});
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

	function initColorisPickers() {
		let colorisPickers = document.querySelectorAll('.coloris-picker');
		colorisPickers.forEach(picker => {
			picker.addEventListener('input', (event) => handlePickerInput(picker, event));
		});
	}

	function updateGradientStops() {
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

	function initTrashButtons() {
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

	function updateMarkerIndices() {
		const markers = gradientRectangle.getElementsByClassName('marker');
		Array.from(markers).forEach((marker, index) => {
			marker.dataset.stopIndex = index;
		});
	}

	function addMarker() {
		gradientRectangle.addEventListener('click', (event) => {
			if (event.target !== gradientRectangle) {
				return;
			}
			let x = event.clientX - gradientRectangle.offsetLeft;

			// get the color of the closest marker to the left of the x position
			let closestMarker = null;
			let closestDistance = Infinity;
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

			updateGradient();

			initColorisPickers();
			initColorSwatches();


			initMarkers();
			initTrashButtons();
		});
	}


	updateGradient();
	initMarkers();
	initColorisPickers();
	initColorSwatches();
	initTrashButtons();
	addMarker();
});