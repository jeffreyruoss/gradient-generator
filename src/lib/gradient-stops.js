import { autoSave } from "./auto-save";

export let gradientStops = localStorage.getItem('gradient_generator_current_gradient')
	? JSON.parse(localStorage.getItem('gradient_generator_current_gradient'))
	: [
		{ color: '#001691', position: 0 },
		{ color: '#aa00ff', position: 30 },
		{ color: '#ff00a2', position: 70 },
		{ color: '#630041', position: 100 }
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