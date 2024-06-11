document.addEventListener('DOMContentLoaded', () => {
	const gradientRectangle = document.getElementById('gradient-rectangle');
	const markers = gradientRectangle.getElementsByClassName('marker');

	let gradientStops = [
		{ color: '#000000', position: 0 },
		{ color: '#FFFFFF', position: 100 }
	];

	function createGradientString(stops) {
		return stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
	}

	function updateGradient() {
		const gradientString = createGradientString(gradientStops);
		gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
	}

	function handleMouseMove(e, marker, index, startX) {
		const newLeft = Math.min(Math.max(0, e.clientX - startX), gradientRectangle.offsetWidth);
		const newPosition = (newLeft / gradientRectangle.offsetWidth) * 100;
		gradientStops[index].position = newPosition;
		marker.style.left = `${newPosition}%`;
		updateGradient();
	}

	function handleMouseUp(onMouseMove) {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleMouseDown(event, marker, index, startX) {
		const onMouseMove = (e) => handleMouseMove(e, marker, index, startX);
		const onMouseUp = () => handleMouseUp(onMouseMove);

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	function initMarkers() {
		Array.from(markers).forEach((marker, index) => {
			const startX = gradientRectangle.offsetLeft;
			marker.addEventListener('mousedown', (event) => handleMouseDown(event, marker, index, startX));
		});
	}

	function handlePickerInput(picker) {
		let pickedColor = picker.value;
		picker.previousElementSibling.dataset.colorValue = pickedColor;
		updateGradientStops();
		updateGradient();
		picker.nextElementSibling.style.backgroundColor = pickedColor;
	}

	function initColorisPickers() {
		let colorisPickers = document.querySelectorAll('.coloris-picker');
		colorisPickers.forEach(picker => {
			picker.addEventListener('input', () => handlePickerInput(picker));
		});
	}

	function setGradient() {
		let colorValues = document.querySelectorAll('.color-value');
		let gradientString = Array.from(colorValues).map(colorValue => colorValue.dataset.colorValue).join(', ');
		gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
	}

	function updateGradientStops() {
		gradientStops = Array.from(markers).map(marker => {
			return {
				color: marker.querySelector('.color-value').dataset.colorValue,
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