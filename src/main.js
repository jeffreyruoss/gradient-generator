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
			this.previousElementSibling.textContent = pickedColor; // Update the color value in the marker
			this.previousElementSibling.dataset.colorValue = pickedColor; // Update the data-color-value attribute in the marker
			updateGradientStops();
			updateGradient();
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
});