import { autoSave } from "./auto-save";

export let gradientStops = localStorage.getItem('gradient_generator_current_gradient')
	? JSON.parse(localStorage.getItem('gradient_generator_current_gradient'))
	: [
		{ color: '#ADD8E6', position: 0 },
		{ color: '#FFA07A', position: 50 },
		{ color: '#0000FF', position: 100 }
	];

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