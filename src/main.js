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
	}

	function initColorisPickers() {
		let colorisPickers = document.querySelectorAll('.coloris-picker');
		colorisPickers.forEach(picker => {
			picker.addEventListener('input', () => handlePickerInput(picker));
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

	function handleSwatchClick(swatch) {
		let marker = swatch.parentElement;
		marker.querySelector('.coloris-picker').click();
	}

	function initColorSwatches() {
		const colorSwatches = document.querySelectorAll('.color-swatch');
		colorSwatches.forEach(swatch => {
			swatch.addEventListener('click', () => handleSwatchClick(swatch));
		});
	}

	updateGradient();
	initMarkers();
	initColorisPickers();
	initColorSwatches();
});