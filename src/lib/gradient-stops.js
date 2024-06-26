import { autoSave } from "./auto-save";

let storedGradient = localStorage.getItem('gradient_generator_current_gradient')
	? JSON.parse(localStorage.getItem('gradient_generator_current_gradient'))
	: {
		stops: [
			{ color: '#001691', position: 0 },
			{ color: '#ff00a2', position: 25 },
			{ color: '#ff7f00', position: 75 },
			{ color: '#630041', position: 100 }
		],
		degrees: 0
	};

export let gradientStops = storedGradient.stops;
export let gradientDegrees = storedGradient.degrees;

export function setGradientStops(newStops) {
	gradientStops = newStops;
}

export function updateGradientStops() {
	const markers = document.getElementsByClassName('marker');
	const newStops = Array.from(markers).map(marker => {
		return {
			color: marker.dataset.colorValue,
			position: Number(marker.style.left.replace('%', ''))
		};
	});
	setGradientStops(newStops);
	autoSave();
}