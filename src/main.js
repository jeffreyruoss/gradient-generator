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

	function updateMarkers() {
		Array.from(markers).forEach((marker, index) => {
			marker.style.left = `${gradientStops[index].position}%`;
			const colorPicker = marker.querySelector('.color-picker');
			colorPicker.value = gradientStops[index].color;
		});
	}

	function initMarkers() {
		Array.from(markers).forEach((marker, index) => {
			const colorPicker = marker.querySelector('.color-picker');
			const startX = gradientRectangle.offsetLeft;

			colorPicker.addEventListener('input', (event) => {
				gradientStops[index].color = event.target.value;
				updateGradient();
			});

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
});
