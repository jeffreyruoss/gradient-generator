document.addEventListener('DOMContentLoaded', () => {
	const gradientRectangle = document.getElementById('gradient-rectangle');
	const markers = gradientRectangle.getElementsByClassName('marker');

	let gradientStops = [
		{ color: '#000000', position: 0 },
		{ color: '#FFFFFF', position: 100 }
	];

	function updateGradient() {
		const gradientString = gradientStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
		gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
	}

	function initMarkers() {
		Array.from(markers).forEach((marker, index) => {
			const startX = gradientRectangle.offsetLeft;

			marker.addEventListener('mousedown', (event) => {
				const onMouseMove = (e) => {
					const newLeft = Math.min(Math.max(0, e.clientX - startX), gradientRectangle.offsetWidth);
					const newPosition = (newLeft / gradientRectangle.offsetWidth) * 100;
					gradientStops[index].position = newPosition;
					marker.style.left = `${newPosition}%`;
					updateGradient();
				};

				const onMouseUp = () => {
					document.removeEventListener('mousemove', onMouseMove);
					document.removeEventListener('mouseup', onMouseUp);
				};

				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);
			});
		});
	}

	updateGradient();
	initMarkers();



	let colorisPickers = document.querySelectorAll('.coloris-picker');
	colorisPickers.forEach(picker => {
		picker.addEventListener('input', function () {
			let pickedColor = this.value;
			this.previousElementSibling.dataset.colorValue = pickedColor;
			updateGradientStops();
			updateGradient();

			// set the background color of the .color-swatch element
			this.nextElementSibling.style.backgroundColor = pickedColor;
		});
	});

	// get all data-color-value attributes of the .color-value elements and set the background gradient to the gradientRectangle
	function setGradient() {
		let colorValues = document.querySelectorAll('.color-value');
		let gradientString = Array.from(colorValues).map(colorValue => colorValue.dataset.colorValue).join(', ');
		gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
	}

	// update gradientStops array with the new color and position values
	function updateGradientStops() {
		gradientStops = Array.from(markers).map(marker => {
			return {
				color: marker.querySelector('.color-value').dataset.colorValue,
				position: Number(marker.style.left.replace('%', ''))
			};
		});
	}

	// on click of a .color-swatch element, trigger the click event of the corresponding .coloris-picker element
	const colorSwatches = document.querySelectorAll('.color-swatch');
	colorSwatches.forEach(swatch => {
		swatch.addEventListener('click', function () {
			let marker = this.parentElement;
			marker.querySelector('.coloris-picker').click();
		});
	});
});